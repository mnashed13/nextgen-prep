"use client";

import React from "react";
import { AnalyzeCuesQuestion, EvaluateOutcomesQuestion } from "@/lib/mock-cases";
import { Check, X, Info } from "lucide-react";

interface MatrixQuestionProps {
  question: AnalyzeCuesQuestion | EvaluateOutcomesQuestion;
  value: Record<string, string>; // { rowId: selectedColumnId }
  onChange: (newVal: Record<string, string>) => void;
  isReviewMode?: boolean;
}

export function MatrixQuestion({
  question,
  value = {},
  onChange,
  isReviewMode = false,
}: MatrixQuestionProps) {
  // Normalize columns and rows
  const columns =
    "columns" in question && question.columns
      ? question.columns
      : [
          { id: "improved", label: "Improved" },
          { id: "unchanged", label: "Unchanged" },
          { id: "deteriorated", label: "Deteriorated" },
        ];

  const rows =
    "rows" in question && question.rows
      ? question.rows.map((r) => ({
          id: r.id,
          label: r.finding,
          correctCol: r.correctColumnId,
        }))
      : "parameters" in question && question.parameters
      ? question.parameters.map((p) => ({
          id: p.id,
          label: `${p.parameter}: ${p.finding}`,
          correctCol: p.correctStatus,
        }))
      : [];

  const handleSelect = (rowId: string, colId: string) => {
    if (isReviewMode) return;
    onChange({
      ...value,
      [rowId]: colId,
    });
  };

  return (
    <div className="space-y-4 text-slate-800 text-sm font-sans">
      {/* Question Instruction Header */}
      <div className="bg-slate-100 border border-slate-200 rounded-lg p-3 text-xs text-slate-800 flex items-start space-x-2">
        <Info className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Instructions: </span>
          {question.instructionNote || "For each finding, select one column. Each row requires a selection."}
        </div>
      </div>

      {/* Matrix Table */}
      <div className="rounded-lg border border-slate-300 bg-white overflow-x-auto shadow-xs">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 text-slate-900 border-b border-slate-300">
              <th className="p-3.5 font-bold text-slate-900 min-w-[200px]">
                Assessment Finding / Parameter
              </th>
              {columns.map((col) => (
                <th
                  key={col.id}
                  className="p-3 text-center font-bold text-slate-800 border-l border-slate-200 min-w-[110px]"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {rows.map((row) => {
              const selectedCol = value[row.id];
              const isRowAnswered = Boolean(selectedCol);

              return (
                <tr
                  key={row.id}
                  className={`hover:bg-slate-50/80 transition-colors ${
                    !isRowAnswered && !isReviewMode ? "bg-amber-50/20" : ""
                  }`}
                >
                  {/* Row Label */}
                  <td className="p-3.5 font-medium text-slate-900 leading-relaxed">
                    {row.label}
                    {isReviewMode && question.rationale.optionsFeedback[row.id] && (
                      <p className="mt-1.5 text-[11px] text-slate-600 font-normal italic">
                        {question.rationale.optionsFeedback[row.id]}
                      </p>
                    )}
                  </td>

                  {/* Columns */}
                  {columns.map((col) => {
                    const isSelected = selectedCol === col.id;
                    const isTargetCorrect = row.correctCol === col.id;

                    let cellStyle = "text-slate-600";
                    if (isReviewMode) {
                      if (isSelected && isTargetCorrect) {
                        cellStyle = "bg-emerald-100/70 text-emerald-900 font-bold";
                      } else if (isSelected && !isTargetCorrect) {
                        cellStyle = "bg-red-100/70 text-red-900";
                      } else if (!isSelected && isTargetCorrect) {
                        cellStyle = "bg-emerald-50 text-emerald-800 font-semibold border-2 border-dashed border-emerald-400";
                      }
                    } else if (isSelected) {
                      cellStyle = "bg-blue-50 text-blue-900 font-semibold";
                    }

                    return (
                      <td
                        key={col.id}
                        onClick={() => handleSelect(row.id, col.id)}
                        className={`p-3 text-center border-l border-slate-200 select-none cursor-pointer transition-colors ${cellStyle}`}
                      >
                        <div className="flex items-center justify-center">
                          <input
                            type="radio"
                            name={`matrix-row-${row.id}`}
                            checked={isSelected}
                            onChange={() => handleSelect(row.id, col.id)}
                            disabled={isReviewMode}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-400 cursor-pointer"
                          />
                        </div>

                        {isReviewMode && (
                          <div className="mt-1 flex items-center justify-center text-[10px]">
                            {isSelected && isTargetCorrect && (
                              <span className="text-emerald-700 flex items-center">
                                <Check className="h-3 w-3 mr-0.5" /> Correct
                              </span>
                            )}
                            {isSelected && !isTargetCorrect && (
                              <span className="text-red-700 flex items-center">
                                <X className="h-3 w-3 mr-0.5" /> Incorrect
                              </span>
                            )}
                            {!isSelected && isTargetCorrect && (
                              <span className="text-emerald-700 font-bold">
                                Correct Answer
                              </span>
                            )}
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
