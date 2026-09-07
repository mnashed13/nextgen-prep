"use client";

import React, { useState } from "react";
import {
  Highlighter,
  Strikethrough,
  RotateCcw,
  BookOpen,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ExamToolbarProps {
  isHighlightActive?: boolean;
  onToggleHighlight?: () => void;
  isStrikethroughActive?: boolean;
  onToggleStrikethrough?: () => void;
  onResetMarkings?: () => void;
}

export function ExamToolbar({
  isHighlightActive = false,
  onToggleHighlight,
  isStrikethroughActive = false,
  onToggleStrikethrough,
  onResetMarkings,
}: ExamToolbarProps) {
  const [showRefDialog, setShowRefDialog] = useState(false);

  return (
    <>
      <div className="w-full bg-slate-100 border-b border-slate-300 px-4 py-1.5 flex items-center justify-between text-xs text-slate-700 shadow-xs select-none">
        {/* Left: Test Tools (Highlight, Strikethrough, Reset) */}
        <div className="flex items-center space-x-1.5">
          <Button
            variant={isHighlightActive ? "default" : "outline"}
            size="sm"
            onClick={onToggleHighlight}
            className={`h-7 px-2.5 text-xs font-medium ${
              isHighlightActive
                ? "bg-amber-400 text-slate-950 hover:bg-amber-500 border-amber-500"
                : "bg-white text-slate-700 hover:bg-slate-50 border-slate-300"
            }`}
          >
            <Highlighter className="h-3.5 w-3.5 mr-1 text-amber-600" />
            Highlight
          </Button>

          <Button
            variant={isStrikethroughActive ? "default" : "outline"}
            size="sm"
            onClick={onToggleStrikethrough}
            className={`h-7 px-2.5 text-xs font-medium ${
              isStrikethroughActive
                ? "bg-slate-800 text-white hover:bg-slate-900 border-slate-800"
                : "bg-white text-slate-700 hover:bg-slate-50 border-slate-300"
            }`}
          >
            <Strikethrough className="h-3.5 w-3.5 mr-1" />
            Strikethrough
          </Button>

          {onResetMarkings && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onResetMarkings}
              className="h-7 px-2 text-xs text-slate-500 hover:text-slate-800"
              title="Clear Highlight Marks"
            >
              <RotateCcw className="h-3 w-3 mr-1" />
              Clear
            </Button>
          )}
        </div>

        {/* Right: Reference Tables & CBT Guide */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowRefDialog(true)}
            className="h-7 px-2.5 text-xs text-blue-700 hover:text-blue-900 hover:bg-blue-50 font-medium"
          >
            <BookOpen className="h-3.5 w-3.5 mr-1" />
            Normal Lab Values
          </Button>
          <span className="text-slate-300">|</span>
          <span className="text-[11px] text-slate-500 hidden md:inline">
            NCSBN NGN Case Study Model: 6 Cognitive Steps
          </span>
        </div>
      </div>

      {/* Normal Reference Dialog */}
      <Dialog open={showRefDialog} onOpenChange={setShowRefDialog}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Info className="h-5 w-5 text-blue-600" />
              Standard Clinical Laboratory Reference Ranges (Adult)
            </DialogTitle>
          </DialogHeader>
          <div className="text-xs space-y-4 text-slate-700 divide-y divide-slate-200">
            {/* Hematology */}
            <div className="pt-2">
              <h4 className="font-bold text-slate-900 mb-1.5 uppercase tracking-wider text-[11px] text-blue-700">
                Complete Blood Count (CBC)
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <div className="p-2 bg-slate-50 rounded border border-slate-200">
                  <div className="font-semibold text-slate-800">WBC Count</div>
                  <div className="text-slate-600 font-mono">4,500 - 11,000 /µL</div>
                </div>
                <div className="p-2 bg-slate-50 rounded border border-slate-200">
                  <div className="font-semibold text-slate-800">Hemoglobin</div>
                  <div className="text-slate-600 font-mono">F: 12-15.5 | M: 13.5-17.5 g/dL</div>
                </div>
                <div className="p-2 bg-slate-50 rounded border border-slate-200">
                  <div className="font-semibold text-slate-800">Platelets</div>
                  <div className="text-slate-600 font-mono">150,000 - 450,000 /µL</div>
                </div>
                <div className="p-2 bg-slate-50 rounded border border-slate-200">
                  <div className="font-semibold text-slate-800">Bands</div>
                  <div className="text-slate-600 font-mono">0 - 5%</div>
                </div>
              </div>
            </div>

            {/* Chemistry & Renal */}
            <div className="pt-3">
              <h4 className="font-bold text-slate-900 mb-1.5 uppercase tracking-wider text-[11px] text-blue-700">
                Basic Metabolic Panel & Biomarkers
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <div className="p-2 bg-slate-50 rounded border border-slate-200">
                  <div className="font-semibold text-slate-800">Serum Sodium</div>
                  <div className="text-slate-600 font-mono">135 - 145 mEq/L</div>
                </div>
                <div className="p-2 bg-slate-50 rounded border border-slate-200">
                  <div className="font-semibold text-slate-800">Serum Potassium</div>
                  <div className="text-slate-600 font-mono">3.5 - 5.0 mEq/L</div>
                </div>
                <div className="p-2 bg-slate-50 rounded border border-slate-200">
                  <div className="font-semibold text-slate-800">Creatinine</div>
                  <div className="text-slate-600 font-mono">0.6 - 1.2 mg/dL</div>
                </div>
                <div className="p-2 bg-slate-50 rounded border border-slate-200">
                  <div className="font-semibold text-slate-800">Blood Urea Nitrogen</div>
                  <div className="text-slate-600 font-mono">7 - 20 mg/dL</div>
                </div>
                <div className="p-2 bg-slate-50 rounded border border-slate-200">
                  <div className="font-semibold text-slate-800">Serum Lactate</div>
                  <div className="text-slate-600 font-mono">0.5 - 2.0 mmol/L</div>
                </div>
                <div className="p-2 bg-slate-50 rounded border border-slate-200">
                  <div className="font-semibold text-slate-800">Troponin I (hs)</div>
                  <div className="text-slate-600 font-mono">&lt; 14 ng/L</div>
                </div>
              </div>
            </div>

            {/* ABG */}
            <div className="pt-3">
              <h4 className="font-bold text-slate-900 mb-1.5 uppercase tracking-wider text-[11px] text-blue-700">
                Arterial Blood Gas (ABG)
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div className="p-2 bg-slate-50 rounded border border-slate-200">
                  <div className="font-semibold text-slate-800">pH</div>
                  <div className="text-slate-600 font-mono">7.35 - 7.45</div>
                </div>
                <div className="p-2 bg-slate-50 rounded border border-slate-200">
                  <div className="font-semibold text-slate-800">PaCO2</div>
                  <div className="text-slate-600 font-mono">35 - 45 mmHg</div>
                </div>
                <div className="p-2 bg-slate-50 rounded border border-slate-200">
                  <div className="font-semibold text-slate-800">PaO2</div>
                  <div className="text-slate-600 font-mono">80 - 100 mmHg</div>
                </div>
                <div className="p-2 bg-slate-50 rounded border border-slate-200">
                  <div className="font-semibold text-slate-800">HCO3</div>
                  <div className="text-slate-600 font-mono">22 - 26 mEq/L</div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
