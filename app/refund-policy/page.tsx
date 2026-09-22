import React from "react";
import Link from "next/link";
import { ArrowLeft, Stethoscope, RefreshCw, Scale, ShieldCheck, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { env } from "@/lib/config/env";

export const metadata = {
  title: "Refund Policy | NextGen Clinical Simulator (Australian Consumer Law)",
  description:
    "Australian Consumer Law statutory consumer guarantees, non-renewing pass refund terms, and cancellation policies.",
};

export default function RefundPolicyPage() {
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
              Australian Consumer Law Guarantee
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
                ACL Consumer Guarantees Attached
              </Badge>
              <Badge variant="secondary" className="text-[11px]">
                Transparent 14-Day Examination Guarantee
              </Badge>
            </div>
            <h1 className="text-3xl font-black text-slate-950 tracking-tight">
              Refund &amp; Cancellation Policy
            </h1>
            <p className="text-xs text-slate-500">
              Last updated: {lastUpdated} • Entity: {env.AU_ENTITY.COMPANY_NAME} (ABN {env.AU_ENTITY.ABN})
            </p>
          </div>

          {/* Mandatory Statutory ACL Guarantee Box */}
          <div className="p-4 sm:p-5 rounded-xl bg-blue-50/80 border-2 border-blue-400 text-slate-900 space-y-2">
            <div className="flex items-center space-x-2 font-bold text-blue-950 text-sm">
              <Scale className="h-5 w-5 text-blue-700 shrink-0" />
              <span>Australian Consumer Law (ACL) Guarantees</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Under the Australian Consumer Law, when you purchase a service from {env.AU_ENTITY.COMPANY_NAME}, you are guaranteed that the service will be provided with acceptable care, skill, or technical competence, be fit for purpose, and delivered within a reasonable time. These consumer rights apply automatically and cannot be modified, restricted, or excluded by any contract or marketing disclaimer.
            </p>
          </div>

          {/* Major vs Minor Failure Breakdown */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <RefreshCw className="h-4 w-4 text-blue-600" />
              <span>1. Major Failures vs. Minor Technical Failures</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <h3 className="font-bold text-slate-900">Major Service Failure</h3>
                <p className="text-slate-600 leading-relaxed">
                  A major failure occurs if the simulator exhibits continuous catastrophic server outages preventing case completion for more than 48 hours, or fundamentally departs from the promised CBT examination simulation.
                </p>
                <div className="font-semibold text-emerald-800">
                  Entitlement: Full refund of the unused pass fee, or replacement service.
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <h3 className="font-bold text-slate-900">Minor Service Failure</h3>
                <p className="text-slate-600 leading-relaxed">
                  A minor failure includes transient interface glitches, temporary styling bugs, or single question rubric adjustments that can be resolved quickly by our engineering team.
                </p>
                <div className="font-semibold text-blue-800">
                  Entitlement: Prompt technical rectification within a reasonable turnaround timeframe.
                </div>
              </div>
            </div>
          </section>

          {/* 14-Day Examination Satisfaction Guarantee */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>2. 14-Day Candidate Satisfaction Guarantee</span>
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              In addition to your statutory rights under the Australian Consumer Law, we offer a <strong>14-Day Candidate Satisfaction Guarantee</strong>. If you purchase a 90-Day Cram Pass ($79 AUD) or 180-Day Comprehensive Clinical Pass ($149 AUD) and find that our split-screen EHR simulation does not meet your preparation expectations, you may request a 100% refund within 14 calendar days of your original purchase date, provided you have attempted no more than three (3) full case simulations.
            </p>
          </section>

          {/* Non-Renewing Access Pass Nature */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">3. Non-Renewing Passes (No Auto-Cancellation Required)</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Because our passes are strictly non-renewing fixed-duration licenses (90 days or 180 days), there is no recurring monthly subscription to cancel. When your access period concludes, your account automatically transitions to inactive status without any recurring debits, renewal charges, or administrative cancellation fees.
            </p>
          </section>

          {/* How to Claim a Refund */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <Mail className="h-4 w-4 text-indigo-600" />
              <span>4. How to Request a Refund</span>
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              To request a refund under the Australian Consumer Law or our 14-Day Satisfaction Guarantee, simply email our support team with:
            </p>
            <ul className="text-xs text-slate-700 list-disc pl-5 space-y-1">
              <li>Your order number (e.g. <code>ORD-XXXXXX</code>) or transaction identifier;</li>
              <li>The email address used during purchase;</li>
              <li>A brief description of the issue or feedback on why you are requesting a refund.</li>
            </ul>
            <p className="text-xs text-slate-600 leading-relaxed pt-1">
              Approved refunds are credited back to your original payment method (card / bank account) within 5 to 7 Australian business days.
            </p>
          </section>

          {/* Contact Details */}
          <section className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
            <div className="font-bold text-slate-900">Billing &amp; Support Contact:</div>
            <div className="text-slate-600">{env.AU_ENTITY.COMPANY_NAME}</div>
            <div className="text-slate-600">Email: {env.AU_ENTITY.SUPPORT_EMAIL}</div>
            <div className="text-slate-600">Registered Office: {env.AU_ENTITY.REGISTERED_OFFICE}</div>
          </section>
        </div>
      </main>
    </div>
  );
}
