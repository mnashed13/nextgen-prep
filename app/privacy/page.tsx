import React from "react";
import Link from "next/link";
import { ArrowLeft, Stethoscope, ShieldCheck, Lock, Eye, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { env } from "@/lib/config/env";

export const metadata = {
  title: "Privacy Policy | NextGen Clinical Simulator (Privacy Act 1988 Cth)",
  description:
    "Compliant with the Australian Privacy Principles (APPs), local-first storage architecture, and OAIC standards.",
};

export default function PrivacyPage() {
  const lastUpdated = "23 September 2026";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Header */}
      <header className="bg-slate-900 text-white border-b border-slate-800 px-6 py-4 flex items-center justify-between shadow-md">
        <Link
          href="/"
          className="flex items-center space-x-2 text-white hover:text-blue-300 transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold">
            <Stethoscope className="h-5 w-5 text-white" />
          </div>
          <div>
            <span className="font-extrabold tracking-tight text-base sm:text-lg">
              NextGen Clinical Simulator
            </span>
            <span className="text-[10px] text-blue-300 block font-mono">
              Privacy Act 1988 (Cth) &amp; APP Statement
            </span>
          </div>
        </Link>

        <Link href="/">
          <Button
            variant="outline"
            size="sm"
            className="h-8 bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700 text-xs gap-1.5"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Dashboard
          </Button>
        </Link>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-10 sm:py-12">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8">
          {/* Header Title */}
          <div className="border-b border-slate-200 pb-6 space-y-2">
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="border-emerald-300 bg-emerald-50 text-emerald-800 text-[11px] font-semibold">
                Privacy Act 1988 (Cth) Compliant
              </Badge>
              <Badge variant="secondary" className="text-[11px]">
                13 Australian Privacy Principles (APPs)
              </Badge>
            </div>
            <h1 className="text-3xl font-black text-slate-950 tracking-tight">
              Australian Privacy Policy
            </h1>
            <p className="text-xs text-slate-500">
              Last updated: {lastUpdated} • Data Controller: {env.AU_ENTITY.COMPANY_NAME} (ABN {env.AU_ENTITY.ABN})
            </p>
          </div>

          {/* Privacy Architecture Highlight */}
          <div className="p-4 sm:p-5 rounded-xl bg-emerald-50/80 border border-emerald-300 text-slate-900 space-y-2">
            <div className="flex items-center space-x-2 font-bold text-emerald-950 text-sm">
              <ShieldCheck className="h-5 w-5 text-emerald-700 shrink-0" />
              <span>Local-First Architecture &amp; Minimalist Data Collection</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              We operate under a strict <strong>privacy-by-design, local-first</strong> architectural model. Your simulated exam answers, electronic scratchpad notes, time logs, and Free Spaced Repetition Scheduler (FSRS) memory stability curves are computed and stored directly on your client browser device using <code>localStorage</code>. They are not transmitted to or harvested on centralized profiling databases.
            </p>
          </div>

          {/* 1. Open and Transparent Management of Personal Information (APP 1) */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <Eye className="h-4 w-4 text-blue-600" />
              <span>1. Australian Privacy Principles Framework (APP 1)</span>
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              {env.AU_ENTITY.COMPANY_NAME} is dedicated to safeguarding your personal information in accordance with the <em>Privacy Act 1988</em> (Cth), the <em>Privacy Amendment (Notifiable Data Breaches) Act 2017</em> (Cth), and the 13 Australian Privacy Principles (APPs). This policy outlines our standards for collecting, holding, using, and disclosing candidate information.
            </p>
          </section>

          {/* 2. Kinds of Information Collected (APP 3) */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">2. Kinds of Information We Collect (APP 3)</h2>
            <div className="text-xs text-slate-600 leading-relaxed space-y-2">
              <p>Depending on how you interact with the simulator, we may collect:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Candidate Identifiers:</strong> Name, contact email address, institution/school name when registering for passes or technical assistance.</li>
                <li><strong>Payment Transaction Records:</strong> Order numbers, pass tier (90-day vs 180-day), currency (AUD), and timestamp. <em>Note:</em> Credit card and payment instrument numbers are processed through secure simulated tokenization and are never stored on our application servers.</li>
                <li><strong>Technical Telemetry:</strong> Anonymized browser type, screen viewport dimensions, and session crash logs used strictly to diagnose technical faults.</li>
              </ul>
              <p>
                <strong>Government Identifiers (APP 9):</strong> We never collect, adopt, or use Commonwealth identifiers such as Tax File Numbers (TFN), Medicare numbers, or Australian Individual Healthcare Identifiers (IHI).
              </p>
            </div>
          </section>

          {/* 3. Purpose of Collection (APP 6) */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">3. How &amp; Why We Collect Personal Information (APP 6)</h2>
            <div className="text-xs text-slate-600 leading-relaxed space-y-2">
              <p>We collect and handle personal information solely for the following legitimate business functions:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Provisioning your non-renewing access license to clinical simulation cases;</li>
                <li>Calculating cognitive readiness percentiles and domain weakness reports;</li>
                <li>Providing technical, billing, and candidate support;</li>
                <li>Fulfilling legal and regulatory reporting duties under Australian taxation and corporations legislation.</li>
              </ul>
            </div>
          </section>

          {/* 4. Direct Marketing & Spam Act 2003 (APP 7) */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">4. Direct Marketing &amp; Spam Act 2003 Compliance (APP 7)</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              We strictly comply with the <em>Spam Act 2003</em> (Cth). We will never send unsolicited commercial electronic communications without your prior express or inferred consent. Every marketing newsletter or product announcement contains an easily accessible, functional one-click unsubscribe mechanism. We do not sell, rent, or trade candidate email addresses to third-party advertisers or recruitment agencies.
            </p>
          </section>

          {/* 5. Cross-Border Data Disclosure (APP 8) */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">5. Cross-Border Disclosure (APP 8)</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              While our operational entity is based in Australia, our cloud infrastructure and hosting environments are powered by globally distributed enterprise providers (such as Vercel and AWS) with data centers in Australia, the United States, and the European Union. Prior to disclosing any personal information to overseas cloud recipients, we take reasonable steps pursuant to APP 8.1 to verify that recipient entities uphold data protection standards comparable to the Australian Privacy Principles.
            </p>
          </section>

          {/* 6. Security of Personal Information & NDB Scheme (APP 11) */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <Lock className="h-4 w-4 text-indigo-600" />
              <span>6. Data Security &amp; Notifiable Data Breaches (APP 11)</span>
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              We employ industry-standard 256-bit Transport Layer Security (TLS/SSL) encryption in transit, strict Content Security Policies, and restricted access controls. In the event of an eligible data breach that is likely to result in serious harm to any individual, we maintain a formalized Incident Response Protocol to notify affected candidates and the Office of the Australian Information Commissioner (OAIC) pursuant to the <em>Notifiable Data Breaches (NDB) Scheme</em>.
            </p>
          </section>

          {/* 7. Access and Correction Rights (APP 12 & 13) */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">7. Candidate Access &amp; Correction Rights (APP 12 &amp; 13)</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              You are entitled to request access to the personal information we hold about you and to seek corrections if you consider it inaccurate, out-of-date, incomplete, or misleading. To lodge an access or correction request, please email our designated Privacy Officer at{" "}
              <a href={`mailto:${env.AU_ENTITY.PRIVACY_EMAIL}`} className="text-blue-700 underline font-medium">
                {env.AU_ENTITY.PRIVACY_EMAIL}
              </a>
              . We will process and respond to your request within thirty (30) days without charge.
            </p>
          </section>

          {/* 8. Complaints & OAIC Escalation */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <Mail className="h-4 w-4 text-emerald-600" />
              <span>8. Privacy Complaints &amp; OAIC Escalation</span>
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              If you have any questions, concerns, or complaints regarding how we handle your personal data, please contact our Privacy Officer in the first instance. If you remain dissatisfied with our written resolution after thirty (30) days, you have the statutory right to lodge a formal complaint with the <strong>Office of the Australian Information Commissioner (OAIC)</strong>:
            </p>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs font-mono text-slate-700 space-y-1">
              <div>Website: <a href="https://www.oaic.gov.au" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">www.oaic.gov.au</a></div>
              <div>Telephone: 1300 363 992</div>
              <div>Postal Address: GPO Box 5218, Sydney NSW 2001, Australia</div>
            </div>
          </section>

          {/* Entity Details */}
          <section className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
            <div className="font-bold text-slate-900">Privacy Officer &amp; Contact:</div>
            <div className="text-slate-600">{env.AU_ENTITY.COMPANY_NAME}</div>
            <div className="text-slate-600">Email: {env.AU_ENTITY.PRIVACY_EMAIL}</div>
            <div className="text-slate-600">Registered Office: {env.AU_ENTITY.REGISTERED_OFFICE}</div>
          </section>
        </div>
      </main>
    </div>
  );
}
