import { ClinicalCase } from "./index";

export const samplePediatricCase: ClinicalCase = {
  id: "case-peds-002",
  slug: "pediatric-acute-respiratory-stridor",
  title: "Clinical Scenario: Acute Stridor in a Preschool Child",
  subtitle: "3-Year-Old Male Presenting with Toxic Appearance, High Fever, and Inspiratory Stridor",
  specialty: "Pediatrics",
  targetExam: "Both",
  difficulty: "Extreme",
  estimatedMinutes: 20,
  ehr: {
    patientProfile: {
      name: "Liam O'Connor",
      mrn: "MRN-3301982",
      age: 3,
      gender: "Male",
      admitDate: "2026-09-07",
      allergies: ["No Known Drug Allergies (NKDA)"],
      codeStatus: "Full Code",
      weightKg: 14.5,
      attendingPhysician: "Dr. Elena Rostova, MD (Pediatric Emergency Medicine)",
      diagnosis: "Acute Upper Airway Obstruction / Suspected Acute Epiglottitis",
    },
    nursesNotes: [
      {
        id: "peds-note-1",
        timestamp: "02:15 (Emergency Department Arrival)",
        author: "Hannah Cole, BSN, RN, CPN",
        role: "Triage Nurse",
        content:
          "Brought to ED by parents via private vehicle. Parents state child went to bed with mild rhinorrhea and sore throat at 20:00, but woke up abruptly at 01:30 screaming, drooling saliva, and making high-pitched whistling sounds when breathing in. Child refuses to lie down and sits leaning forward with neck extended and hands resting on knees (tripod positioning). Parents report child has not received standard Hib (Haemophilus influenzae type b) vaccine due to parental hesitancy.",
        highlightableSegments: [
          { id: "peds-cue-1", text: "drooling saliva", isAbnormalCue: true },
          { id: "peds-cue-2", text: "high-pitched whistling sounds when breathing in", isAbnormalCue: true },
          { id: "peds-cue-3", text: "sits leaning forward with neck extended and hands resting on knees (tripod positioning)", isAbnormalCue: true },
          { id: "peds-cue-4", text: "has not received standard Hib vaccine", isAbnormalCue: true },
        ],
      },
      {
        id: "peds-note-2",
        timestamp: "02:30",
        author: "Hannah Cole, BSN, RN, CPN",
        role: "Primary Pediatric Nurse",
        content:
          "Child appears toxic, anxious, and pale. Dysphagia evident: excessive clear saliva dripping from chin. No spontaneous cough heard. Inspiratory stridor audible without stethoscope. Suprasternal and subcostal retractions noted on respiration. Child clings to mother's chest; becomes agitated when staff approach with blood pressure cuff. Pediatric airway team and ENT on-call paged STAT.",
        highlightableSegments: [
          { id: "peds-cue-5", text: "toxic, anxious, and pale", isAbnormalCue: true },
          { id: "peds-cue-6", text: "Dysphagia evident: excessive clear saliva dripping from chin", isAbnormalCue: true },
          { id: "peds-cue-7", text: "No spontaneous cough heard", isAbnormalCue: true },
          { id: "peds-cue-8", text: "Suprasternal and subcostal retractions noted", isAbnormalCue: true },
        ],
      },
    ],
    vitals: [
      {
        timestamp: "02:20",
        bp: "102/64",
        hr: 168,
        isHrAbnormal: true,
        rr: 44,
        isRrAbnormal: true,
        temp: 103.8,
        tempUnit: "°F",
        isTempAbnormal: true,
        spo2: 91,
        isSpo2Abnormal: true,
        o2Delivery: "Blow-by oxygen via parent's hand",
        painScore: "FLACC 7/10",
      },
    ],
    labs: [
      {
        category: "Hematology",
        testName: "WBC Count",
        value: "26.8",
        numericValue: 26.8,
        unit: "x10³/µL",
        referenceRange: "5.0 - 15.0",
        flag: "H",
      },
      {
        category: "Hematology",
        testName: "Neutrophils (%)",
        value: "84",
        numericValue: 84,
        unit: "%",
        referenceRange: "35 - 65",
        flag: "H",
      },
      {
        category: "Microbiology",
        testName: "Rapid Influenza A/B & RSV PCR",
        value: "Negative",
        unit: "",
        referenceRange: "Negative",
        flag: "NORMAL",
      },
    ],
    orders: [
      {
        id: "peds-ord-1",
        timestamp: "02:35",
        orderType: "Nursing Intervention",
        description: "Maintain child in position of comfort in mother's arms; DO NOT attempt throat examination, tongue depressor use, or IV cannulation in ED",
        urgency: "STAT",
        status: "Active",
      },
      {
        id: "peds-ord-2",
        timestamp: "02:35",
        orderType: "Medication",
        description: "Humidified high-flow oxygen via blow-by mask held by parent as tolerated",
        urgency: "STAT",
        route: "Inhalation",
        status: "Active",
      },
      {
        id: "peds-ord-3",
        timestamp: "02:40",
        orderType: "Consult",
        description: "Emergency Operating Room (OR) transfer with Pediatric Anesthesiology and Otolaryngology for direct laryngoscopy and endotracheal intubation",
        urgency: "STAT",
        status: "Active",
      },
    ],
  },
  questions: [
    {
      id: "q-peds-1",
      stepNumber: 1,
      stepName: "recognize_cues",
      title: "Step 1: Recognize Cues",
      type: "highlight",
      prompt:
        "Select the 4 classic clinical cues from the presentation that differentiate acute epiglottitis from viral laryngotracheobronchitis (croup).",
      instructionNote: "Select exactly 4 cues. Score is based on NCSBN +/- rules.",
      maxScore: 4,
      scoringMethod: "+/-",
      textSegments: [
        { id: "peds-seg-1", text: "Excessive drooling with inability to swallow secretions (dysphagia)", isCorrectCue: true },
        { id: "peds-seg-2", text: "Absence of a barking/croupy cough", isCorrectCue: true },
        { id: "peds-seg-3", text: "Tripod positioning (sitting upright, leaning forward with chin thrust)", isCorrectCue: true },
        { id: "peds-seg-4", text: "Unimmunized status for Haemophilus influenzae type b (Hib)", isCorrectCue: true },
        { id: "peds-seg-5", text: "Presence of mild rhinorrhea earlier in the evening", isCorrectCue: false },
        { id: "peds-seg-6", text: "Weight of 14.5 kg in a 3-year-old child", isCorrectCue: false },
      ],
      rationale: {
        overview:
          "The '4 Ds' of epiglottitis are Drooling, Dysphagia, Dysphonia, and Distressed inspiratory efforts. The lack of a barking cough and rapid onset of high fever with tripod posturing distinguishes this emergency from croup.",
        pathophysiology:
          "Acute bacterial epiglottitis causes severe cellulitis and edema of the epiglottis and aryepiglottic folds. The supraglottic swelling mechanical obstructs the larynx. Any distress or oropharyngeal stimulation can provoke fatal laryngospasm.",
        clinicalPearl:
          "Never place a tongue blade or swab into the throat of a child with suspected epiglottitis—doing so can trigger complete airway obstruction and immediate cardiac arrest.",
        optionsFeedback: {
          "peds-seg-1": "Correct: Drooling occurs due to excruciating odynophagia and supraglottic mechanical obstruction.",
          "peds-seg-2": "Correct: Epiglottitis is characterized by quiet breathing and the distinct absence of a barking cough.",
          "peds-seg-3": "Correct: Tripod posture optimizes the anterior-posterior diameter of the compromised airway.",
          "peds-seg-4": "Correct: Lack of Hib vaccination is the prime epidemiologic risk factor for invasive epiglottic infection.",
          "peds-seg-5": "Incorrect: Mild rhinorrhea is non-specific and common to benign viral upper respiratory infections.",
          "peds-seg-6": "Incorrect: Weight is within standard percentiles and not an abnormal cue.",
        },
      },
    },
    {
      id: "q-peds-2",
      stepNumber: 2,
      stepName: "analyze_cues",
      title: "Step 2: Analyze Cues",
      type: "matrix",
      prompt:
        "For each finding, specify whether it is characteristic of Acute Epiglottitis, Viral Croup (Laryngotracheobronchitis), or Foreign Body Airway Obstruction.",
      instructionNote: "Select one diagnosis per clinical feature.",
      maxScore: 4,
      scoringMethod: "0/1",
      columns: [
        { id: "col-epiglottitis", label: "Acute Epiglottitis" },
        { id: "col-croup", label: "Viral Croup" },
        { id: "col-fbao", label: "Foreign Body Aspiration" },
      ],
      rows: [
        {
          id: "peds-row-1",
          finding: "Sudden onset choking while playing with small toys, afebrile, unilateral focal wheeze",
          correctColumnId: "col-fbao",
        },
        {
          id: "peds-row-2",
          finding: "Seal-like barking cough, hoarseness, low-grade fever, symptoms worsening at night",
          correctColumnId: "col-croup",
        },
        {
          id: "peds-row-3",
          finding: "High fever (>103°F), toxic appearance, drooling, open-mouth posturing, absent cough",
          correctColumnId: "col-epiglottitis",
        },
        {
          id: "peds-row-4",
          finding: "Steeple sign (subglottic tracheal narrowing) visible on frontal soft-tissue neck radiograph",
          correctColumnId: "col-croup",
        },
      ],
      rationale: {
        overview:
          "Differential diagnosis of pediatric stridor is essential: Epiglottitis is supraglottic and bacterial (toxic, drooling, high fever); Croup is subglottic and viral (barking cough, steeple sign); Foreign body is sudden, mechanical, and afebrile.",
        pathophysiology:
          "Subglottic mucosal edema in croup produces the hallmark brassy 'seal bark' cough, whereas supraglottic swelling in epiglottitis prevents vocal cord closure and causes muffled 'hot potato' phonation without cough.",
        clinicalPearl:
          "The 'Thumbprint sign' on lateral neck x-ray indicates epiglottitis; the 'Steeple sign' on AP x-ray indicates croup.",
        optionsFeedback: {
          "peds-row-1": "Sudden unheralded choking in an afebrile toddler suggests foreign body inhalation.",
          "peds-row-2": "Barking cough and nocturnal worsening are the classic hallmarks of parainfluenza croup.",
          "peds-row-3": "Drooling, toxic appearance, and high fever point definitively to acute bacterial epiglottitis.",
          "peds-row-4": "Steeple sign indicates symmetric subglottic tapering in viral croup.",
        },
      },
    },
    {
      id: "q-peds-3",
      stepNumber: 3,
      stepName: "prioritize_hypotheses",
      title: "Step 3: Prioritize Hypotheses",
      type: "drag_priority",
      prompt: "Prioritize the immediate clinical concerns for this 3-year-old patient from highest to lowest threat to survival.",
      instructionNote: "Rank 1 is the immediate highest risk.",
      maxScore: 4,
      scoringMethod: "0/1",
      items: [
        {
          id: "peds-hypo-1",
          label: "Impending Complete Upper Airway Occlusion & Asphyxiation",
          details: "Secondary to supraglottic cellulitis and potential reactive laryngospasm",
          correctRank: 1,
        },
        {
          id: "peds-hypo-2",
          label: "Severe Systemic Bacterial Bacteremia / Sepsis",
          details: "Marked leukocytosis (26.8k) and high fever (103.8°F)",
          correctRank: 2,
        },
        {
          id: "peds-hypo-3",
          label: "Dehydration & Intravascular Hypovolemia",
          details: "Secondary to total inability to swallow oral fluids over the past 8 hours",
          correctRank: 3,
        },
        {
          id: "peds-hypo-4",
          label: "Parental Acute Panic & Caregiver Exhaustion",
          details: "Secondary to distress witnessing severe pediatric airway compromise",
          correctRank: 4,
        },
      ],
      rationale: {
        overview:
          "Airway protection is the absolute priority above all other considerations. A compromised pediatric airway can convert to complete fatal obstruction in seconds.",
        pathophysiology:
          "The pediatric larynx is funnel-shaped with the narrowest portion at the cricoid cartilage. Swelling of the epiglottis reduces cross-sectional airway area exponentially according to Poiseuille's Law (resistance = 1/r^4).",
        clinicalPearl:
          "In pediatric airway emergencies: 1 mm of edema reduces the pediatric airway diameter by 50% and increases airway resistance 16-fold.",
        optionsFeedback: {
          "peds-hypo-1": "Rank 1: Complete airway closure leads to anoxic arrest within 3-4 minutes.",
          "peds-hypo-2": "Rank 2: Systemic bacteremia requires parenteral antibiotics once airway is secured.",
          "peds-hypo-3": "Rank 3: Fluid deficits can be corrected after airway management.",
          "peds-hypo-4": "Rank 4: Caregiver reassurance is vital but secondary to physiologic airway preservation.",
        },
      },
    },
    {
      id: "q-peds-4",
      stepNumber: 4,
      stepName: "generate_solutions",
      title: "Step 4: Generate Solutions",
      type: "cloze_dropdown",
      prompt: "Select the correct nursing strategy and clinical rationale to guide immediate management in the emergency room.",
      instructionNote: "Both dropdowns must be correct to receive credit.",
      maxScore: 2,
      scoringMethod: "rationale_dyad",
      prefixText: "The primary nursing action while awaiting the arrival of the surgical airway team is to ",
      dropdown1: {
        id: "drop-peds-action",
        placeholder: "-- Select Nursing Action --",
        options: [
          { id: "opt-lap", label: "keep the child calm in the parent's lap while providing gentle blow-by oxygen" },
          { id: "opt-iv", label: "forcefully restrain the child to place a 20-gauge peripheral IV line" },
          { id: "opt-throat", label: "use a padded tongue blade and penlight to inspect the posterior pharynx" },
          { id: "opt-supine", label: "place the child in a supine position on the exam table for auscultation" },
        ],
        correctOptionId: "opt-lap",
      },
      middleText: " because ",
      dropdown2: {
        id: "drop-peds-reason",
        placeholder: "-- Select Rationale --",
        options: [
          { id: "rat-calm", label: "agitation, crying, and invasive exams can precipitate immediate acute laryngospasm and complete airway closure" },
          { id: "rat-iv", label: "intravenous access is more critical than airway stabilization in septic presentations" },
          { id: "rat-viz", label: "direct visualization of a cherry-red swollen epiglottis is required before calling surgery" },
          { id: "rat-supine", label: "the supine position promotes optimal gravity-dependent drainage of pooling pharyngeal secretions" },
        ],
        correctOptionId: "rat-calm",
      },
      suffixText: " until transferred directly to the operating suite.",
      rationale: {
        overview:
          "Preserving the child's emotional comfort and avoiding any unnecessary agitation is paramount. The patient must be allowed to remain in the position of comfort in the parent's lap.",
        pathophysiology:
          "Crying creates increased negative intrathoracic and subglottic pressure during inspiration, which pulls the edematous epiglottis down into the laryngeal inlet, triggering total mechanical obstruction.",
        clinicalPearl:
          "Zero invasive procedures in the ED! No IV starts, no blood draws, no tongue depressors, no throat swabs until the airway is secured in the operating room.",
        optionsFeedback: {
          "opt-lap": "Correct: Keeping the child calm prevents crying and reduces dynamic airway collapse.",
          "opt-iv": "Incorrect: Restraining the child triggers intense crying and catastrophic airway arrest.",
          "opt-throat": "Incorrect: Touching the epiglottis causes reflex laryngospasm.",
          "opt-supine": "Incorrect: Forcing supine positioning closes the airway.",
        },
      },
    },
    {
      id: "q-peds-5",
      stepNumber: 5,
      stepName: "take_action",
      title: "Step 5: Take Action",
      type: "multiple_response",
      prompt:
        "Which of the following actions are indicated or contraindicated in the immediate nursing care plan for this patient? Select all indicated actions.",
      instructionNote: "NCSBN +/- scoring rule applies.",
      maxScore: 4,
      scoringMethod: "+/-",
      options: [
        {
          id: "act-peds-1",
          label: "Accompany the child and parent continuously to the Operating Room with bag-valve-mask and emergency airway cart ready at bedside",
          isCorrect: true,
          rationaleSnippet: "Mandatory emergency preparedness for sudden airway loss during transport.",
        },
        {
          id: "act-peds-2",
          label: "Prepare equipment for endotracheal tube placement that is one size smaller than predicted for age (to accommodate subglottic edema)",
          isCorrect: true,
          rationaleSnippet: "Edema narrows the glottic aperture; undersized tubes prevent tracheal mucosal necrosis.",
        },
        {
          id: "act-peds-3",
          label: "Transport the unmonitored child to the Radiology suite alone for urgent lateral neck soft-tissue radiography",
          isCorrect: false,
          rationaleSnippet: "Fatal error: a child with unstable airway must never be sent to radiology unescorted or unmonitored.",
        },
        {
          id: "act-peds-4",
          label: "Administer high-dose oral liquid ibuprofen with a syringe to reduce high fever and throat inflammation",
          isCorrect: false,
          rationaleSnippet: "Contraindicated: oral fluids/medications in a patient with severe dysphagia can cause fatal aspiration.",
        },
        {
          id: "act-peds-5",
          label: "Ensure emergency surgical tracheostomy / needle cricothyrotomy kit is present at bedside in case intubation fails",
          isCorrect: true,
          rationaleSnippet: "Required fail-safe for 'cannot intubate, cannot oxygenate' scenario.",
        },
      ],
      rationale: {
        overview:
          "Definitive management of epiglottitis takes place in the operating room under controlled general anesthesia. Airway equipment must include tubes 0.5 to 1.0 mm smaller than normal, continuous clinical escort, and tracheostomy backup.",
        pathophysiology:
          "Swelling of the supraglottic structures diminishes the anatomical diameter; forcing a standard-sized tube can avulse tissues, exacerbate edema, or fail completely.",
        clinicalPearl:
          "In epiglottitis, intubation equipment must include: laryngoscopes with Miller/Macintosh blades, stylets, suction, ETTs of expected size plus one and two sizes smaller, and immediate surgical airway kits.",
        optionsFeedback: {
          "act-peds-1": "Correct: Never leave the patient unmonitored during transit.",
          "act-peds-2": "Correct: Always select smaller ETT sizes for acute airway edema.",
          "act-peds-3": "Incorrect: Never send an unstable child to radiology.",
          "act-peds-4": "Incorrect: Absolute NPO status; oral medication triggers aspiration or laryngospasm.",
          "act-peds-5": "Correct: Surgical cricothyrotomy/tracheostomy is the ultimate rescue pathway.",
        },
      },
    },
    {
      id: "q-peds-6",
      stepNumber: 6,
      stepName: "evaluate_outcomes",
      title: "Step 6: Evaluate Outcomes",
      type: "evaluate_matrix",
      prompt:
        "The child was successfully intubated in the OR and transferred to the Pediatric ICU on IV ceftriaxone and vancomycin. On post-intubation Day 2, the nurse evaluates the patient prior to planned extubation. Categorize each finding as demonstrating Readiness for Extubation, Not Ready for Extubation, or Complication.",
      instructionNote: "Select the appropriate evaluation for each clinical finding.",
      maxScore: 3,
      scoringMethod: "0/1",
      columns: [
        { id: "col-ready", label: "Ready for Extubation" },
        { id: "col-not-ready", label: "Not Ready for Extubation" },
        { id: "col-comp", label: "New Complication" },
      ],
      rows: [
        {
          id: "peds-eval-1",
          finding: "Audible air leak around the endotracheal tube with cuff deflated at peak inspiratory pressure < 20 cm H2O (Cuff Leak Test Positive)",
          correctColumnId: "col-ready",
        },
        {
          id: "peds-eval-2",
          finding: "Copious yellow endotracheal tube secretions, new right middle lobe consolidation on chest radiograph, and fever 102.2°F",
          correctColumnId: "col-comp",
        },
        {
          id: "peds-eval-3",
          finding: "No audible air leak when cuff deflated at 30 cm H2O with significant supraglottic swelling still visualized on direct fiberoptic exam",
          correctColumnId: "col-not-ready",
        },
      ],
      rationale: {
        overview:
          "Extubation after epiglottitis requires verification that supraglottic inflammation has resolved. The cuff leak test ensures that air passes around the tube, proving adequate laryngeal lumen clearance.",
        pathophysiology:
          "A positive cuff leak confirms that mucosal edema has subsided sufficiently to prevent post-extubation stridor and re-intubation.",
        clinicalPearl:
          "Never extubate a patient recovering from epiglottitis without a documented positive cuff leak and direct visualization of resolving epiglottic swelling.",
        optionsFeedback: {
          "peds-eval-1": "Audible air leak demonstrates resolved airway swelling and safe conditions for extubation.",
          "peds-eval-2": "Consolidation, purulent secretions, and fever signal ventilator-associated pneumonia (VAP).",
          "peds-eval-3": "Absence of cuff leak warns of persistent critical airway narrowing; extubation would fail.",
        },
      },
    },
  ],
};
