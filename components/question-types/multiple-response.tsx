"use client";

import React from "react";
import { MultipleResponseQuestion } from "@/lib/mock-cases";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, X, Info } from "lucide-react";

interface MultipleResponseProps {
  question: MultipleResponseQuestion;
  value: string[]; // array of selected option IDs
  onChange: (newVal: string[]) => void;
  isReviewMode?: boolean;
}

export function MultipleResponse({
  question,
  value = [],
  onChange,
  isReviewMode = false,
}: MultipleResponseProps) {
  const toggleOption = (id: string) => {
    if (isReviewMode) return;
    if (value.includes(id)) {
      onChange(value.filter((item) => item !== id));
    } else {
      onChange([...value, id]);
    }
  };

  return (
    <div className="space-y-4 text-slate-800 text-sm font-sans">
      <div className="bg-blue-50/90 border border-blue-200 rounded-lg p-3 text-xs text-blue-950 flex items-start space-x-2">
        <Info className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">NCSBN +/- Scoring Rule: </span>
          {question.instructionNote ||
            "Select all indicated clinical actions. Each correct selection earns +1 point; each incorrect selection loses 1 point (total points floored at 0)."}
        </div>
      </div>

      <div className="text-xs text-slate-500 font-medium">
        Selected: <span className="font-bold text-blue-700">{value.length}</span> actions
      </div>

      <div className="space-y-2.5">
        {question.options.map((option) => {
          const isSelected = value.includes(option.id);
          const isCorrect = option.isCorrect;

          let cardStyle =
            "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-900";

          if (!isReviewMode && isSelected) {
            cardStyle =
              "border-blue-500 bg-blue-50/60 text-blue-950 font-medium ring-1 ring-blue-400";
          } else if (isReviewMode) {
            if (isSelected && isCorrect) {
              cardStyle =
                "border-emerald-500 bg-emerald-50/80 text-emerald-950 ring-1 ring-emerald-400";
            } else if (isSelected && !isCorrect) {
              cardStyle = "border-red-500 bg-red-50 text-red-950 ring-1 ring-red-400";
            } else if (!isSelected && isCorrect) {
              cardStyle =
                "border-dashed border-emerald-500 bg-white text-slate-800 opacity-90";
            } else {
              cardStyle = "border-slate-200 bg-slate-50/60 text-slate-500 opacity-60";
            }
          }

          return (
            <div
              key={option.id}
              onClick={() => toggleOption(option.id)}
              className={`p-3.5 rounded-lg border transition-all select-none cursor-pointer flex items-start justify-between gap-3 ${cardStyle}`}
            >
              <div className="flex items-start space-x-3 flex-1">
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={() => toggleOption(option.id)}
                  disabled={isReviewMode}
                  className="mt-0.5 border-slate-400 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                />

                <div className="flex-1">
                  <p className="text-xs sm:text-sm leading-relaxed">
                    {option.label}
                  </p>

                  {/* Review feedback */}
                  {isReviewMode && (
                    <div className="mt-2 text-xs pt-1.5 border-t border-slate-200/60">
                      {isSelected && isCorrect && (
                        <span className="text-emerald-700 font-semibold flex items-center gap-1">
                          <Check className="h-3.5 w-3.5" /> Indicated Action (+1 point)
                        </span>
                      )}
                      {isSelected && !isCorrect && (
                        <span className="text-red-700 font-semibold flex items-center gap-1">
                          <X className="h-3.5 w-3.5" /> Contraindicated Action (-1 point)
                        </span>
                      )}
                      {!isSelected && isCorrect && (
                        <span className="text-emerald-800 font-semibold">
                          Missed Indication (Should have selected)
                        </span>
                      )}
                      {option.rationaleSnippet && (
                        <p className="text-slate-600 mt-1 italic">
                          {option.rationaleSnippet}
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
