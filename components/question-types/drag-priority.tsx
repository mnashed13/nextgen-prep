"use client";

import React, { useState } from "react";
import { PrioritizeHypothesesQuestion } from "@/lib/mock-cases";
import { GripVertical, ArrowUp, ArrowDown, Check, X, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DragPriorityProps {
  question: PrioritizeHypothesesQuestion;
  value: string[]; // array of item IDs in ranked order [top priority, second, ...]
  onChange: (newVal: string[]) => void;
  isReviewMode?: boolean;
}

export function DragPriority({
  question,
  value,
  onChange,
  isReviewMode = false,
}: DragPriorityProps) {
  // Controlled order: if value is valid, use it; otherwise fallback to default question items order
  const currentOrder: string[] =
    value && value.length === question.items.length
      ? value
      : question.items.map((i) => i.id);

  const moveItem = (fromIndex: number, toIndex: number) => {
    if (isReviewMode) return;
    if (toIndex < 0 || toIndex >= currentOrder.length) return;

    const newOrder = [...currentOrder];
    const [moved] = newOrder.splice(fromIndex, 1);
    newOrder.splice(toIndex, 0, moved);

    onChange(newOrder);
  };

  // Drag and Drop State
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    if (isReviewMode) return;
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (isReviewMode || draggedIndex === null || draggedIndex === index) return;
    moveItem(draggedIndex, index);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <div className="space-y-4 text-slate-800 text-sm font-sans">
      <div className="bg-slate-100 border border-slate-200 rounded-lg p-3 text-xs text-slate-800 flex items-start space-x-2">
        <Info className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Instructions: </span>
          {question.instructionNote ||
            "Drag and drop to rearrange, or use the arrow buttons to position items in order of priority (Rank 1 = Highest Urgency)."}
        </div>
      </div>

      <div className="space-y-2.5">
        {currentOrder.map((itemId, index) => {
          const item = question.items.find((i) => i.id === itemId);
          if (!item) return null;

          const currentRank = index + 1;
          const isCorrectRank = item.correctRank === currentRank;

          return (
            <div
              key={item.id}
              draggable={!isReviewMode}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className={`flex items-center justify-between p-3 rounded-lg border transition-all select-none ${
                isReviewMode
                  ? isCorrectRank
                    ? "bg-emerald-50/70 border-emerald-400"
                    : "bg-red-50/70 border-red-300"
                  : "bg-white border-slate-300 hover:border-slate-400 hover:shadow-xs"
              }`}
            >
              <div className="flex items-center space-x-3 flex-1 mr-2">
                {/* Drag Handle / Accessible Controls */}
                {!isReviewMode && (
                  <div
                    className="text-slate-400 hover:text-slate-600 cursor-grab active:cursor-grabbing p-1"
                    title="Drag to reorder"
                  >
                    <GripVertical className="h-4 w-4" />
                  </div>
                )}

                {/* Priority Rank Badge */}
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold font-mono text-sm shrink-0 shadow-xs ${
                    currentRank === 1
                      ? "bg-rose-600 text-white"
                      : currentRank === 2
                      ? "bg-amber-500 text-slate-950"
                      : "bg-slate-200 text-slate-800"
                  }`}
                >
                  #{currentRank}
                </div>

                {/* Hypotheses Content */}
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-slate-900 text-xs sm:text-sm">
                    {item.label}
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5 leading-snug">
                    {item.details}
                  </p>

                  {/* Review Mode Details */}
                  {isReviewMode && (
                    <div className="mt-2 text-xs pt-1.5 border-t border-slate-200/80 flex flex-wrap items-center gap-2">
                      {isCorrectRank ? (
                        <span className="text-emerald-700 font-bold flex items-center gap-1">
                          <Check className="h-3.5 w-3.5" /> Correct Rank #{item.correctRank}
                        </span>
                      ) : (
                        <span className="text-red-700 font-bold flex items-center gap-1">
                          <X className="h-3.5 w-3.5" /> Placed at #{currentRank} (Target: #{item.correctRank})
                        </span>
                      )}
                      {question.rationale.optionsFeedback[item.id] && (
                        <span className="text-slate-600 italic">
                          • {question.rationale.optionsFeedback[item.id]}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Up / Down Buttons for Accessible Ordering */}
              {!isReviewMode && (
                <div className="flex flex-col space-y-1 shrink-0">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => moveItem(index, index - 1)}
                    disabled={index === 0}
                    className="h-6 w-6 p-0 text-slate-500 hover:text-slate-900 disabled:opacity-20"
                    title="Move Up"
                  >
                    <ArrowUp className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => moveItem(index, index + 1)}
                    disabled={index === currentOrder.length - 1}
                    className="h-6 w-6 p-0 text-slate-500 hover:text-slate-900 disabled:opacity-20"
                    title="Move Down"
                  >
                    <ArrowDown className="h-3.5 w-3.5" />
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
