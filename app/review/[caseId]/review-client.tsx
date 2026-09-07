"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ClinicalCase, CaseQuestion } from "@/lib/mock-cases";
import { ExamGradeResult, gradeExam } from "@/lib/engine/scoring-engine";
import {
  computeCandidateReadiness,
  CandidateReadinessReport,
} from "@/lib/engine/fsrs-scheduler";
import { CJMMScorecard } from "@/components/analytics/cjmm-scorecard";
import { WeaknessRadar } from "@/components/analytics/weakness-radar";
import { ReviewRationaleModal } from "@/components/analytics/review-rationale-modal";
import { ClinicalHighlight } from "@/components/question-types/clinical-highlight";
import { MatrixQuestion } from "@/components/question-types/matrix-question";
import { DragPriority } from "@/components/question-types/drag-priority";
import { ClozeDropdown } from "@/components/question-types/cloze-dropdown";
import { MultipleResponse } from "@/components/question-types/multiple-response";
import { EHRTabs } from "@/components/ehr/ehr-tabs";
import {
  ArrowLeft,
  RotateCcw,
  BookOpen,
  Stethoscope,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ReviewClientProps {
  caseStudy: ClinicalCase;
}

export function ReviewClient({ caseStudy }: ReviewClientProps) {
  const [examResult, setExamResult] = useState<ExamGradeResult | null>(null);
  const [readinessReport, setReadinessReport] = useState<CandidateReadinessReport | null>(null);
  const [activeQuestionForModal, setActiveQuestionForModal] = useState<CaseQuestion | null>(null);
  const [selectedReviewStepIndex, setSelectedReviewStepIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      // 1. Try to load recent attempt from sessionStorage or grade a default pass
      try {
        const stored = sessionStorage.getItem(`exam_review_${caseStudy.id}`);
        if (stored) {
          setExamResult(JSON.parse(stored));
        } else {
          // Generate a sample completed grade result so user can review immediately
          const mockAnswers: Record<string, unknown> = {
            "q-sepsis-1": ["seg-1", "seg-2", "seg-3", "seg-4"],
            "q-sepsis-2": {
              "row-1": "col-septic",
              "row-2": "col-septic",
              "row-3": "col-normal",
              "row-4": "col-hypovolemic",
            },
            "q-sepsis-3": ["hypo-1", "hypo-2", "hypo-3", "hypo-4"],
            "q-sepsis-4": { dropdown1: "opt-fluids", dropdown2: "rat-perfusion" },
            "q-sepsis-5": ["act-1", "act-2", "act-4", "act-5", "act-7"],
            "q-sepsis-6": {
              "eval-1": "improved",
              "eval-2": "improved",
              "eval-3": "improved",
              "eval-4": "deteriorated",
            },
          };
          const defaultResult = gradeExam(caseStudy, mockAnswers, 840);
          setExamResult(defaultResult);
        }
      } catch {
        const fallback = gradeExam(caseStudy, {}, 600);
        setExamResult(fallback);
      }

      // 2. Compute FSRS Candidate Readiness
      setReadinessReport(computeCandidateReadiness());
    }, 0);

    return () => clearTimeout(timer);
  }, [caseStudy]);

  const activeQuestion = caseStudy.questions[selectedReviewStepIndex];
  const activeQuestionGrade = examResult?.questionResults.find(
    (q) => q.questionId === activeQuestion?.id
  );

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans select-none">
      {/* Review Header */}
      <header className="bg-slate-900 text-white border-b border-slate-800 px-6 py-3.5 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-3">
          <Link
            href="/"
            className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold">
              <Stethoscope className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-sm sm:text-base">
                NextGen Post-Exam Review
              </span>
              <span className="text-[10px] text-blue-300 block font-mono">
                {caseStudy.title}
              </span>
            </div>
          </Link>
        </div>

        <div className="flex items-center space-x-2.5">
          <Link href={`/exam/${caseStudy.id}`}>
            <Button
              variant="outline"
              size="sm"
              className="h-8 bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700 text-xs gap-1.5"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Retake Case Simulation
            </Button>
          </Link>
          <Link href="/">
            <Button
              variant="default"
              size="sm"
              className="h-8 bg-blue-600 hover:bg-blue-500 text-white text-xs gap-1.5"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Dashboard
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Review Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {/* 1. Scorecard */}
        {examResult && (
          <CJMMScorecard
            gradeResult={examResult}
            caseTitle={caseStudy.subtitle}
          />
        )}

        {/* 2. Spaced Repetition Mastery Tracker & Radar */}
        {readinessReport && <WeaknessRadar report={readinessReport} />}

        {/* 3. Split Review Workspace: Left EHR & Right Question Review */}
        <div className="bg-white rounded-xl border border-slate-300 overflow-hidden shadow-sm flex flex-col">
          <div className="bg-slate-800 text-slate-200 p-3.5 border-b border-slate-700 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4 text-blue-400" />
              <h3 className="font-bold text-sm text-white uppercase tracking-wider">
                Step-by-Step Clinical Rationale & Scoring Analysis
              </h3>
            </div>
            <span className="text-xs text-slate-400">
              Select any step below to inspect candidate answers vs official rationales
            </span>
          </div>

          {/* Question Step Selector Pills */}
          <div className="bg-slate-100 p-2.5 border-b border-slate-200 flex items-center space-x-2 overflow-x-auto">
            {caseStudy.questions.map((q, idx) => {
              const qGrade = examResult?.questionResults.find(
                (r) => r.questionId === q.id
              );
              const isSelected = idx === selectedReviewStepIndex;
              const isPass = (qGrade?.percentage || 0) >= 75;

              return (
                <button
                  key={q.id}
                  onClick={() => setSelectedReviewStepIndex(idx)}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? "bg-blue-700 text-white shadow-xs"
                      : "bg-white text-slate-700 hover:bg-slate-200 border border-slate-300"
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-black/20 flex items-center justify-center text-[10px]">
                    {idx + 1}
                  </span>
                  <span>{q.title}</span>
                  {qGrade && (
                    <span
                      className={`font-mono text-[11px] ml-1 px-1.5 py-0.2 rounded ${
                        isSelected
                          ? "bg-blue-800 text-white"
                          : isPass
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-rose-100 text-rose-800"
                      }`}
                    >
                      {qGrade.earnedPoints}/{qGrade.maxPoints} pts
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Split Review Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[550px]">
            {/* Left: EHR with review highlight cues */}
            <div className="lg:col-span-6 border-r border-slate-300 overflow-hidden">
              <EHRTabs ehr={caseStudy.ehr} isReviewMode={true} />
            </div>

            {/* Right: Question with Full Review feedback */}
            <div className="lg:col-span-6 p-5 sm:p-6 overflow-y-auto bg-slate-50 space-y-4">
              {activeQuestion && (
                <>
                  {/* Step Score Status Banner */}
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-slate-300 shadow-xs">
                    <div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="cbt" className="bg-slate-900 text-slate-100">
                          STEP {activeQuestion.stepNumber}
                        </Badge>
                        <span className="font-bold text-slate-900 text-sm">
                          {activeQuestion.title}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500 font-mono">
                        Applied Rule: {activeQuestionGrade?.scoringRuleApplied}
                      </span>
                    </div>

                    <div className="text-right">
                      <div className="text-xl font-bold font-mono text-slate-900">
                        {activeQuestionGrade?.earnedPoints} / {activeQuestion.maxScore} pts
                      </div>
                      <Badge
                        variant={
                          (activeQuestionGrade?.percentage || 0) >= 75
                            ? "success"
                            : "destructive"
                        }
                        className="text-[10px] px-1.5 py-0"
                      >
                        {activeQuestionGrade?.percentage}% Scored
                      </Badge>
                    </div>
                  </div>

                  {/* Question Prompt */}
                  <div className="p-4 rounded-xl bg-white border border-slate-300 shadow-xs">
                    <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                      {activeQuestion.prompt}
                    </p>
                  </div>

                  {/* Question Review Display with Correct / Incorrect highlights */}
                  <div className="p-4 sm:p-5 rounded-xl bg-white border border-slate-300 shadow-xs">
                    {activeQuestion.type === "highlight" && (
                      <ClinicalHighlight
                        question={activeQuestion}
                        value={(activeQuestionGrade?.userAnswer as string[]) || []}
                        onChange={() => {}}
                        isReviewMode={true}
                      />
                    )}

                    {activeQuestion.type === "matrix" && (
                      <MatrixQuestion
                        question={activeQuestion}
                        value={(activeQuestionGrade?.userAnswer as Record<string, string>) || {}}
                        onChange={() => {}}
                        isReviewMode={true}
                      />
                    )}

                    {activeQuestion.type === "drag_priority" && (
                      <DragPriority
                        question={activeQuestion}
                        value={(activeQuestionGrade?.userAnswer as string[]) || []}
                        onChange={() => {}}
                        isReviewMode={true}
                      />
                    )}

                    {activeQuestion.type === "cloze_dropdown" && (
                      <ClozeDropdown
                        question={activeQuestion}
                        value={(activeQuestionGrade?.userAnswer as { dropdown1?: string; dropdown2?: string }) || {}}
                        onChange={() => {}}
                        isReviewMode={true}
                      />
                    )}

                    {activeQuestion.type === "multiple_response" && (
                      <MultipleResponse
                        question={activeQuestion}
                        value={(activeQuestionGrade?.userAnswer as string[]) || []}
                        onChange={() => {}}
                        isReviewMode={true}
                      />
                    )}

                    {activeQuestion.type === "evaluate_matrix" && (
                      <MatrixQuestion
                        question={activeQuestion}
                        value={(activeQuestionGrade?.userAnswer as Record<string, string>) || {}}
                        onChange={() => {}}
                        isReviewMode={true}
                      />
                    )}
                  </div>

                  {/* Trigger Detailed Rationale Modal Button */}
                  <Button
                    variant="cbt"
                    size="lg"
                    onClick={() => setActiveQuestionForModal(activeQuestion)}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs gap-2 py-3 shadow-md"
                  >
                    <BookOpen className="h-4 w-4 text-blue-400" />
                    Open Detailed Pathophysiology & Distractor Breakdown
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Rationale Modal */}
      <ReviewRationaleModal
        question={activeQuestionForModal}
        isOpen={Boolean(activeQuestionForModal)}
        onClose={() => setActiveQuestionForModal(null)}
      />
    </div>
  );
}
