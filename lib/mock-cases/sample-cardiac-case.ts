import { ClinicalCase } from "./index";

export const sampleCardiacCase: ClinicalCase = {
  id: "case-cardiac-003",
  slug: "acute-stemi-cardiogenic-shock",
  title: "Clinical Scenario: Acute Coronary Syndrome with Hemodynamic Collapse",
  subtitle: "58-Year-Old Male with Anterior STEMI Complicated by Cardiogenic Shock and Ventricular Ectopy",
  specialty: "Cardiology",
  targetExam: "Both",
  difficulty: "High",
  estimatedMinutes: 20,
  ehr: {
    patientProfile: {
      name: "Arthur Pendelton",
      mrn: "MRN-5510924",
      age: 58,
      gender: "Male",
      admitDate: "2026-09-07",
      allergies: ["Aspirin (Bronchospasm / Asthma Exacerbation)"],
      codeStatus: "Full Code",
      weightKg: 88,
      attendingPhysician: "Dr. Sanjay Gupta, MD, FACC (Interventional Cardiology)",
      diagnosis: "Acute Extensive Anterior Myocardial Infarction / Cardiogenic Shock",
    },
    nursesNotes: [
      {
        id: "card-note-1",
        timestamp: "08:15 (Emergency Department Arrival)",
        author: "David Kim, BSN, RN, CCRN",
        role: "Cardiac Triage Nurse",
        content:
          "58-year-old male arrived via EMS with active crushing substernal chest pressure (9/10) radiating to left jaw and shoulder, onset 90 minutes prior while mowing lawn. Pre-hospital 12-lead ECG demonstrated 4 mm ST-segment elevation in leads V1-V4 with reciprocal depressions in II, III, and aVF. EMS administered sublingual nitroglycerin x1 en route, which resulted in a profound blood pressure drop from 138/82 to 84/50 mmHg and worsening lightheadedness.",
        highlightableSegments: [
          { id: "card-cue-1", text: "crushing substernal chest pressure radiating to left jaw and shoulder", isAbnormalCue: true },
          { id: "card-cue-2", text: "ST-segment elevation in leads V1-V4", isAbnormalCue: true },
          { id: "card-cue-3", text: "blood pressure drop from 138/82 to 84/50 mmHg following nitroglycerin", isAbnormalCue: true },
          { id: "card-cue-4", text: "Aspirin (Bronchospasm / Asthma Exacerbation)", isAbnormalCue: true },
        ],
      },
      {
        id: "card-note-2",
        timestamp: "08:35",
        author: "David Kim, BSN, RN, CCRN",
        role: "Primary Resuscitation Nurse",
        content:
          "Cardiac catheterization lab activated STAT. Patient is diaphoresis-drenched, pale, and tachypneic. Auscultation reveals bilateral diffuse pulmonary crackles extending to mid-scapular lines. New S3 gallop appreciated at apex. Peripheral pulses are thready and cool extremities with mottling over patellae. Telemetry monitor shows frequent multifocal PVCs and brief runs of non-sustained ventricular tachycardia (NSVT) at 160 bpm.",
        highlightableSegments: [
          { id: "card-cue-5", text: "bilateral diffuse pulmonary crackles extending to mid-scapular lines", isAbnormalCue: true },
          { id: "card-cue-6", text: "New S3 gallop appreciated at apex", isAbnormalCue: true },
          { id: "card-cue-7", text: "cool extremities with mottling over patellae", isAbnormalCue: true },
          { id: "card-cue-8", text: "runs of non-sustained ventricular tachycardia (NSVT)", isAbnormalCue: true },
        ],
      },
    ],
    vitals: [
      {
        timestamp: "08:15",
        bp: "84/50",
        isBpAbnormal: true,
        hr: 114,
        isHrAbnormal: true,
        rr: 26,
        isRrAbnormal: true,
        temp: 98.2,
        tempUnit: "°F",
        spo2: 90,
        isSpo2Abnormal: true,
        o2Delivery: "Room Air",
        painScore: "9/10",
      },
      {
        timestamp: "08:35",
        bp: "78/44",
        isBpAbnormal: true,
        hr: 124,
        isHrAbnormal: true,
        rr: 30,
        isRrAbnormal: true,
        temp: 98.4,
        tempUnit: "°F",
        spo2: 89,
        isSpo2Abnormal: true,
        o2Delivery: "4 L/min NC",
        painScore: "8/10",
      },
    ],
    labs: [
      {
        category: "Cardiac Biomarkers",
        testName: "High-Sensitivity Troponin I",
        value: "4,820",
        numericValue: 4820,
        unit: "ng/L",
        referenceRange: "0 - 14",
        flag: "CRITICAL",
      },
      {
        category: "Cardiac Biomarkers",
        testName: "B-Type Natriuretic Peptide (BNP)",
        value: "1,450",
        numericValue: 1450,
        unit: "pg/mL",
        referenceRange: "< 100",
        flag: "H",
      },
      {
        category: "Chemistry",
        testName: "Serum Potassium",
        value: "3.2",
        numericValue: 3.2,
        unit: "mEq/L",
        referenceRange: "3.5 - 5.0",
        flag: "L",
      },
      {
        category: "Chemistry",
        testName: "Serum Magnesium",
        value: "1.4",
        numericValue: 1.4,
        unit: "mg/dL",
        referenceRange: "1.8 - 2.4",
        flag: "L",
      },
      {
        category: "Chemistry",
        testName: "Serum Lactate",
        value: "3.8",
        numericValue: 3.8,
        unit: "mmol/L",
        referenceRange: "0.5 - 2.0",
        flag: "H",
      },
    ],
    orders: [
      {
        id: "card-ord-1",
        timestamp: "08:20",
        orderType: "Medication",
        description: "Clopidogrel 600 mg oral loading dose (due to confirmed severe aspirin-induced bronchospasm history)",
        urgency: "STAT",
        route: "Oral",
        status: "Active",
      },
      {
        id: "card-ord-2",
        timestamp: "08:25",
        orderType: "Medication",
        description: "Unfractionated Heparin IV bolus 60 units/kg (max 4,000 units) followed by 12 units/kg/hr maintenance infusion",
        urgency: "STAT",
        route: "IV Push & Infusion",
        status: "Active",
      },
      {
        id: "card-ord-3",
        timestamp: "08:30",
        orderType: "Medication",
        description: "Norepinephrine infusion starting at 0.05 mcg/kg/min titrated to maintain MAP >= 65 mmHg",
        urgency: "STAT",
        route: "IV Infusion",
        status: "Active",
      },
      {
        id: "card-ord-4",
        timestamp: "08:30",
        orderType: "Medication",
        description: "Magnesium Sulfate 2 g IV in 100 mL D5W over 15 minutes AND Potassium Chloride 20 mEq IV piggyback in 100 mL NS over 1 hour",
        urgency: "STAT",
        route: "IV Piggyback",
        status: "Active",
      },
      {
        id: "card-ord-5",
        timestamp: "08:35",
        orderType: "Nursing Intervention",
        description: "Withhold all beta-blockers, nitrates, and ACE-inhibitors due to cardiogenic shock and refractory hypotension",
        urgency: "STAT",
        status: "Active",
      },
    ],
  },
  questions: [
    {
      id: "q-card-1",
      stepNumber: 1,
      stepName: "recognize_cues",
      title: "Step 1: Recognize Cues",
      type: "highlight",
      prompt:
        "Select the 4 clinical cues from the nursing documentation and diagnostics that indicate the client has transitioned from an uncomplicated STEMI to acute Cardiogenic Shock.",
      instructionNote: "Select exactly 4 cues. Credit awarded via NCSBN +/- scoring.",
      maxScore: 4,
      scoringMethod: "+/-",
      textSegments: [
        { id: "card-cue-bp", text: "Persistent systolic hypotension (BP 78/44 mmHg, MAP 55) refractory to initial therapies", isCorrectCue: true },
        { id: "card-cue-pulm", text: "Bilateral diffuse pulmonary crackles with acute hypoxemia (SpO2 89%) and S3 gallop", isCorrectCue: true },
        { id: "card-cue-skin", text: "Cold, clammy extremities with peripheral mottling and elevated lactate (3.8 mmol/L)", isCorrectCue: true },
        { id: "card-cue-arr", text: "Frequent multifocal PVCs and runs of non-sustained ventricular tachycardia (NSVT)", isCorrectCue: true },
        { id: "card-cue-temp", text: "Normal oral body temperature of 98.4°F", isCorrectCue: false },
        { id: "card-cue-wt", text: "Patient body weight of 88 kg", isCorrectCue: false },
      ],
      rationale: {
        overview:
          "Cardiogenic shock is characterized by severe pump failure resulting in inadequate tissue perfusion despite adequate intravascular volume. Diagnostic cues include sustained hypotension (SBP < 90 or MAP drop > 30), pulmonary congestion (elevated wedge pressure, crackles, S3), and end-organ hypoperfusion (cool mottled skin, lactic acidosis).",
        pathophysiology:
          "Extensive anterior infarction (LAD occlusion) necrotizes large segments of the left ventricular anterior wall and septum, plummeting stroke volume and ejection fraction. Elevated left ventricular end-diastolic pressure (LVEDP) backs up into pulmonary capillaries causing hydrostatic alveolar edema.",
        clinicalPearl:
          "Cardiogenic shock is a hemodynamic emergency defined by tissue hypoperfusion caused by cardiac dysfunction, characterized by low cardiac output and elevated filling pressures.",
        optionsFeedback: {
          "card-cue-bp": "Correct: Refractory hypotension is a defining component of cardiogenic shock.",
          "card-cue-pulm": "Correct: Pulmonary crackles and S3 reflect acute hydrostatic left ventricular backward failure.",
          "card-cue-skin": "Correct: Cold, clammy skin and lactic acidosis represent severe peripheral forward hypoperfusion.",
          "card-cue-arr": "Correct: Ventricular irritability and NSVT are triggered by acute ischemia, hypokalemia, and hypomagnesemia.",
          "card-cue-temp": "Incorrect: Normal body temperature is not a marker of shock.",
          "card-cue-wt": "Incorrect: Body weight is a baseline metric, not a sign of cardiogenic shock.",
        },
      },
    },
    {
      id: "q-card-2",
      stepNumber: 2,
      stepName: "analyze_cues",
      title: "Step 2: Analyze Cues",
      type: "matrix",
      prompt:
        "Evaluate each medication or intervention. Determine whether it is Indicated, Contraindicated, or Questionable for this patient in Cardiogenic Shock.",
      instructionNote: "Select one status per intervention.",
      maxScore: 4,
      scoringMethod: "0/1",
      columns: [
        { id: "col-ind", label: "Indicated" },
        { id: "col-contra", label: "Contraindicated" },
      ],
      rows: [
        {
          id: "card-row-1",
          finding: "Sublingual or IV Nitroglycerin infusion",
          correctColumnId: "col-contra",
        },
        {
          id: "card-row-2",
          finding: "IV Metoprolol 5 mg slow push for tachycardia",
          correctColumnId: "col-contra",
        },
        {
          id: "card-row-3",
          finding: "Urgent transfer to Cardiac Catheterization Lab for primary Percutaneous Coronary Intervention (PCI)",
          correctColumnId: "col-ind",
        },
        {
          id: "card-row-4",
          finding: "Urgent repletion of serum Potassium (>4.0 mEq/L) and Magnesium (>2.0 mg/dL)",
          correctColumnId: "col-ind",
        },
      ],
      rationale: {
        overview:
          "Standard STEMI therapies like beta-blockers and vasodilators (nitrates/morphine) are strictly CONTRAINDICATED in cardiogenic shock because negative inotropes and venodilators worsen myocardial depression and circulatory collapse. Emergent revascularization (PCI) is the only proven definitive mortality-reducing intervention.",
        pathophysiology:
          "Nitroglycerin reduces preload via venous pooling; in a failing heart dependent on adequate preload to maintain minimum stroke volume, nitrates cause profound vascular collapse. Beta-blockers blunt adrenergic compensation, precipitating electromechanical dissociation.",
        clinicalPearl:
          "In acute STEMI with hypotension (SBP < 90 mmHg) or signs of heart failure/cardiogenic shock: WITHHOLD ALL BETA-BLOCKERS AND NITRATES.",
        optionsFeedback: {
          "card-row-1": "Contraindicated: Nitrates reduce preload and plummet already dangerous blood pressures.",
          "card-row-2": "Contraindicated: Beta-blockers exert negative inotropic effects and worsen cardiogenic shock.",
          "card-row-3": "Indicated: Primary PCI restores coronary artery patency and halts ischemic myocardial death.",
          "card-row-4": "Indicated: Hypokalemia and hypomagnesemia lower the threshold for lethal ventricular fibrillation (VF).",
        },
      },
    },
    {
      id: "q-card-3",
      stepNumber: 3,
      stepName: "prioritize_hypotheses",
      title: "Step 3: Prioritize Hypotheses",
      type: "drag_priority",
      prompt: "Rank the following clinical priorities for this patient from highest urgency to lowest urgency.",
      instructionNote: "Rank 1 is the immediate life threat.",
      maxScore: 4,
      scoringMethod: "0/1",
      items: [
        {
          id: "c-hypo-1",
          label: "Cardiovascular Collapse & Ventricular Fibrillation Arrest",
          details: "Secondary to acute coronary occlusion, myocardial ischemia, and electrolyte derangement",
          correctRank: 1,
        },
        {
          id: "c-hypo-2",
          label: "Acute Hydrostatic Pulmonary Edema with Hypoxemic Respiratory Failure",
          details: "Secondary to elevated left ventricular end-diastolic pressure and pump failure",
          correctRank: 2,
        },
        {
          id: "c-hypo-3",
          label: "Acute Ischemic Tubular Necrosis / Renal Failure",
          details: "Secondary to renal artery hypoperfusion (MAP 55 mmHg)",
          correctRank: 3,
        },
        {
          id: "c-hypo-4",
          label: "Incisional or Femoral Access Bleeding Risk",
          details: "Secondary to pre-catheterization anticoagulation and antiplatelet therapy",
          correctRank: 4,
        },
      ],
      rationale: {
        overview:
          "Lethal ventricular arrhythmias (VF/VT) and pump failure are the leading causes of pre-hospital and early in-hospital death in acute anterior STEMI.",
        pathophysiology:
          "Ischemic myocardium undergoes non-uniform repolarization and slow conduction, predisposing to re-entrant tachyarrhythmias (VT/VF). Hypokalemia and hypomagnesemia further widen electrical dispersion.",
        clinicalPearl:
          "Immediate continuous cardiac rhythm monitoring and readiness for defibrillation are mandatory during all phases of STEMI resuscitation.",
        optionsFeedback: {
          "c-hypo-1": "Rank 1: Arrhythmic arrest and pump failure are immediate mortal threats.",
          "c-hypo-2": "Rank 2: Pulmonary edema requires supplemental oxygen and ventilatory support.",
          "c-hypo-3": "Rank 3: AKI resolves once coronary perfusion and cardiac index are restored.",
          "c-hypo-4": "Rank 4: Access bleeding is monitored post-procedure.",
        },
      },
    },
    {
      id: "q-card-4",
      stepNumber: 4,
      stepName: "generate_solutions",
      title: "Step 4: Generate Solutions",
      type: "cloze_dropdown",
      prompt: "Complete the clinical rationale for antiplatelet therapy selection.",
      instructionNote: "Both dropdowns must be correct to receive credit.",
      maxScore: 2,
      scoringMethod: "rationale_dyad",
      prefixText: "Because the client has a documented history of severe aspirin-induced asthma, the nurse must ensure the client receives ",
      dropdown1: {
        id: "drop-card-med",
        placeholder: "-- Select Antiplatelet Strategy --",
        options: [
          { id: "opt-clop", label: "an oral P2Y12 receptor inhibitor loading dose (such as Clopidogrel 600 mg)" },
          { id: "opt-asp", label: "chewable baby aspirin 324 mg with an inhaled albuterol nebulizer" },
          { id: "opt-warf", label: "oral Warfarin 10 mg with vitamin K on hold" },
          { id: "opt-dab", label: "Dabigatran 150 mg oral capsules" },
        ],
        correctOptionId: "opt-clop",
      },
      middleText: " because ",
      dropdown2: {
        id: "drop-card-rat",
        placeholder: "-- Select Rationale --",
        options: [
          { id: "rat-p2y12", label: "P2Y12 adenosine receptor antagonists inhibit platelet aggregation without inhibiting cyclooxygenase-1 or precipitating bronchospasm" },
          { id: "rat-asp", label: "concurrent bronchodilators completely negate the leukotriene-mediated hypersensitivity reaction caused by COX-1 blockade" },
          { id: "rat-warf", label: "vitamin K antagonists provide immediate rapid platelet inhibition within minutes of ingestion" },
          { id: "rat-dab", label: "direct thrombin inhibitors are superior to all antiplatelet therapies in primary coronary stenting" },
        ],
        correctOptionId: "rat-p2y12",
      },
      suffixText: " prior to PCI stent deployment.",
      rationale: {
        overview:
          "Patients with aspirin-exacerbated respiratory disease (AERD / Samter's Triad) experience life-threatening bronchospasm from cyclooxygenase-1 inhibition. A P2Y12 inhibitor (clopidogrel, prasugrel, or ticagrelor) is given as an alternative or monotherapy loading dose.",
        pathophysiology:
          "COX-1 inhibition by aspirin shunts arachidonic acid metabolism down the 5-lipoxygenase pathway, synthesizing copious cysteinyl leukotrienes (LTC4, LTD4, LTE4) that cause severe bronchospasm and laryngoedema.",
        clinicalPearl:
          "Never give aspirin to an acute coronary syndrome patient with documented aspirin-induced anaphylaxis or severe bronchospasm; use alternative antiplatelet regimens (P2Y12 inhibitors).",
        optionsFeedback: {
          "opt-clop": "Correct: P2Y12 inhibitors provide essential platelet inhibition without triggering bronchospasm.",
          "opt-asp": "Incorrect: Giving aspirin in aspirin-induced asthma can cause fatal asphyxiation.",
          "opt-warf": "Incorrect: Warfarin takes days to take effect and is an anticoagulant, not an antiplatelet.",
          "opt-dab": "Incorrect: Dabigatran does not replace antiplatelet therapy for coronary stents.",
        },
      },
    },
    {
      id: "q-card-5",
      stepNumber: 5,
      stepName: "take_action",
      title: "Step 5: Take Action",
      type: "multiple_response",
      prompt:
        "The nurse is preparing the client for emergent transfer to the cardiac catheterization lab. Which actions are required? Select all that apply.",
      instructionNote: "NCSBN Multiple Response (+/- scoring rule).",
      maxScore: 5,
      scoringMethod: "+/-",
      options: [
        {
          id: "act-c-1",
          label: "Attach defibrillator pads to the client's chest in anterior-posterior or anterior-lateral configuration",
          isCorrect: true,
          rationaleSnippet: "Essential for immediate hands-free defibrillation if NSVT deteriorates to VF.",
        },
        {
          id: "act-c-2",
          label: "Administer 2 Liters of 0.9% Normal Saline wide open under pressure bag to correct hypotension",
          isCorrect: false,
          rationaleSnippet: "Contraindicated: large fluid boluses in cardiogenic shock exacerbate acute pulmonary edema and drown the alveoli.",
        },
        {
          id: "act-c-3",
          label: "Infuse IV Potassium and Magnesium infusions to bring electrolytes to cardioprotective targets (K > 4.0, Mg > 2.0)",
          isCorrect: true,
          rationaleSnippet: "Electrolyte optimization stabilizes cardiac transmembrane resting potential.",
        },
        {
          id: "act-c-4",
          label: "Initiate Norepinephrine IV titration through dedicated vascular access to restore coronary perfusion pressure (MAP >= 65 mmHg)",
          isCorrect: true,
          rationaleSnippet: "Preferred vasopressor/inotrope in cardiogenic shock to maintain diastolic coronary filling pressure.",
        },
        {
          id: "act-c-5",
          label: "Verify signed procedural consent or document emergency doctrine exception with interventional cardiology",
          isCorrect: true,
          rationaleSnippet: "Ensures legal and clinical protocol compliance for emergent life-saving PCI.",
        },
        {
          id: "act-c-6",
          label: "Administer IV Morphine sulfate 8 mg to calm the patient and reduce pulmonary congestion",
          isCorrect: false,
          rationaleSnippet: "Avoided in cardiogenic shock: morphine causes venodilation, histamine release, blunts P2Y12 absorption, and increases mortality in STEMI.",
        },
      ],
      rationale: {
        overview:
          "Preparation for emergency catheterization in cardiogenic shock focuses on hemodynamic stabilization, arrhythmia prevention, electrolyte repletion, and rapid transport.",
        pathophysiology:
          "In cardiogenic shock with pulmonary edema, the left ventricular end-diastolic pressure is already severely elevated (>20 mmHg). Infusing liters of normal saline will precipitate catastrophic respiratory failure. In contrast, vasopressors (norepinephrine) increase aortic root diastolic pressure, driving blood into the coronary arteries.",
        clinicalPearl:
          "AHA/ACC guidelines discourage routine morphine in acute coronary syndromes due to delayed oral antiplatelet absorption and increased mortality.",
        optionsFeedback: {
          "act-c-1": "Correct: Hands-free pads save vital seconds during ventricular fibrillation arrest.",
          "act-c-2": "Incorrect: Large fluid boluses are contraindicated in cardiogenic shock with pulmonary edema.",
          "act-c-3": "Correct: Repleting potassium and magnesium prevents lethal ventricular ectopy.",
          "act-c-4": "Correct: Norepinephrine is the vasopressor of choice in cardiogenic shock.",
          "act-c-5": "Correct: Emergency consent protocols must be documented.",
          "act-c-6": "Incorrect: Morphine increases mortality in STEMI and impairs antiplatelet absorption.",
        },
      },
    },
    {
      id: "q-card-6",
      stepNumber: 6,
      stepName: "evaluate_outcomes",
      title: "Step 6: Evaluate Outcomes",
      type: "evaluate_matrix",
      prompt:
        "The patient underwent successful balloon angioplasty and drug-eluting stent placement of a 100% proximal LAD occlusion with an Intra-Aortic Balloon Pump (IABP) placed. In the Cardiac ICU, determine whether each parameter indicates Successful Reperfusion / Hemodynamic Stabilization or Acute Complication.",
      instructionNote: "Select one outcome category per finding.",
      maxScore: 3,
      scoringMethod: "0/1",
      columns: [
        { id: "col-stabilized", label: "Stabilized / Reperfused" },
        { id: "col-complication", label: "Acute Complication" },
      ],
      rows: [
        {
          id: "card-eval-1",
          finding: "> 70% resolution of ST-segment elevation on repeat 12-lead ECG and complete relief of chest pressure",
          correctColumnId: "col-stabilized",
        },
        {
          id: "card-eval-2",
          finding: "Sudden loss of palpable right dorsalis pedis pulse, with right foot becoming pale and cold to touch (IABP inserted via right femoral artery)",
          correctColumnId: "col-complication",
        },
        {
          id: "card-eval-3",
          finding: "MAP increased to 74 mmHg with weaning norepinephrine requirement; urine output 45 mL/hr",
          correctColumnId: "col-stabilized",
        },
      ],
      rationale: {
        overview:
          "Evaluating post-PCI outcomes involves verifying myocardial reperfusion (ST resolution, pain relief) while aggressively screening for mechanical circulatory support complications (limb ischemia from femoral IABP cannula).",
        pathophysiology:
          "Femoral artery cannulation for an Intra-Aortic Balloon Pump can cause arterial dissection, thrombosis, or catheter-induced vessel occlusion, leading to acute limb ischemia.",
        clinicalPearl:
          "Always perform bilateral distal neurovascular checks (pulses, temperature, color, capillary refill) every 15 minutes immediately after IABP placement.",
        optionsFeedback: {
          "card-eval-1": "Stabilized: Rapid ST resolution confirms restored microvascular epicardial flow.",
          "card-eval-2": "Complication: Loss of pedal pulses signifies acute limb ischemia requiring urgent vascular surgical intervention.",
          "card-eval-3": "Stabilized: Normalizing MAP and urine output confirm restored renal and systemic perfusion.",
        },
      },
    },
  ],
};
