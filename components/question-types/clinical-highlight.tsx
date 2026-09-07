"use client";

import React from "react";
import { RecognizeCuesQuestion } from "@/lib/mock-cases";
import { Check, X, Info, Sparkles } from "lucide-react";

interface ClinicalHighlightProps {
  question: RecognizeCuesQuestion;
  value: string[]; // array of selected cue IDs
  onChange: (newVal: string[]) => void;
  isReviewMode?: boolean;
}

export function ClinicalHighlight({
  question,
  value = [],
  onChange,
  isReviewMode = false,
}: ClinicalHighlightProps) {
  const toggleCue = (id: string) => {
    if (isReviewMode) return;
    if (value.includes(id)) {
      onChange(value.filter((item) => item !== id));
    } else {
      onChange([...value, id]);
    }
  };

  return (
    <div className="space-y-4 text-slate-800 text-sm">
      {/* Scoring Alert */}
      <div className="bg-blue-50/80 border border-blue-200 rounded-lg p-3 text-xs text-blue-900 flex items-start space-x-2">
        <Info className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">NCSBN +/- Scoring Rule: </span>
          {question.instructionNote ||
            "Select relevant cues. +1 point awarded for each correct cue; -1 point deducted for each incorrect distractor (minimum score 0)."}
        </div>
      </div>

      <div className="text-xs text-slate-500 font-medium">
        Selected: <span className="font-bold text-blue-700">{value.length}</span> cues
      </div>

      {/* Interactive Segments List */}
      <div className="space-y-2.5">
        {question.textSegments.map((segment) => {
          const isSelected = value.includes(segment.id);
          const isCorrect = segment.isCorrectCue;

          let cardStyle =
            "border-slate-200 bg-white hover:border-slate-400 hover:bg-slate-50 text-slate-800";

          if (!isReviewMode && isSelected) {
            cardStyle =
              "border-amber-400 bg-amber-50 text-amber-950 font-medium ring-2 ring-amber-300 shadow-xs";
          } else if (isReviewMode) {
            if (isSelected && isCorrect) {
              cardStyle =
                "border-emerald-500 bg-emerald-50/80 text-emerald-950 ring-1 ring-emerald-400";
            } else if (isSelected && !isCorrect) {
              cardStyle = "border-red-500 bg-red-50 text-red-950 ring-1 ring-red-400";
            } else if (!isSelected && isCorrect) {
              cardStyle =
                "border-dashed border-emerald-500 bg-white text-slate-700 opacity-90";
            } else {
              cardStyle = "border-slate-200 bg-slate-50/60 text-slate-500 opacity-60";
            }
          }

          return (
            <div
              key={segment.id}
              onClick={() => toggleCue(segment.id)}
              className={`p-3.5 rounded-lg border transition-all select-none cursor-pointer flex items-start justify-between gap-3 ${cardStyle}`}
            >
              <div className="flex items-start space-x-3 flex-1">
                {/* Visual Highlight Marker */}
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 text-xs transition-colors ${
                    isSelected
                      ? "bg-amber-400 text-slate-950 font-bold"
                      : "border border-slate-300 bg-white text-transparent"
                  }`}
                >
                  {isSelected ? <Sparkles className="h-3 w-3" /> : null}
                </div>

                <div className="flex-1">
                  <p className="text-xs sm:text-sm leading-relaxed">
                    {segment.text}
                  </p>

                  {/* Review Explanation */}
                  {isReviewMode && (
                    <div className="mt-2 text-xs pt-2 border-t border-slate-200/60">
                      {isSelected && isCorrect && (
                        <span className="text-emerald-700 font-semibold flex items-center gap-1">
                          <Check className="h-3.5 w-3.5" /> Correct Cue (+1 point)
                        </span>
                      )}
                      {isSelected && !isCorrect && (
                        <span className="text-red-700 font-semibold flex items-center gap-1">
                          <X className="h-3.5 w-3.5" /> Incorrect Distractor (-1 point)
                        </span>
                      )}
                      {!isSelected && isCorrect && (
                        <span className="text-amber-800 font-semibold">
                          Missed Cue (Should have been selected)
                        </span>
                      )}
                      {question.rationale.optionsFeedback[segment.id] && (
                        <p className="text-slate-600 mt-1 italic">
                          {question.rationale.optionsFeedback[segment.id]}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {isReviewMode && (
                <div className="shrink-0 font-mono text-xs font-bold">
                  {isSelected && isCorrect ? (
                    <span className="text-emerald-600">+1</span>
                  ) : isSelected && !isCorrect ? (
                    <span className="text-red-600">-1</span>
                  ) : (
                    <span className="text-slate-400">0</span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
