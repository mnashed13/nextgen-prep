"use client";

import React from "react";
import { CaseQuestion } from "@/lib/mock-cases";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Lightbulb, Stethoscope, BookOpen, HelpCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ReviewRationaleModalProps {
  question: CaseQuestion | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ReviewRationaleModal({
  question,
  isOpen,
  onClose,
}: ReviewRationaleModalProps) {
  if (!question) return null;

  const { rationale, scoringMethod, maxScore } = question;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto font-sans p-6">
        <DialogHeader className="border-b border-slate-200 pb-3">
          <div className="flex items-center space-x-2">
            <Badge variant="cbt" className="bg-blue-900 text-blue-100">
              STEP {question.stepNumber}
            </Badge>
            <Badge variant="outline" className="text-xs">
              Scoring Rule: {scoringMethod} ({maxScore} pts)
            </Badge>
          </div>
          <DialogTitle className="text-base sm:text-lg font-bold text-slate-950 mt-1">
            {question.title}: Comprehensive Clinical Rationale
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 text-slate-800 text-xs sm:text-sm leading-relaxed">
          {/* Clinical Overview */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center space-x-2 font-bold text-slate-900 text-xs uppercase tracking-wider">
              <BookOpen className="h-4 w-4 text-blue-700" />
              <span>Core Clinical Overview</span>
            </div>
            <p className="text-slate-700">{rationale.overview}</p>
          </div>

          {/* Pathophysiology */}
          <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 space-y-2">
            <div className="flex items-center space-x-2 font-bold text-blue-950 text-xs uppercase tracking-wider">
              <Stethoscope className="h-4 w-4 text-blue-700" />
              <span>Pathophysiologic Mechanisms</span>
            </div>
            <p className="text-blue-950">{rationale.pathophysiology}</p>
          </div>

          {/* Clinical Decision Pearl */}
          <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 space-y-2">
            <div className="flex items-center space-x-2 font-bold text-amber-950 text-xs uppercase tracking-wider">
              <Lightbulb className="h-4 w-4 text-amber-600" />
              <span>High-Yield Clinical Decision Pearl</span>
            </div>
            <p className="text-amber-950 font-medium">{rationale.clinicalPearl}</p>
          </div>

          {/* Distractor & Option Analysis */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle className="h-4 w-4 text-slate-600" />
              Item-by-Item Rationale & Distractor Analysis
            </h4>

            <div className="space-y-2">
              {Object.entries(rationale.optionsFeedback).map(([key, explanation]) => (
                <div
                  key={key}
                  className="p-3 rounded-lg bg-white border border-slate-200 shadow-xs"
                >
                  <p className="text-slate-700 text-xs leading-relaxed">
                    {explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
