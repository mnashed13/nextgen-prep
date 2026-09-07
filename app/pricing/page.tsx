"use client";

import React from "react";
import Link from "next/link";
import { PricingTable } from "@/components/checkout/pricing-table";
import { ArrowLeft, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Header */}
      <header className="bg-slate-900 text-white border-b border-slate-800 px-6 py-3.5 flex items-center justify-between shadow-md">
        <Link
          href="/"
          className="flex items-center space-x-2 text-white hover:text-blue-300 transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold shadow-sm">
            <Stethoscope className="h-5 w-5 text-white" />
          </div>
          <div>
            <span className="font-extrabold tracking-tight text-base sm:text-lg">
              NextGen Clinical Simulator
            </span>
            <span className="text-[10px] text-blue-300 block font-mono">
              NCLEX-RN & USMLE Step 2 CK Preparation
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

      {/* Main Content */}
      <main className="flex-1">
        <PricingTable />

        {/* FAQs */}
        <div className="max-w-4xl mx-auto px-4 py-12 border-t border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 text-center mb-8">
            Frequently Asked Questions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs space-y-1.5">
              <h3 className="font-bold text-slate-900">
                Are there any recurring monthly charges?
              </h3>
              <p className="text-slate-600">
                Never. Our access passes are strictly non-renewing one-time fees. You will never be billed automatically after 90 or 180 days.
              </p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs space-y-1.5">
              <h3 className="font-bold text-slate-900">
                How accurately does this replicate the real testing screen?
              </h3>
              <p className="text-slate-600">
                We replicate the exact split-screen EHR layout, font sizing, high-contrast tables, calculator, and countdown timer used at Pearson VUE and Prometric test centers.
              </p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs space-y-1.5">
              <h3 className="font-bold text-slate-900">
                What is the FSRS spaced repetition engine?
              </h3>
              <p className="text-slate-600">
                Free Spaced Repetition Scheduler (FSRS) mathematically tracks your clinical judgment stability and predicts when you are at risk of forgetting key rationales, scheduling review intervals automatically.
              </p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs space-y-1.5">
              <h3 className="font-bold text-slate-900">
                Can I use an institutional coupon code?
              </h3>
              <p className="text-slate-600">
                Yes! If your nursing school or hospital provided a voucher, enter it during checkout. You can also use code <strong className="font-mono text-blue-700">NEXTGEN100</strong> for full test unlock.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-6 border-t border-slate-800 text-center">
        <p>
          NextGen Clinical Simulator • Not affiliated with NCSBN or USMLE. Built for educational simulation.
        </p>
      </footer>
    </div>
  );
}
