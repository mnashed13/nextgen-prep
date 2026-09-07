import { CJMMStep } from "../mock-cases";
import { ExamGradeResult } from "./scoring-engine";

export interface FSRSCard {
  caseId: string;
  reps: number;
  difficulty: number; // 1 (easiest) to 10 (hardest)
  stability: number; // in days
  retrievability: number; // probability of recall [0.0 - 1.0]
  lastReviewed: string; // ISO date string
  nextReview: string; // ISO date string
  lapses: number;
  lastScorePercent: number;
}

export interface CandidateReadinessReport {
  passingProbability: number; // 0 to 100%
  overallMasteryLevel: "Beginner" | "Developing" | "Competent" | "Examination Ready";
  totalSimulationsCompleted: number;
  averageScorePercent: number;
  cjmmMastery: Record<CJMMStep, { masteryScore: number; status: "Strength" | "Target Area" | "Critical Weakness" }>;
  recommendedReviewCaseIds: string[];
}

const STORAGE_KEYS = {
  FSRS_CARDS: "nextgen_cbt_fsrs_cards_v1",
  EXAM_HISTORY: "nextgen_cbt_exam_history_v1",
  USER_PASS: "nextgen_cbt_user_access_pass_v1",
};

/**
 * FSRS Algorithm implementation adapted for case-study clinical simulation.
 * Calculates new stability (S) and difficulty (D) based on candidate performance score.
 */
export function calculateFSRSUpdate(
  currentCard: FSRSCard | null,
  scorePercentage: number,
  caseDifficultyRating: "Medium" | "High" | "Extreme" = "High"
): FSRSCard {
  const now = new Date();
  const baseDifficultyMap = {
    Medium: 4.5,
    High: 6.0,
    Extreme: 8.0,
  };

  // Map 0-100% score to 1-4 grade rating
  let grade = 3; // Good
  if (scorePercentage < 60) grade = 1; // Again / Lapse
  else if (scorePercentage < 75) grade = 2; // Hard
  else if (scorePercentage >= 90) grade = 4; // Easy

  const previousReps = currentCard?.reps || 0;
  const previousDifficulty = currentCard?.difficulty ?? baseDifficultyMap[caseDifficultyRating];
  const previousStability = currentCard?.stability || 0.8;
  const lapses = (currentCard?.lapses || 0) + (grade === 1 ? 1 : 0);

  // Difficulty adjustment: D' = D - w6 * (grade - 3)
  let newDifficulty = previousDifficulty - 0.7 * (grade - 3);
  newDifficulty = Math.max(1.0, Math.min(10.0, newDifficulty));

  // Stability adjustment
  let newStability: number;
  if (previousReps === 0) {
    // Initial interval
    newStability = grade === 1 ? 0.4 : grade === 2 ? 1.2 : grade === 3 ? 2.5 : 5.0;
  } else if (grade === 1) {
    // Lapse
    newStability = Math.max(0.3, previousStability * 0.4);
  } else {
    // Retention success: S' = S * (1 + C * e^(...) )
    const factor = grade === 4 ? 2.8 : grade === 3 ? 2.2 : 1.4;
    newStability = previousStability * factor * (1 - (newDifficulty - 5) * 0.05);
    newStability = Math.max(0.5, Math.min(180, newStability));
  }

  // Calculate next interval in days
  const intervalDays = Math.max(1, Math.round(newStability));
  const nextReviewDate = new Date(now.getTime() + intervalDays * 24 * 60 * 60 * 1000);

  // Retrievability right after review is 1.0 (100%)
  return {
    caseId: currentCard?.caseId || "",
    reps: previousReps + 1,
    difficulty: Math.round(newDifficulty * 10) / 10,
    stability: Math.round(newStability * 10) / 10,
    retrievability: 0.98,
    lastReviewed: now.toISOString(),
    nextReview: nextReviewDate.toISOString(),
    lapses,
    lastScorePercent: scorePercentage,
  };
}

/**
 * Storage Helpers (Local-First in Browser)
 */
export function loadAllFSRSCards(): Record<string, FSRSCard> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.FSRS_CARDS);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.error("Failed to load FSRS cards", e);
    return {};
  }
}

export function saveFSRSCard(card: FSRSCard): void {
  if (typeof window === "undefined") return;
  try {
    const all = loadAllFSRSCards();
    all[card.caseId] = card;
    localStorage.setItem(STORAGE_KEYS.FSRS_CARDS, JSON.stringify(all));
  } catch (e) {
    console.error("Failed to save FSRS card", e);
  }
}

export function loadExamHistory(): ExamGradeResult[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.EXAM_HISTORY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Failed to load exam history", e);
    return [];
  }
}

export function recordExamAttempt(
  examResult: ExamGradeResult,
  caseDifficulty: "Medium" | "High" | "Extreme" = "High"
): FSRSCard {
  if (typeof window === "undefined") {
    return calculateFSRSUpdate(null, examResult.overallPercentage, caseDifficulty);
  }

  // 1. Append to history
  const history = loadExamHistory();
  history.unshift(examResult);
  localStorage.setItem(STORAGE_KEYS.EXAM_HISTORY, JSON.stringify(history.slice(0, 50)));

  // 2. Update FSRS memory curve
  const allCards = loadAllFSRSCards();
  const existingCard = allCards[examResult.caseId] || null;
  const updatedCard = calculateFSRSUpdate(existingCard, examResult.overallPercentage, caseDifficulty);
  updatedCard.caseId = examResult.caseId;
  saveFSRSCard(updatedCard);

  return updatedCard;
}

/**
 * Calculate candidate passing probability and CJMM cognitive skill radar
 */
export function computeCandidateReadiness(): CandidateReadinessReport {
  const history = loadExamHistory();
  const cards = loadAllFSRSCards();

  const cjmmStepScores: Record<CJMMStep, { earned: number; possible: number }> = {
    recognize_cues: { earned: 0, possible: 0 },
    analyze_cues: { earned: 0, possible: 0 },
    prioritize_hypotheses: { earned: 0, possible: 0 },
    generate_solutions: { earned: 0, possible: 0 },
    take_action: { earned: 0, possible: 0 },
    evaluate_outcomes: { earned: 0, possible: 0 },
  };

  if (history.length === 0) {
    // Default initial baseline for new candidates
    return {
      passingProbability: 72,
      overallMasteryLevel: "Developing",
      totalSimulationsCompleted: 0,
      averageScorePercent: 0,
      cjmmMastery: {
        recognize_cues: { masteryScore: 75, status: "Strength" },
        analyze_cues: { masteryScore: 68, status: "Target Area" },
        prioritize_hypotheses: { masteryScore: 62, status: "Target Area" },
        generate_solutions: { masteryScore: 70, status: "Target Area" },
        take_action: { masteryScore: 65, status: "Target Area" },
        evaluate_outcomes: { masteryScore: 60, status: "Critical Weakness" },
      },
      recommendedReviewCaseIds: ["case-sepsis-001"],
    };
  }

  let totalPctSum = 0;
  history.forEach((h) => {
    totalPctSum += h.overallPercentage;
    (Object.keys(cjmmStepScores) as CJMMStep[]).forEach((step) => {
      if (h.cjmmStepScores && h.cjmmStepScores[step]) {
        cjmmStepScores[step].earned += h.cjmmStepScores[step].earned;
        cjmmStepScores[step].possible += h.cjmmStepScores[step].possible;
      }
    });
  });

  const avgPct = Math.round(totalPctSum / history.length);

  // Compute CJMM Step mastery
  const cjmmMastery: CandidateReadinessReport["cjmmMastery"] = {} as CandidateReadinessReport["cjmmMastery"];
  (Object.keys(cjmmStepScores) as CJMMStep[]).forEach((step) => {
    const data = cjmmStepScores[step];
    const score = data.possible > 0 ? Math.round((data.earned / data.possible) * 100) : 70;
    let status: "Strength" | "Target Area" | "Critical Weakness" = "Target Area";
    if (score >= 80) status = "Strength";
    else if (score < 65) status = "Critical Weakness";

    cjmmMastery[step] = { masteryScore: score, status };
  });

  // Formula for passing probability combining average score, repetition volume, and retention
  const completedBonus = Math.min(10, history.length * 2.5);
  const calculatedProb = Math.min(96, Math.max(45, Math.round(avgPct * 0.85 + completedBonus)));

  let masteryLevel: CandidateReadinessReport["overallMasteryLevel"] = "Developing";
  if (calculatedProb >= 85) masteryLevel = "Examination Ready";
  else if (calculatedProb >= 75) masteryLevel = "Competent";
  else if (calculatedProb >= 60) masteryLevel = "Developing";
  else masteryLevel = "Beginner";

  // Recommended review case IDs: cases where nextReview is past or lowest score
  const cardList = Object.values(cards);
  cardList.sort((a, b) => new Date(a.nextReview).getTime() - new Date(b.nextReview).getTime());
  const recommendedIds = cardList.map((c) => c.caseId);
  if (recommendedIds.length === 0) {
    recommendedIds.push("case-sepsis-001");
  }

  return {
    passingProbability: calculatedProb,
    overallMasteryLevel: masteryLevel,
    totalSimulationsCompleted: history.length,
    averageScorePercent: avgPct,
    cjmmMastery,
    recommendedReviewCaseIds: recommendedIds,
  };
}

/**
 * Access Pass License Store
 */
export interface UserAccessPass {
  type: "trial" | "semester_cram" | "full_access";
  expiresAt: string;
  isActive: boolean;
  orderNumber?: string;
}

export function getUserAccessPass(): UserAccessPass {
  if (typeof window === "undefined") {
    return { type: "trial", expiresAt: "2099-01-01", isActive: true };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER_PASS);
    if (!raw) {
      // Default trial
      const defaultPass: UserAccessPass = {
        type: "trial",
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        isActive: true,
      };
      localStorage.setItem(STORAGE_KEYS.USER_PASS, JSON.stringify(defaultPass));
      return defaultPass;
    }
    return JSON.parse(raw);
  } catch {
    return { type: "trial", expiresAt: "2099-01-01", isActive: true };
  }
}

export function activateAccessPass(passType: "semester_cram" | "full_access", orderNumber: string): UserAccessPass {
  const durationDays = passType === "semester_cram" ? 90 : 180;
  const expiry = new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000).toISOString();
  const pass: UserAccessPass = {
    type: passType,
    expiresAt: expiry,
    isActive: true,
    orderNumber,
  };
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.USER_PASS, JSON.stringify(pass));
  }
  return pass;
}
