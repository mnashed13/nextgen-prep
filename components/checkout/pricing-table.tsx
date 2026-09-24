"use client";

import React, { useState } from "react";
import { Check, Zap, Shield, Clock, HelpCircle, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SemesterPassModal } from "./semester-pass-modal";

export function PricingTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPass, setSelectedPass] = useState<"semester_cram" | "full_access">(
    "semester_cram"
  );

  const handleOpenCheckout = (passType: "semester_cram" | "full_access") => {
    setSelectedPass(passType);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-4 font-sans">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
        <Badge variant="outline" className="border-blue-300 bg-blue-50 text-blue-800 text-xs px-3 py-1 font-semibold">
          NON-RENEWING EXAM PASSES
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Pass the NextGen Exam on Your First Attempt
        </h1>
        <p className="text-slate-600 text-sm sm:text-base">
          Zero subscriptions. Zero hidden auto-renewals. Pay once for guaranteed, full-fidelity CBT case simulation until you test.
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
        {/* Tier 1: Semester Cram Pass ($79) */}
        <div className="bg-white rounded-2xl border border-slate-300 p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative">
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                90-Day Cram Pass
              </span>
              <Badge variant="secondary" className="text-xs font-semibold">
                Single Semester
              </Badge>
            </div>

            <div className="flex items-baseline space-x-2 mb-1">
              <span className="text-4xl sm:text-5xl font-extrabold font-mono text-slate-900">
                $79
              </span>
              <span className="text-xs text-slate-500 font-medium">
                AUD / 90-day single access
              </span>
            </div>
            <div className="text-[11px] text-emerald-700 font-semibold mb-4">
              Includes 10% Australian GST • No auto-renewal
            </div>

            <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
              Designed for final semester nursing students and candidates taking the NCLEX or USMLE within the next 3 months.
            </p>

            <ul className="space-y-3 text-xs sm:text-sm text-slate-700 mb-8">
              <li className="flex items-center space-x-2.5">
                <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Full access to all 4-Tab EHR case studies</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Complete 6-step NCSBN Clinical Judgment questions</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Local FSRS spaced repetition retention engine</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Authentic CBT interface & scientific calculator</span>
              </li>
              <li className="flex items-center space-x-2.5 text-slate-400">
                <Lock className="h-3.5 w-3.5 shrink-0" />
                <span>Limited to 90 calendar days</span>
              </li>
            </ul>
          </div>

          <Button
            variant="outline"
            size="lg"
            onClick={() => handleOpenCheckout("semester_cram")}
            className="w-full h-12 text-sm font-bold border-slate-800 text-slate-900 hover:bg-slate-900 hover:text-white transition-colors cursor-pointer"
          >
            Activate 90-Day Cram Pass ($79 AUD)
          </Button>
        </div>

        {/* Tier 2: Full Access Pass ($149) - Highlighted */}
        <div className="bg-slate-900 text-slate-100 rounded-2xl border-2 border-blue-500 p-6 sm:p-8 flex flex-col justify-between shadow-xl relative ring-4 ring-blue-500/10">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[11px] font-bold uppercase tracking-wider py-1 px-3.5 rounded-full shadow-md flex items-center gap-1">
            <Zap className="h-3 w-3 fill-current" />
            Most Popular • Best Value
          </div>

          <div>
            <div className="flex justify-between items-center mb-4 pt-1">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                180-Day Comprehensive Pass
              </span>
              <Badge variant="cbt" className="bg-blue-600 text-white border-none text-xs">
                Guaranteed Pass
              </Badge>
            </div>

            <div className="flex items-baseline space-x-2 mb-1">
              <span className="text-4xl sm:text-5xl font-extrabold font-mono text-white">
                $149
              </span>
              <span className="text-xs text-slate-400 font-medium">
                AUD / 180-day full access
              </span>
            </div>
            <div className="text-[11px] text-emerald-400 font-semibold mb-4">
              Includes 10% Australian GST • No auto-renewal
            </div>

            <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
              Comprehensive clinical simulation library with unlimited retakes, personalized weakness analytics, and 100% money-back pass guarantee.
            </p>

            <ul className="space-y-3 text-xs sm:text-sm text-slate-200 mb-8">
              <li className="flex items-center space-x-2.5">
                <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>All case studies (Sepsis, Pediatric, STEMI & new releases)</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Unlimited simulation attempts and scoring retakes</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Full FSRS memory curve with priority retention schedules</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Deep pathogenic rationales & distractor breakdown modals</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>100% Non-renewing, one-time payment guarantee</span>
              </li>
            </ul>
          </div>

          <Button
            variant="default"
            size="lg"
            onClick={() => handleOpenCheckout("full_access")}
            className="w-full h-12 text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg transition-all cursor-pointer"
          >
            Activate 180-Day Full Pass ($149 AUD)
          </Button>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="mt-12 pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-xs text-slate-600">
        <div className="flex flex-col items-center space-y-1.5">
          <Shield className="h-5 w-5 text-blue-700" />
          <span className="font-bold text-slate-800">100% Non-Renewing Pass</span>
          <span className="text-slate-500">You will never be auto-billed or charged again.</span>
        </div>
        <div className="flex flex-col items-center space-y-1.5">
          <Clock className="h-5 w-5 text-emerald-600" />
          <span className="font-bold text-slate-800">Instant CBT Activation</span>
          <span className="text-slate-500">Start simulating authentic NextGen cases immediately.</span>
        </div>
        <div className="flex flex-col items-center space-y-1.5">
          <HelpCircle className="h-5 w-5 text-indigo-600" />
          <span className="font-bold text-slate-800">Australian Consumer Law</span>
          <span className="text-slate-500">Statutory guarantees &amp; 14-day satisfaction review.</span>
        </div>
      </div>

      {/* Checkout Modal */}
      <SemesterPassModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultPassType={selectedPass}
      />
    </div>
  );
}
