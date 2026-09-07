"use client";

import React from "react";
import { ExamGradeResult } from "@/lib/engine/scoring-engine";
import { CJMMStep } from "@/lib/mock-cases";
import { Clock, Target } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface CJMMScorecardProps {
  gradeResult: ExamGradeResult;
  caseTitle: string;
}

const STEP_TITLES: Record<CJMMStep, string> = {
  recognize_cues: "1. Recognize Cues",
  analyze_cues: "2. Analyze Cues",
  prioritize_hypotheses: "3. Prioritize Hypotheses",
  generate_solutions: "4. Generate Solutions",
  take_action: "5. Take Action",
  evaluate_outcomes: "6. Evaluate Outcomes",
};

export function CJMMScorecard({ gradeResult, caseTitle }: CJMMScorecardProps) {
  const {
    overallPercentage,
    totalEarnedPoints,
    totalPossiblePoints,
    isPassing,
    cjmmStepScores,
    timeSpentSeconds,
  } = gradeResult;

  const minutes = timeSpentSeconds ? Math.floor(timeSpentSeconds / 60) : null;
  const seconds = timeSpentSeconds ? timeSpentSeconds % 60 : null;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-6 font-sans">
      {/* Top Banner: Overall Score & Pass/Fail status */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-5 border-b border-slate-200">
        <div className="text-center sm:text-left space-y-1">
          <Badge
            variant={isPassing ? "success" : "destructive"}
            className="text-xs px-3 py-1 uppercase tracking-wider font-bold"
          >
            {isPassing ? "SIMULATION PASSED" : "NEEDS REMEDIATION"}
          </Badge>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            Clinical Judgment Scorecard
          </h2>
          <p className="text-xs text-slate-500">{caseTitle}</p>
        </div>

        <div className="flex items-center space-x-6 text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-slate-900">
              {overallPercentage}%
            </div>
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              {totalEarnedPoints} / {totalPossiblePoints} Points
            </div>
          </div>

          {timeSpentSeconds && (
            <div className="border-l border-slate-200 pl-6 text-left">
              <div className="flex items-center text-slate-700 font-mono font-bold text-lg">
                <Clock className="h-4 w-4 mr-1.5 text-blue-600" />
                {minutes}m {seconds}s
              </div>
              <div className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">
                Exam Duration
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 6 Cognitive Steps Performance Grid */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
          <Target className="h-4 w-4 text-blue-700" />
          NCSBN Clinical Judgment Measurement Model (CJMM) Cognitive Steps
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {(Object.keys(cjmmStepScores) as CJMMStep[]).map((step) => {
            const stepData = cjmmStepScores[step];
            const isStepPass = stepData.percentage >= 75;

            return (
              <div
                key={step}
                className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/70 space-y-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-900">
                    {STEP_TITLES[step]}
                  </span>
                  <span
                    className={`font-mono font-bold ${
                      isStepPass ? "text-emerald-700" : "text-rose-700"
                    }`}
                  >
                    {stepData.earned}/{stepData.possible} ({stepData.percentage}%)
                  </span>
                </div>

                <Progress
                  value={stepData.percentage}
                  indicatorClassName={
                    isStepPass ? "bg-emerald-600" : "bg-rose-600"
                  }
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
