import React from "react";
import Link from "next/link";
import { ArrowLeft, Stethoscope, Scale, ShieldAlert, FileText, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { env } from "@/lib/config/env";

export const metadata = {
  title: "Terms and Conditions | NextGen Clinical Simulator (Australia)",
  description:
    "Standard terms of service, Australian Consumer Law statutory disclosures, non-renewing pass rules, and clinical educational disclaimers.",
};

export default function TermsPage() {
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
              Australian Regulatory Compliance Edition
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
              <Badge variant="outline" className="border-blue-300 bg-blue-50 text-blue-800 text-[11px] font-semibold">
                Competition & Consumer Act 2010 (Cth) Compliant
              </Badge>
              <Badge variant="secondary" className="text-[11px]">
                Governing Law: New South Wales
              </Badge>
            </div>
            <h1 className="text-3xl font-black text-slate-950 tracking-tight">
              Terms and Conditions of Use
            </h1>
            <p className="text-xs text-slate-500">
              Last updated: {lastUpdated} • Entity: {env.AU_ENTITY.COMPANY_NAME} (ABN {env.AU_ENTITY.ABN})
            </p>
          </div>

          {/* Mandatory Australian Consumer Law Notice */}
          <div className="p-4 sm:p-5 rounded-xl bg-blue-50/80 border-2 border-blue-400 text-slate-900 space-y-2">
            <div className="flex items-center space-x-2 font-bold text-blue-950 text-sm">
              <Scale className="h-5 w-5 text-blue-700 shrink-0" />
              <span>Australian Consumer Law (ACL) Statutory Notice</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Our goods and services come with guarantees that cannot be excluded under the Australian Consumer Law (Schedule 2 of the <em>Competition and Consumer Act 2010</em> (Cth)). For major failures with the service, you are entitled:
            </p>
            <ul className="text-xs text-slate-800 list-disc pl-5 space-y-1">
              <li>to cancel your service contract with us; and</li>
              <li>to a refund for the unused portion, or to compensation for its reduced value.</li>
            </ul>
            <p className="text-xs text-slate-700 leading-relaxed pt-1">
              You are also entitled to be compensated for any other reasonably foreseeable loss or damage. If the failure does not amount to a major failure, you are entitled to have problems with the service rectified in a reasonable time and, if this is not done, to cancel your contract and obtain a refund for the unused portion of the contract.
            </p>
          </div>

          {/* Clinical Educational Disclaimer Notice */}
          <div className="p-4 sm:p-5 rounded-xl bg-amber-50/70 border border-amber-300 text-slate-900 space-y-2">
            <div className="flex items-center space-x-2 font-bold text-amber-950 text-sm">
              <ShieldAlert className="h-5 w-5 text-amber-700 shrink-0" />
              <span>Clinical Simulation & Educational Disclaimer</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              <strong>Not Medical or Healthcare Advice:</strong> NextGen Clinical Simulator is an educational technology preparation tool intended solely for candidate cognitive self-assessment, clinical judgment measurement model training, and exam familiarity. It does not provide medical diagnoses, treatment protocols, or healthcare management advice. All patient exhibits, laboratory panels, diagnostic imaging descriptions, and nurse notes are simulated hypothetical case studies. Under no circumstances should any scenario or content be referenced or relied upon in real clinical decision-making or patient care.
            </p>
            <p className="text-xs text-slate-700 leading-relaxed">
              <strong>Non-Affiliation:</strong> We are not affiliated with, endorsed by, or accredited by the National Council of State Boards of Nursing (NCSBN), the Federation of State Medical Boards (FSMB), the National Board of Medical Examiners (NBME), Pearson VUE, the Australian Health Practitioner Regulation Agency (AHPRA), or the Nursing and Midwifery Board of Australia (NMBA). NCLEX®, NCLEX-RN®, NGN®, and USMLE® are registered trademarks of their respective owners.
            </p>
          </div>

          {/* Section 1: Agreement to Terms */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <FileText className="h-4 w-4 text-blue-600" />
              <span>1. Acceptance of Terms</span>
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              By accessing or using the NextGen Clinical Simulator website, web applications, and services operated by {env.AU_ENTITY.COMPANY_NAME} (&ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), you (&ldquo;User&rdquo; or &ldquo;Candidate&rdquo;) agree to be legally bound by these Terms and Conditions. If you do not agree to these terms, you must discontinue use of the platform immediately.
            </p>
          </section>

          {/* Section 2: Non-Renewing Access Passes & Australian GST */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>2. Non-Renewing Access Passes &amp; Pricing</span>
            </h2>
            <div className="space-y-2 text-xs text-slate-600 leading-relaxed">
              <p>
                <strong>Transparent Pricing:</strong> All fees are clearly stated in Australian Dollars (AUD) and are inclusive of Australian Goods and Services Tax (GST) at the statutory rate of 10% in accordance with <em>A New Tax System (Goods and Services Tax) Act 1999</em> (Cth).
              </p>
              <p>
                <strong>No Auto-Renewal Traps:</strong> Our passes—including the 90-Day Semester Cram Pass ($79 AUD) and the 180-Day Comprehensive Clinical Pass ($149 AUD)—are strictly fixed-term, non-renewing access licenses. You will never be automatically rebilled, subscribed to recurring charges, or penalized upon pass expiry.
              </p>
              <p>
                <strong>License Scope:</strong> Purchase of an access pass grants a non-exclusive, non-transferable, revocable single-candidate license to access simulation cases and the FSRS spaced repetition engine for the duration purchased.
              </p>
            </div>
          </section>

          {/* Section 3: User Accounts & Prohibited Conduct */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">3. Candidate Conduct &amp; Account Integrity</h2>
            <div className="text-xs text-slate-600 leading-relaxed space-y-2">
              <p>
                You agree to use the simulator exclusively for lawful personal examination preparation. You must not:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Share, resell, lease, or distribute your account credentials or pass identifiers to third parties;</li>
                <li>Scrape, extract, copy, or reverse-engineer clinical case vignettes, scoring algorithms, or test rubrics;</li>
                <li>Attempt to bypass access-control mechanisms or simulate payments fraudulently;</li>
                <li>Introduce automated bots, crawlers, or malicious scripts designed to overload platform infrastructure.</li>
              </ul>
            </div>
          </section>

          {/* Section 4: Intellectual Property */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">4. Intellectual Property Rights</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              All proprietary content within the simulator—including but not limited to the Electronic Health Record (EHR) exhibit layouts, clinical judgment rubrics, matrix response structures, laboratory reference tables, and FSRS spaced repetition integration code—is protected by Australian and international copyright, trade secret, and trademark laws. All rights are reserved by {env.AU_ENTITY.COMPANY_NAME}.
            </p>
          </section>

          {/* Section 5: Limitation of Liability */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">5. Limitation of Liability</h2>
            <div className="text-xs text-slate-600 leading-relaxed space-y-2">
              <p>
                To the maximum extent permitted by law, and subject always to your non-excludable rights under the Australian Consumer Law:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>We do not warrant that your use of the simulator will guarantee a passing result on official licensing examinations (e.g., NCLEX-RN, USMLE, or AHPRA/NMBA assessments);</li>
                <li>We are not liable for indirect, consequential, punitive, or incidental damages resulting from service interruptions, device incompatibility, or data loss;</li>
                <li>Pursuant to Section 64A of the Australian Consumer Law, our liability for failure to comply with a consumer guarantee (other than a guarantee under sections 51, 52 or 53) is limited, at our election, to either the supplying of the services again, or the payment of the cost of having the services supplied again.</li>
              </ul>
            </div>
          </section>

          {/* Section 6: Dispute Resolution & Governing Law */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">6. Governing Law &amp; Dispute Resolution</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              These Terms and Conditions are governed by and construed in accordance with the laws of the State of New South Wales, Australia. In the event of any controversy or claim arising under these Terms, the parties agree to first attempt resolution through good-faith informal consultation. If unresolved within thirty (30) business days, disputes shall be submitted to the non-exclusive jurisdiction of the courts of New South Wales and the Federal Court of Australia.
            </p>
          </section>

          {/* Contact Details */}
          <section className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
            <div className="font-bold text-slate-900">Australian Contact &amp; Legal Notices:</div>
            <div className="text-slate-600">{env.AU_ENTITY.COMPANY_NAME}</div>
            <div className="text-slate-600">Registered Office: {env.AU_ENTITY.REGISTERED_OFFICE}</div>
            <div className="text-slate-600">Legal Contact: {env.AU_ENTITY.LEGAL_EMAIL}</div>
            <div className="text-slate-600">ABN: {env.AU_ENTITY.ABN} • ACN: {env.AU_ENTITY.ACN}</div>
          </section>
        </div>
      </main>
    </div>
  );
}
