"use client";

import React, { useState, useEffect } from "react";
import { Clock, Calculator, Pause, Play, AlertTriangle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CBTHeaderProps {
  caseTitle: string;
  totalTimeMinutes?: number;
  onTimeExpired?: () => void;
  onOpenCalculator?: () => void;
  onOpenNotes?: () => void;
  isPaused?: boolean;
  onTogglePause?: () => void;
  candidateName?: string;
  candidateId?: string;
}

export function CBTHeader({
  caseTitle,
  totalTimeMinutes = 45,
  onTimeExpired,
  onOpenCalculator,
  onOpenNotes,
  isPaused = false,
  onTogglePause,
  candidateName = "Candidate: M. Nashed, RN Candidate",
  candidateId = "NCSBN ID: 893-412-901",
}: CBTHeaderProps) {
  const [secondsRemaining, setSecondsRemaining] = useState(totalTimeMinutes * 60);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeExpired?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, onTimeExpired]);

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const isTimeCritical = secondsRemaining < 300; // < 5 minutes

  return (
    <header className="w-full bg-slate-900 border-b border-slate-800 text-slate-100 px-4 py-2 flex flex-wrap items-center justify-between shadow-md select-none text-xs sm:text-sm font-sans">
      {/* Candidate Profile Info */}
      <div className="flex items-center space-x-3">
        <div className="flex flex-col">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-100 tracking-wide text-sm">
              {candidateName}
            </span>
            <Badge variant="cbt" className="hidden sm:inline-flex">
              SECURE CBT
            </Badge>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            {candidateId} • NextGen Case Study Simulation
          </span>
        </div>
      </div>

      {/* Case Study Header Banner */}
      <div className="hidden lg:flex items-center justify-center flex-1 max-w-md px-4 truncate">
        <span className="text-xs font-medium text-slate-300 truncate bg-slate-800/80 px-3 py-1 rounded border border-slate-700">
          {caseTitle}
        </span>
      </div>

      {/* CBT Tools & Real-Time Examination Timer */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {onOpenCalculator && (
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenCalculator}
            className="h-8 bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700 text-xs gap-1.5"
            title="Open Scientific Calculator"
          >
            <Calculator className="h-3.5 w-3.5 text-blue-400" />
            <span className="hidden sm:inline">Calculator</span>
          </Button>
        )}

        {onOpenNotes && (
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenNotes}
            className="h-8 bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700 text-xs gap-1.5"
            title="Open Clinical Scratchpad Notes"
          >
            <FileText className="h-3.5 w-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Scratchpad</span>
          </Button>
        )}

        {/* Timer Display */}
        <div
          className={`flex items-center space-x-2 px-3 py-1 rounded-md border font-mono font-bold text-sm tracking-wider shadow-inner transition-colors ${
            isTimeCritical
              ? "bg-red-950/80 text-red-300 border-red-700 animate-pulse"
              : "bg-slate-950 text-emerald-400 border-slate-800"
          }`}
        >
          <Clock className="h-4 w-4" />
          <span>
            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </span>
          {isTimeCritical && <AlertTriangle className="h-3.5 w-3.5 text-red-400" />}
        </div>

        {/* Pause Button */}
        {onTogglePause && (
          <Button
            variant="outline"
            size="sm"
            onClick={onTogglePause}
            className="h-8 bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700 text-xs px-2.5"
            title={isPaused ? "Resume Examination" : "Pause Examination"}
          >
            {isPaused ? (
              <Play className="h-3.5 w-3.5 text-emerald-400 fill-emerald-400" />
            ) : (
              <Pause className="h-3.5 w-3.5 text-amber-400" />
            )}
          </Button>
        )}
      </div>
    </header>
  );
}
