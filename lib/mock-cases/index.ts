export type CJMMStep =
  | "recognize_cues"
  | "analyze_cues"
  | "prioritize_hypotheses"
  | "generate_solutions"
  | "take_action"
  | "evaluate_outcomes";

export interface NursesNote {
  id: string;
  timestamp: string;
  author: string;
  role: string;
  content: string;
  highlightableSegments?: { id: string; text: string; isAbnormalCue?: boolean }[];
}

export interface VitalSignEntry {
  timestamp: string;
  bp: string;
  isBpAbnormal?: boolean;
  hr: number;
  isHrAbnormal?: boolean;
  rr: number;
  isRrAbnormal?: boolean;
  temp: number; // in Celsius or Fahrenheit
  tempUnit: "°F" | "°C";
  isTempAbnormal?: boolean;
  spo2: number;
  isSpo2Abnormal?: boolean;
  o2Delivery: string;
  painScore: string;
}

export interface LabResultEntry {
  category: "Hematology" | "Chemistry" | "Arterial Blood Gas" | "Microbiology" | "Cardiac Biomarkers";
  testName: string;
  value: string;
  numericValue?: number;
  unit: string;
  referenceRange: string;
  flag: "H" | "L" | "NORMAL" | "CRITICAL";
}

export interface ProviderOrderEntry {
  id: string;
  timestamp: string;
  orderType: "Medication" | "Diagnostic" | "Nursing Intervention" | "Consult";
  description: string;
  urgency: "STAT" | "Routine" | "PRN";
  route?: string;
  status: "Active" | "Completed" | "Pending Pharmacy Verification";
}

export interface EHRData {
  patientProfile: {
    name: string;
    mrn: string;
    age: number;
    gender: string;
    admitDate: string;
    allergies: string[];
    codeStatus: string;
    weightKg: number;
    attendingPhysician: string;
    diagnosis: string;
  };
  nursesNotes: NursesNote[];
  vitals: VitalSignEntry[];
  labs: LabResultEntry[];
  orders: ProviderOrderEntry[];
}

// Question Type Definitions
export interface BaseQuestion {
  id: string;
  stepNumber: 1 | 2 | 3 | 4 | 5 | 6;
  stepName: CJMMStep;
  title: string;
  prompt: string;
  instructionNote?: string;
  maxScore: number;
  scoringMethod: "0/1" | "+/-" | "rationale_dyad";
  rationale: {
    overview: string;
    pathophysiology: string;
    clinicalPearl: string;
    optionsFeedback: Record<string, string>;
  };
}

export interface RecognizeCuesQuestion extends BaseQuestion {
  type: "highlight";
  textSegments: {
    id: string;
    text: string;
    isCorrectCue: boolean;
  }[];
}

export interface AnalyzeCuesQuestion extends BaseQuestion {
  type: "matrix";
  columns: { id: string; label: string }[];
  rows: {
    id: string;
    finding: string;
    correctColumnId: string; // or multiple
  }[];
}

export interface PrioritizeHypothesesQuestion extends BaseQuestion {
  type: "drag_priority";
  items: {
    id: string;
    label: string;
    details: string;
    correctRank: number; // 1-based index
  }[];
}

export interface ClozeDropdownQuestion extends BaseQuestion {
  type: "cloze_dropdown";
  prefixText: string;
  dropdown1: {
    id: string;
    placeholder: string;
    options: { id: string; label: string }[];
    correctOptionId: string;
  };
  middleText: string;
  dropdown2: {
    id: string;
    placeholder: string;
    options: { id: string; label: string }[];
    correctOptionId: string;
  };
  suffixText?: string;
}

export interface MultipleResponseQuestion extends BaseQuestion {
  type: "multiple_response";
  options: {
    id: string;
    label: string;
    isCorrect: boolean;
    rationaleSnippet: string;
  }[];
}

export interface EvaluateOutcomesQuestion extends BaseQuestion {
  type: "evaluate_matrix";
  columns?: { id: string; label: string }[];
  rows?: {
    id: string;
    finding: string;
    correctColumnId: string;
  }[];
  parameters?: {
    id: string;
    parameter: string;
    finding: string;
    correctStatus: string;
  }[];
}

export type CaseQuestion =
  | RecognizeCuesQuestion
  | AnalyzeCuesQuestion
  | PrioritizeHypothesesQuestion
  | ClozeDropdownQuestion
  | MultipleResponseQuestion
  | EvaluateOutcomesQuestion;

export interface ClinicalCase {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  specialty: "Critical Care" | "Pediatrics" | "Cardiology" | "Emergency Medicine" | "Med-Surg";
  targetExam: "NextGen NCLEX-RN" | "USMLE Step 2 CK" | "Both";
  difficulty: "Medium" | "High" | "Extreme";
  estimatedMinutes: number;
  ehr: EHRData;
  questions: CaseQuestion[];
}
