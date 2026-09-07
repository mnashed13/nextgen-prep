import { CaseQuestion, ClinicalCase, CJMMStep } from "../mock-cases";

export interface QuestionGradeResult {
  questionId: string;
  stepNumber: number;
  stepName: CJMMStep;
  earnedPoints: number;
  maxPoints: number;
  percentage: number;
  isFullyCorrect: boolean;
  scoringRuleApplied: string;
  userAnswer: unknown;
  correctAnswerSummary: unknown;
  detailedItemResults?: {
    itemId: string;
    itemLabel: string;
    userSelected: unknown;
    correctExpected: unknown;
    pointsAwarded: number;
    explanation?: string;
  }[];
}

export interface ExamGradeResult {
  caseId: string;
  completedAt: string;
  totalEarnedPoints: number;
  totalPossiblePoints: number;
  overallPercentage: number;
  isPassing: boolean; // >= 75% benchmark
  timeSpentSeconds?: number;
  cjmmStepScores: Record<
    CJMMStep,
    { earned: number; possible: number; percentage: number }
  >;
  questionResults: QuestionGradeResult[];
}

export function gradeQuestion(
  question: CaseQuestion,
  userAnswer: unknown
): QuestionGradeResult {
  switch (question.type) {
    case "highlight": {
      // Highlight question: userAnswer is array of segment IDs selected e.g. ["seg-1", "seg-2"]
      const selectedIds: string[] = Array.isArray(userAnswer)
        ? (userAnswer as string[])
        : [];
      let earned = 0;
      const details: NonNullable<QuestionGradeResult["detailedItemResults"]> = [];

      question.textSegments.forEach((seg) => {
        const wasSelected = selectedIds.includes(seg.id);
        let pts = 0;
        if (seg.isCorrectCue) {
          if (wasSelected) {
            pts = 1;
            earned += 1;
          }
        } else {
          if (wasSelected) {
            pts = -1;
            earned -= 1;
          }
        }
        details.push({
          itemId: seg.id,
          itemLabel: seg.text,
          userSelected: wasSelected,
          correctExpected: seg.isCorrectCue,
          pointsAwarded: pts,
          explanation: question.rationale.optionsFeedback[seg.id],
        });
      });

      // Floored at 0 per NCSBN +/- rules
      const finalScore = Math.max(0, Math.min(question.maxScore, earned));

      return {
        questionId: question.id,
        stepNumber: question.stepNumber,
        stepName: question.stepName,
        earnedPoints: finalScore,
        maxPoints: question.maxScore,
        percentage: Math.round((finalScore / question.maxScore) * 100),
        isFullyCorrect: finalScore === question.maxScore,
        scoringRuleApplied: "NCSBN +/- Rule (Floor 0)",
        userAnswer: selectedIds,
        correctAnswerSummary: question.textSegments.filter((s) => s.isCorrectCue).map((s) => s.id),
        detailedItemResults: details,
      };
    }

    case "matrix": {
      // userAnswer is Record<rowId, selectedColumnId> e.g. { "row-1": "col-septic" }
      const answers: Record<string, string> =
        typeof userAnswer === "object" && userAnswer !== null
          ? (userAnswer as Record<string, string>)
          : {};
      let earned = 0;
      const details: NonNullable<QuestionGradeResult["detailedItemResults"]> = [];

      question.rows.forEach((row) => {
        const selected = answers[row.id];
        const isCorrect = selected === row.correctColumnId;
        const pts = isCorrect ? 1 : 0;
        earned += pts;

        details.push({
          itemId: row.id,
          itemLabel: row.finding,
          userSelected: selected,
          correctExpected: row.correctColumnId,
          pointsAwarded: pts,
          explanation: question.rationale.optionsFeedback[row.id],
        });
      });

      return {
        questionId: question.id,
        stepNumber: question.stepNumber,
        stepName: question.stepName,
        earnedPoints: earned,
        maxPoints: question.maxScore,
        percentage: Math.round((earned / question.maxScore) * 100),
        isFullyCorrect: earned === question.maxScore,
        scoringRuleApplied: "NCSBN 0/1 Rule (1 pt per correct row)",
        userAnswer: answers,
        correctAnswerSummary: question.rows.reduce(
          (acc, r) => ({ ...acc, [r.id]: r.correctColumnId }),
          {}
        ),
        detailedItemResults: details,
      };
    }

    case "drag_priority": {
      // userAnswer is array of item IDs in order of priority: e.g. ["hypo-1", "hypo-2", "hypo-3", "hypo-4"]
      const userOrder: string[] = Array.isArray(userAnswer)
        ? (userAnswer as string[])
        : question.items.map((i) => i.id);
      let earned = 0;
      const details: NonNullable<QuestionGradeResult["detailedItemResults"]> = [];

      question.items.forEach((item) => {
        const userRank = userOrder.indexOf(item.id) + 1;
        const isCorrect = userRank === item.correctRank;
        const pts = isCorrect ? 1 : 0;
        earned += pts;

        details.push({
          itemId: item.id,
          itemLabel: item.label,
          userSelected: `Rank ${userRank}`,
          correctExpected: `Rank ${item.correctRank}`,
          pointsAwarded: pts,
          explanation: question.rationale.optionsFeedback[item.id],
        });
      });

      return {
        questionId: question.id,
        stepNumber: question.stepNumber,
        stepName: question.stepName,
        earnedPoints: earned,
        maxPoints: question.maxScore,
        percentage: Math.round((earned / question.maxScore) * 100),
        isFullyCorrect: earned === question.maxScore,
        scoringRuleApplied: "NCSBN 0/1 Rank Precision",
        userAnswer: userOrder,
        correctAnswerSummary: question.items
          .sort((a, b) => a.correctRank - b.correctRank)
          .map((i) => i.id),
        detailedItemResults: details,
      };
    }

    case "cloze_dropdown": {
      // userAnswer: { dropdown1: string, dropdown2: string }
      const answers: { dropdown1?: string; dropdown2?: string } =
        typeof userAnswer === "object" && userAnswer !== null
          ? (userAnswer as { dropdown1?: string; dropdown2?: string })
          : {};
      const drop1Correct = answers.dropdown1 === question.dropdown1.correctOptionId;
      const drop2Correct = answers.dropdown2 === question.dropdown2.correctOptionId;

      // In NCSBN Rationale Dyad: both cause & effect must be correct to award full points
      let earned = 0;
      if (drop1Correct && drop2Correct) {
        earned = question.maxScore;
      } else if (drop1Correct) {
        earned = 1; // 1 point for action
      } else {
        earned = 0;
      }

      return {
        questionId: question.id,
        stepNumber: question.stepNumber,
        stepName: question.stepName,
        earnedPoints: earned,
        maxPoints: question.maxScore,
        percentage: Math.round((earned / question.maxScore) * 100),
        isFullyCorrect: earned === question.maxScore,
        scoringRuleApplied: "NCSBN Rationale Dyad Rule (Paired Cause & Effect)",
        userAnswer: answers,
        correctAnswerSummary: {
          dropdown1: question.dropdown1.correctOptionId,
          dropdown2: question.dropdown2.correctOptionId,
        },
        detailedItemResults: [
          {
            itemId: question.dropdown1.id,
            itemLabel: "First-Line Clinical Intervention",
            userSelected: answers.dropdown1,
            correctExpected: question.dropdown1.correctOptionId,
            pointsAwarded: drop1Correct ? 1 : 0,
            explanation: question.rationale.optionsFeedback[answers.dropdown1 || ""],
          },
          {
            itemId: question.dropdown2.id,
            itemLabel: "Underlying Pathophysiologic Rationale",
            userSelected: answers.dropdown2,
            correctExpected: question.dropdown2.correctOptionId,
            pointsAwarded: drop2Correct && drop1Correct ? 1 : 0,
            explanation: question.rationale.optionsFeedback[answers.dropdown2 || ""],
          },
        ],
      };
    }

    case "multiple_response": {
      // userAnswer: array of selected option IDs e.g. ["act-1", "act-2"]
      const selected: string[] = Array.isArray(userAnswer)
        ? (userAnswer as string[])
        : [];
      let rawScore = 0;
      const details: NonNullable<QuestionGradeResult["detailedItemResults"]> = [];

      question.options.forEach((opt) => {
        const isChosen = selected.includes(opt.id);
        let pts = 0;
        if (opt.isCorrect) {
          if (isChosen) {
            pts = 1;
            rawScore += 1;
          }
        } else {
          if (isChosen) {
            pts = -1;
            rawScore -= 1;
          }
        }

        details.push({
          itemId: opt.id,
          itemLabel: opt.label,
          userSelected: isChosen,
          correctExpected: opt.isCorrect,
          pointsAwarded: pts,
          explanation: opt.rationaleSnippet,
        });
      });

      const finalPoints = Math.max(0, Math.min(question.maxScore, rawScore));

      return {
        questionId: question.id,
        stepNumber: question.stepNumber,
        stepName: question.stepName,
        earnedPoints: finalPoints,
        maxPoints: question.maxScore,
        percentage: Math.round((finalPoints / question.maxScore) * 100),
        isFullyCorrect: finalPoints === question.maxScore,
        scoringRuleApplied: "NCSBN Multiple-Response (+/- Rule, Floor 0)",
        userAnswer: selected,
        correctAnswerSummary: question.options.filter((o) => o.isCorrect).map((o) => o.id),
        detailedItemResults: details,
      };
    }

    case "evaluate_matrix": {
      // userAnswer: Record<parameterId or rowId, selectedStatus>
      const answers: Record<string, string> =
        typeof userAnswer === "object" && userAnswer !== null
          ? (userAnswer as Record<string, string>)
          : {};
      let earned = 0;
      const details: NonNullable<QuestionGradeResult["detailedItemResults"]> = [];

      // Check whether it's parameters or rows
      if (question.parameters && question.parameters.length > 0) {
        question.parameters.forEach((param) => {
          const sel = answers[param.id];
          const isCorrect = sel === param.correctStatus;
          const pts = isCorrect ? 1 : 0;
          earned += pts;
          details.push({
            itemId: param.id,
            itemLabel: `${param.parameter}: ${param.finding}`,
            userSelected: sel,
            correctExpected: param.correctStatus,
            pointsAwarded: pts,
            explanation: question.rationale.optionsFeedback[param.id],
          });
        });
      } else if (question.rows && question.rows.length > 0) {
        question.rows.forEach((row) => {
          const sel = answers[row.id];
          const isCorrect = sel === row.correctColumnId;
          const pts = isCorrect ? 1 : 0;
          earned += pts;
          details.push({
            itemId: row.id,
            itemLabel: row.finding,
            userSelected: sel,
            correctExpected: row.correctColumnId,
            pointsAwarded: pts,
            explanation: question.rationale.optionsFeedback[row.id],
          });
        });
      }

      const summary = question.parameters
        ? question.parameters.reduce((acc: Record<string, string>, p) => ({ ...acc, [p.id]: p.correctStatus }), {})
        : question.rows
        ? question.rows.reduce((acc: Record<string, string>, r) => ({ ...acc, [r.id]: r.correctColumnId }), {})
        : {};

      return {
        questionId: question.id,
        stepNumber: question.stepNumber,
        stepName: question.stepName,
        earnedPoints: earned,
        maxPoints: question.maxScore,
        percentage: Math.round((earned / question.maxScore) * 100),
        isFullyCorrect: earned === question.maxScore,
        scoringRuleApplied: "NCSBN 0/1 Matrix Evaluation",
        userAnswer: answers,
        correctAnswerSummary: summary,
        detailedItemResults: details,
      };
    }

    default: {
      const q = question as CaseQuestion;
      return {
        questionId: q.id,
        stepNumber: q.stepNumber,
        stepName: q.stepName,
        earnedPoints: 0,
        maxPoints: q.maxScore,
        percentage: 0,
        isFullyCorrect: false,
        scoringRuleApplied: "Standard",
        userAnswer: null,
        correctAnswerSummary: null,
      };
    }
  }
}

export function gradeExam(
  caseStudy: ClinicalCase,
  studentAnswers: Record<string, unknown>,
  timeSpentSeconds?: number
): ExamGradeResult {
  let totalEarned = 0;
  let totalPossible = 0;

  const stepScores: Record<
    CJMMStep,
    { earned: number; possible: number; percentage: number }
  > = {
    recognize_cues: { earned: 0, possible: 0, percentage: 0 },
    analyze_cues: { earned: 0, possible: 0, percentage: 0 },
    prioritize_hypotheses: { earned: 0, possible: 0, percentage: 0 },
    generate_solutions: { earned: 0, possible: 0, percentage: 0 },
    take_action: { earned: 0, possible: 0, percentage: 0 },
    evaluate_outcomes: { earned: 0, possible: 0, percentage: 0 },
  };

  const results: QuestionGradeResult[] = caseStudy.questions.map((q) => {
    const res = gradeQuestion(q, studentAnswers[q.id]);
    totalEarned += res.earnedPoints;
    totalPossible += res.maxPoints;

    stepScores[q.stepName].earned += res.earnedPoints;
    stepScores[q.stepName].possible += res.maxPoints;

    return res;
  });

  // Calculate percentages per step
  (Object.keys(stepScores) as CJMMStep[]).forEach((step) => {
    const s = stepScores[step];
    s.percentage = s.possible > 0 ? Math.round((s.earned / s.possible) * 100) : 0;
  });

  const overallPercentage =
    totalPossible > 0 ? Math.round((totalEarned / totalPossible) * 100) : 0;

  return {
    caseId: caseStudy.id,
    completedAt: new Date().toISOString(),
    totalEarnedPoints: totalEarned,
    totalPossiblePoints: totalPossible,
    overallPercentage,
    isPassing: overallPercentage >= 75,
    timeSpentSeconds,
    cjmmStepScores: stepScores,
    questionResults: results,
  };
}
