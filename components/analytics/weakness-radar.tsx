"use client";

import React from "react";
import { CandidateReadinessReport } from "@/lib/engine/fsrs-scheduler";
import { CJMMStep } from "@/lib/mock-cases";
import { TrendingUp, AlertCircle, CheckCircle2, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface WeaknessRadarProps {
  report: CandidateReadinessReport;
}

const STEP_LABELS: Record<CJMMStep, string> = {
  recognize_cues: "Recognize Cues",
  analyze_cues: "Analyze Cues",
  prioritize_hypotheses: "Prioritize Hypotheses",
  generate_solutions: "Generate Solutions",
  take_action: "Take Action",
  evaluate_outcomes: "Evaluate Outcomes",
};

export function WeaknessRadar({ report }: WeaknessRadarProps) {
  const steps: CJMMStep[] = [
    "recognize_cues",
    "analyze_cues",
    "prioritize_hypotheses",
    "generate_solutions",
    "take_action",
    "evaluate_outcomes",
  ];

  // Radar points computation (6-axis hexagon)
  const center = 110;
  const radius = 80;
  const numAxes = steps.length;

  const getCoordinates = (index: number, valueRatio: number) => {
    const angle = (Math.PI * 2 * index) / numAxes - Math.PI / 2;
    const r = radius * valueRatio;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  // Generate polygon points
  const candidatePoints = steps
    .map((step, idx) => {
      const score = report.cjmmMastery[step]?.masteryScore || 70;
      const ratio = Math.max(0.2, Math.min(1.0, score / 100));
      const coords = getCoordinates(idx, ratio);
      return `${coords.x},${coords.y}`;
    })
    .join(" ");

  const passingBenchmarkPoints = steps
    .map((_, idx) => {
      const coords = getCoordinates(idx, 0.75); // 75% benchmark
      return `${coords.x},${coords.y}`;
    })
    .join(" ");

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-6 font-sans">
      {/* Header: Readiness Score */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="h-5 w-5 text-blue-700" />
            <h3 className="font-bold text-base text-slate-900">
              Spaced Repetition & Cognitive Mastery Tracker
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Local-First FSRS Stability & Retrievability Analysis
          </p>
        </div>

        {/* Big Passing Probability Badge */}
        <div className="flex items-center space-x-3 bg-blue-50 border border-blue-200 px-4 py-2 rounded-xl">
          <div className="text-right">
            <span className="text-[11px] font-bold text-blue-800 uppercase tracking-wider block">
              Passing Probability
            </span>
            <span className="text-2xl sm:text-3xl font-mono font-extrabold text-blue-900">
              {report.passingProbability}%
            </span>
          </div>
          <Badge
            variant={
              report.passingProbability >= 85
                ? "success"
                : report.passingProbability >= 75
                ? "default"
                : "warning"
            }
            className="text-xs px-2.5 py-1"
          >
            {report.overallMasteryLevel}
          </Badge>
        </div>
      </div>

      {/* Main Grid: Radar Chart + Cognitive Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* SVG Hexagonal Radar */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <svg width="220" height="220" className="overflow-visible">
            {/* Background concentric reference rings */}
            {[0.25, 0.5, 0.75, 1.0].map((level, lIdx) => {
              const pts = steps
                .map((_, idx) => {
                  const { x, y } = getCoordinates(idx, level);
                  return `${x},${y}`;
                })
                .join(" ");
              return (
                <polygon
                  key={lIdx}
                  points={pts}
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="1"
                  strokeDasharray={level === 0.75 ? "3,3" : "none"}
                />
              );
            })}

            {/* Axis Lines */}
            {steps.map((_, idx) => {
              const { x, y } = getCoordinates(idx, 1.0);
              return (
                <line
                  key={idx}
                  x1={center}
                  y1={center}
                  x2={x}
                  y2={y}
                  stroke="#cbd5e1"
                  strokeWidth="1"
                />
              );
            })}

            {/* Passing Benchmark Polygon (75%) */}
            <polygon
              points={passingBenchmarkPoints}
              fill="rgba(16, 185, 129, 0.05)"
              stroke="#10b981"
              strokeWidth="1.5"
              strokeDasharray="4,3"
            />

            {/* Candidate Performance Polygon */}
            <polygon
              points={candidatePoints}
              fill="rgba(37, 99, 235, 0.25)"
              stroke="#2563eb"
              strokeWidth="2.5"
            />

            {/* Axis Vertex Dots */}
            {steps.map((step, idx) => {
              const score = report.cjmmMastery[step]?.masteryScore || 70;
              const ratio = Math.max(0.2, Math.min(1.0, score / 100));
              const { x, y } = getCoordinates(idx, ratio);
              return (
                <circle
                  key={idx}
                  cx={x}
                  cy={y}
                  r="3.5"
                  className="fill-blue-600 stroke-white stroke-2"
                />
              );
            })}
          </svg>

          <div className="flex items-center space-x-4 text-[11px] text-slate-500 mt-2">
            <span className="flex items-center">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 mr-1.5 inline-block"></span>
              Candidate Mastery
            </span>
            <span className="flex items-center">
              <span className="w-2.5 h-2.5 rounded-full border border-emerald-500 mr-1.5 inline-block border-dashed"></span>
              75% Passing Standard
            </span>
          </div>
        </div>

        {/* Cognitive Skill Strengths & Targets */}
        <div className="lg:col-span-7 space-y-2.5">
          <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Clinical Judgment Domain Diagnostics
          </div>

          <div className="space-y-2">
            {steps.map((step) => {
              const item = report.cjmmMastery[step] || {
                masteryScore: 70,
                status: "Target Area",
              };
              const isStrength = item.status === "Strength";
              const isCritical = item.status === "Critical Weakness";

              return (
                <div
                  key={step}
                  className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs"
                >
                  <div className="flex items-center space-x-2">
                    {isStrength ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    ) : isCritical ? (
                      <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
                    ) : (
                      <TrendingUp className="h-4 w-4 text-amber-500 shrink-0" />
                    )}
                    <span className="font-semibold text-slate-800">
                      {STEP_LABELS[step]}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2.5">
                    <span className="font-mono font-bold text-slate-900">
                      {item.masteryScore}%
                    </span>
                    <Badge
                      variant={
                        isStrength
                          ? "success"
                          : isCritical
                          ? "destructive"
                          : "secondary"
                      }
                      className="text-[10px] px-1.5 py-0"
                    >
                      {item.status}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
