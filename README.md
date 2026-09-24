# NextGen Clinical Exam Simulator (CBT)

A high-fidelity clinical exam simulation platform tailored for **NextGen NCLEX (NGN)** and **USMLE Step 2 CK** candidates, engineered for production reliability and full compliance with Australian regulatory frameworks.

![NextGen CBT Simulator](https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/www/public/og.jpg)

## 🩺 Architectural Highlights
- **Framework**: Next.js 16 (App Router), TypeScript 5.9 (Strict Mode), React 19.
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
- **Non-Renewing Access Passes**: $79 AUD Semester Cram Pass (90 days) and $149 AUD Full Clinical Access Pass (180 days) inclusive of 10% Australian GST, with simulated checkout and coupon code support (`NEXTGEN100`).

---

## 🇦🇺 Australian Regulatory Compliance
- **Australian Consumer Law (ACL)**: Adheres to Schedule 2 of the *Competition and Consumer Act 2010* (Cth). Formally incorporates statutory non-excludable consumer guarantees, a 14-day candidate satisfaction guarantee, and major vs minor failure remedies.
- **Australian Privacy Principles (APPs)**: Full compliance with the *Privacy Act 1988* (Cth) and its 13 APPs. Employs a **privacy-by-design, local-first** data architecture where candidate performance, test logs, and memory curves remain securely on client devices. Includes formal OAIC dispute escalation procedures.
- **Spam Act 2003 (Cth)**: Zero unsolicited marketing communications, clear consent protocols, and functional unsubscribe channels.
- **A New Tax System (Goods and Services Tax) Act 1999 (Cth)**: Explicit AUD pricing with transparent 10% GST breakdown across pricing and checkout.
- **Clinical & Educational Disclaimers**: Disclaimers complying with Section 18 of the ACL, highlighting that the simulator is for educational training and self-assessment only and is not affiliated with NCSBN, USMLE, Pearson VUE, or AHPRA/NMBA.

---

## 🛡️ Production Readiness & Hardening
- **Security Headers**: Production-grade HTTP security headers configured in `next.config.ts`:
  - `Content-Security-Policy` (CSP)
  - `Strict-Transport-Security` (HSTS: 2-year preload)
  - `X-Frame-Options: DENY` (anti-clickjacking)
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy`
  - Disabled `x-powered-by` header
- **Resilient Error Boundaries**: Segment-level (`app/error.tsx`) and root layout (`app/global-error.tsx`) error boundaries with state preservation and retry mechanisms.
- **Branded 404 Handler**: High-fidelity Pearson VUE / CBT-styled `app/not-found.tsx` with one-click recovery paths.
- **SEO & Crawling**: Programmatic `app/robots.ts` and `app/sitemap.ts` with comprehensive OpenGraph and Twitter card metadata in `app/layout.tsx`.

---

## 📁 Directory Structure
```
nextgen-prep/
├── .env.example
├── README.md
├── vercel.json
├── package.json
├── tsconfig.json
├── next.config.ts (Security headers & production config)
├── components/
│   ├── ui/ (button, tabs, card, progress, badge, dialog, radio-group, checkbox)
│   ├── layout/ (cbt-header, exam-toolbar, test-nav-footer, calculator-modal, notes-modal)
│   ├── ehr/ (ehr-tabs.tsx, nurses-notes.tsx, vitals-trend-chart.tsx, lab-results-table.tsx, provider-orders.tsx)
│   ├── question-types/ (matrix-question.tsx, cloze-dropdown.tsx, drag-priority.tsx, clinical-highlight.tsx, multiple-response.tsx)
│   ├── analytics/ (cjmm-scorecard.tsx, weakness-radar.tsx, review-rationale-modal.tsx)
│   ├── checkout/ (semester-pass-modal.tsx, pricing-table.tsx)
│   └── legal/ (footer.tsx, cookie-consent-banner.tsx)
├── lib/
│   ├── config/ (env.ts)
│   ├── mock-cases/ (sample-sepsis-case.ts, sample-pediatric-case.ts, sample-cardiac-case.ts, registry.ts)
│   ├── engine/ (scoring-engine.ts, fsrs-scheduler.ts)
│   └── utils.ts
└── app/
    ├── layout.tsx (Production metadata & cookie consent)
    ├── error.tsx (Segment error boundary)
    ├── global-error.tsx (Root crash handler)
    ├── not-found.tsx (Custom 404 exhibit)
    ├── robots.ts (SEO robots definition)
    ├── sitemap.ts (Dynamic sitemap)
    ├── page.tsx (Student Dashboard & Case Library)
    ├── terms/page.tsx (Australian Terms & Conditions)
    ├── privacy/page.tsx (Australian Privacy Act 1988 Policy)
    ├── refund-policy/page.tsx (Australian Consumer Law Refund Policy)
    ├── pricing/page.tsx (AUD Pricing & GST Breakdown)
    ├── exam/[caseId]/page.tsx (Full-Screen CBT Testing Simulation)
    └── review/[caseId]/page.tsx (In-Depth Clinical Rationales & Explanations)
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

# Run code linter
pnpm run lint
```
