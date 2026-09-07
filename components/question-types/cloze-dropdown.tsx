"use client";

import React from "react";
import { ClozeDropdownQuestion } from "@/lib/mock-cases";
import { Check, X, Info } from "lucide-react";

interface ClozeDropdownProps {
  question: ClozeDropdownQuestion;
  value: { dropdown1?: string; dropdown2?: string };
  onChange: (newVal: { dropdown1?: string; dropdown2?: string }) => void;
  isReviewMode?: boolean;
}

export function ClozeDropdown({
  question,
  value = {},
  onChange,
  isReviewMode = false,
}: ClozeDropdownProps) {
  const handleSelect = (field: "dropdown1" | "dropdown2", optId: string) => {
    if (isReviewMode) return;
    onChange({
      ...value,
      [field]: optId,
    });
  };

  const drop1Selected = value.dropdown1;
  const drop2Selected = value.dropdown2;

  const drop1Correct = drop1Selected === question.dropdown1.correctOptionId;
  const drop2Correct = drop2Selected === question.dropdown2.correctOptionId;

  return (
    <div className="space-y-5 text-slate-800 text-sm font-sans">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-900 flex items-start space-x-2">
        <Info className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">NCSBN Rationale Dyad Rule: </span>
          {question.instructionNote ||
            "Both the intervention and its underlying rationale must be correctly paired to earn rationale credit."}
        </div>
      </div>

      {/* Cloze Sentence Box */}
      <div className="p-5 rounded-xl border border-slate-300 bg-white shadow-xs leading-loose text-sm sm:text-base text-slate-900">
        <span>{question.prefixText}</span>

        {/* Dropdown 1 */}
        <div className="inline-block my-1 mx-1.5 align-middle">
          <select
            value={drop1Selected || ""}
            onChange={(e) => handleSelect("dropdown1", e.target.value)}
            disabled={isReviewMode}
            className={`px-3 py-1.5 rounded-lg border text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-600 ${
              isReviewMode
                ? drop1Correct
                  ? "bg-emerald-50 text-emerald-950 border-emerald-500 ring-1 ring-emerald-400"
                  : "bg-red-50 text-red-950 border-red-500 ring-1 ring-red-400"
                : drop1Selected
                ? "bg-blue-50 border-blue-500 text-blue-950"
                : "bg-slate-50 border-slate-300 text-slate-700"
            }`}
          >
            <option value="" disabled>
              {question.dropdown1.placeholder}
            </option>
            {question.dropdown1.options.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <span>{question.middleText}</span>

        {/* Dropdown 2 */}
        <div className="inline-block my-1 mx-1.5 align-middle">
          <select
            value={drop2Selected || ""}
            onChange={(e) => handleSelect("dropdown2", e.target.value)}
            disabled={isReviewMode}
            className={`px-3 py-1.5 rounded-lg border text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-600 ${
              isReviewMode
                ? drop2Correct
                  ? "bg-emerald-50 text-emerald-950 border-emerald-500 ring-1 ring-emerald-400"
                  : "bg-red-50 text-red-950 border-red-500 ring-1 ring-red-400"
                : drop2Selected
                ? "bg-blue-50 border-blue-500 text-blue-950"
                : "bg-slate-50 border-slate-300 text-slate-700"
            }`}
          >
            <option value="" disabled>
              {question.dropdown2.placeholder}
            </option>
            {question.dropdown2.options.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {question.suffixText && <span>{question.suffixText}</span>}
      </div>

      {/* Review Explanation */}
      {isReviewMode && (
        <div className="space-y-3 pt-2">
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-2">
            <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              Dyad Scoring Breakdown
            </div>

            <div className="flex items-center space-x-2">
              {drop1Correct ? (
                <Check className="h-4 w-4 text-emerald-600" />
              ) : (
                <X className="h-4 w-4 text-red-600" />
              )}
              <span className="font-semibold text-slate-800">Intervention:</span>
              <span className={drop1Correct ? "text-emerald-700" : "text-red-700 font-medium"}>
                {drop1Correct
                  ? "Correct selection"
                  : `Incorrect. Target: "${
                      question.dropdown1.options.find(
                        (o) => o.id === question.dropdown1.correctOptionId
                      )?.label
                    }"`}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              {drop2Correct ? (
                <Check className="h-4 w-4 text-emerald-600" />
              ) : (
                <X className="h-4 w-4 text-red-600" />
              )}
              <span className="font-semibold text-slate-800">Underlying Rationale:</span>
              <span className={drop2Correct ? "text-emerald-700" : "text-red-700 font-medium"}>
                {drop2Correct
                  ? "Correct selection"
                  : `Incorrect. Target: "${
                      question.dropdown2.options.find(
                        (o) => o.id === question.dropdown2.correctOptionId
                      )?.label
                    }"`}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
