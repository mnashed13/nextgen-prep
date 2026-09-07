# NextGen Clinical Exam Simulator (CBT)

A high-fidelity clinical exam simulation platform tailored for **NextGen NCLEX (NGN)** and **USMLE Step 2 CK** candidates.

![NextGen CBT Simulator](https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/www/public/og.jpg)

## 🩺 Architectural Highlights
- **Framework**: Next.js 15 (App Router), TypeScript 5.9 (Strict Mode), React 19.
- **Styling**: Tailwind CSS, Radix UI primitives, Lucide React icons, Canvas Confetti.
- **CBT High Fidelity**: Split-screen Electronic Health Record (EHR) exhibit with tabbed navigation, realistic vital trends, laboratory reference intervals, and exam timer with scientific calculator.
- **Cognitive Engine**: Step-by-step questions mapping directly to the NCSBN 6 Cognitive Steps:
  1. **Recognize Cues** (Highlightable clinical findings with +/- scoring)
  2. **Analyze Cues** (Matrix multiple-response comparing pathologies)
  3. **Prioritize Hypotheses** (Drag-and-drop immediate priority sequencing)
  4. **Generate Solutions** (Dropdown cloze sentence with paired rationale dyad scoring)
  5. **Take Action** (Multiple-response intervention selection with +/- rule)
  6. **Evaluate Outcomes** (Matrix assessing improvement, stability, or deterioration)
- **Spaced Repetition Mastery**: Local-first FSRS (Free Spaced Repetition Scheduler) memory retention engine running in the browser via `localStorage`, computing real-time candidate passing probability and domain strengths/weaknesses.
- **Non-Renewing Access Passes**: $79 Semester Cram Pass (90 days) and $149 Full Clinical Access Pass (180 days) with simulated Stripe-like checkout and coupon code support (`NEXTGEN100`).

---

## 📁 Directory Structure
```
nextgen-prep/
├── .env.example
├── README.md
├── vercel.json
├── package.json
├── tsconfig.json
├── components/
│   ├── ui/ (button, tabs, card, progress, badge, dialog, radio-group, checkbox)
│   ├── layout/ (cbt-header, exam-toolbar, test-nav-footer, calculator-modal, notes-modal)
│   ├── ehr/ (ehr-tabs.tsx, nurses-notes.tsx, vitals-trend-chart.tsx, lab-results-table.tsx, provider-orders.tsx)
│   ├── question-types/ (matrix-question.tsx, cloze-dropdown.tsx, drag-priority.tsx, clinical-highlight.tsx, multiple-response.tsx)
│   ├── analytics/ (cjmm-scorecard.tsx, weakness-radar.tsx, review-rationale-modal.tsx)
│   └── checkout/ (semester-pass-modal.tsx, pricing-table.tsx)
├── lib/
│   ├── mock-cases/ (sample-sepsis-case.ts, sample-pediatric-case.ts, sample-cardiac-case.ts, registry.ts)
│   ├── engine/ (scoring-engine.ts, fsrs-scheduler.ts)
│   └── utils.ts
└── app/
    ├── layout.tsx
    ├── page.tsx (Student Dashboard & Case Library)
    ├── exam/[caseId]/page.tsx (Full-Screen CBT Testing Simulation)
    ├── review/[caseId]/page.tsx (In-Depth Clinical Rationales & Explanations)
    └── pricing/page.tsx (Semester Pass $79 vs Full Access Pass $149)
```

---

## 🚀 Running Locally

```bash
# Clone the repository
git clone https://github.com/mnashed13/nextgen-prep.git
cd nextgen-prep

# Install dependencies with pnpm
pnpm install

# Run local development server
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Build & Test Verification

```bash
# Type check and build production bundle
pnpm run build
```

---

## 🔒 Security & Privacy
- Zero external tracking of medical student data.
- All exam attempts, notes, and spaced repetition curves are persisted **local-first** in candidate browser storage.
- Non-renewing exam pass simulation prevents recurring subscription traps.
