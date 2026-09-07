"use client";

import React from "react";
import { ChevronLeft, ChevronRight, Bookmark, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface TestNavFooterProps {
  currentQuestionIndex: number;
  totalQuestions: number;
  isFlagged: boolean;
  onToggleFlag: () => void;
  onSelectQuestion: (index: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  answeredQuestionIndices: number[];
}

export function TestNavFooter({
  currentQuestionIndex,
  totalQuestions,
  isFlagged,
  onToggleFlag,
  onSelectQuestion,
  onPrevious,
  onNext,
  onSubmit,
  answeredQuestionIndices,
}: TestNavFooterProps) {
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  const stepLabels = [
    "1. Recognize Cues",
    "2. Analyze Cues",
    "3. Prioritize",
    "4. Solutions",
    "5. Take Action",
    "6. Evaluate",
  ];

  return (
    <footer className="w-full bg-slate-900 border-t border-slate-800 text-slate-200 px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-3 shadow-lg select-none">
      {/* Flag For Review */}
      <div className="flex items-center space-x-3 w-full md:w-auto justify-between md:justify-start">
        <label
          htmlFor="flag-toggle"
          className="flex items-center space-x-2 text-xs text-slate-300 hover:text-white cursor-pointer select-none py-1 px-2.5 rounded bg-slate-800/80 border border-slate-700"
        >
          <Checkbox
            id="flag-toggle"
            checked={isFlagged}
            onCheckedChange={() => onToggleFlag()}
            className="border-amber-400 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
          />
          <Bookmark className={`h-3.5 w-3.5 ${isFlagged ? "text-amber-400 fill-amber-400" : "text-slate-400"}`} />
          <span className="font-medium">Flag for Review</span>
        </label>

        {/* Mobile Question Step Display */}
        <span className="md:hidden text-xs text-slate-400 font-mono">
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </span>
      </div>

      {/* Center: 6 Cognitive Steps Indicator */}
      <div className="hidden md:flex items-center space-x-1.5 overflow-x-auto py-1 max-w-xl">
        {Array.from({ length: totalQuestions }).map((_, idx) => {
          const isActive = idx === currentQuestionIndex;
          const isAnswered = answeredQuestionIndices.includes(idx);

          return (
            <button
              key={idx}
              onClick={() => onSelectQuestion(idx)}
              className={`group flex items-center space-x-1.5 px-3 py-1.5 rounded text-xs font-medium transition-all cursor-pointer ${
                isActive
                  ? "bg-blue-600 text-white shadow-sm ring-1 ring-blue-400 font-semibold"
                  : isAnswered
                  ? "bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700"
                  : "bg-slate-800/50 text-slate-400 hover:bg-slate-800 border border-slate-800"
              }`}
            >
              <span className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] bg-black/30">
                {idx + 1}
              </span>
              <span className="truncate max-w-[90px]">{stepLabels[idx] || `Step ${idx + 1}`}</span>
              {isAnswered && !isActive && (
                <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Navigation Controls: Previous / Next / Submit */}
      <div className="flex items-center space-x-2 w-full md:w-auto justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={onPrevious}
          disabled={currentQuestionIndex === 0}
          className="h-9 px-3 bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700 disabled:opacity-30 text-xs font-semibold"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </Button>

        {!isLastQuestion ? (
          <Button
            variant="default"
            size="sm"
            onClick={onNext}
            className="h-9 px-4 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        ) : (
          <Button
            variant="default"
            size="sm"
            onClick={onSubmit}
            className="h-9 px-4 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md gap-1.5"
          >
            <CheckCircle2 className="h-4 w-4" />
            Submit Exam
          </Button>
        )}
      </div>
    </footer>
  );
}
