"use client";

import React, { useState } from "react";
import { NursesNote } from "@/lib/mock-cases";
import { UserCheck, Clock, FileText, AlertCircle } from "lucide-react";

interface NursesNotesProps {
  notes: NursesNote[];
  isReviewMode?: boolean;
}

export function NursesNotes({ notes, isReviewMode = false }: NursesNotesProps) {
  const [highlightedNoteIds, setHighlightedNoteIds] = useState<string[]>([]);

  const toggleHighlight = (cueId: string) => {
    setHighlightedNoteIds((prev) =>
      prev.includes(cueId) ? prev.filter((id) => id !== cueId) : [...prev, cueId]
    );
  };

  return (
    <div className="space-y-4 p-4 text-slate-800 text-sm leading-relaxed overflow-y-auto max-h-full font-sans">
      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
        <div className="flex items-center space-x-2">
          <FileText className="h-4 w-4 text-blue-700" />
          <span className="font-bold text-slate-900 tracking-wide uppercase text-xs">
            Interdisciplinary Clinical Shift Logs
          </span>
        </div>
        <span className="text-[11px] text-slate-500 italic">
          Click any highlighted text segment to toggle study mark
        </span>
      </div>

      {notes.map((note) => (
        <div
          key={note.id}
          className="bg-white rounded-lg border border-slate-200 p-4 shadow-xs transition-shadow hover:shadow-sm"
        >
          {/* Note Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 mb-3 border-b border-slate-100 text-xs">
            <div className="flex items-center space-x-2 font-mono font-semibold text-blue-900 bg-blue-50 px-2.5 py-1 rounded border border-blue-100">
              <Clock className="h-3.5 w-3.5 text-blue-600" />
              <span>{note.timestamp}</span>
            </div>
            <div className="flex items-center space-x-1.5 text-slate-600">
              <UserCheck className="h-3.5 w-3.5 text-slate-400" />
              <span className="font-medium">{note.author}</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-500 italic">{note.role}</span>
            </div>
          </div>

          {/* Note Body */}
          <div className="text-slate-800 space-y-2">
            {note.highlightableSegments ? (
              <p className="whitespace-pre-line leading-relaxed">
                {/* Render segments or note text */}
                {renderSegmentedText(note, highlightedNoteIds, toggleHighlight, isReviewMode)}
              </p>
            ) : (
              <p className="whitespace-pre-line leading-relaxed">{note.content}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function renderSegmentedText(
  note: NursesNote,
  highlightedIds: string[],
  onToggle: (id: string) => void,
  isReviewMode: boolean
) {
  if (!note.highlightableSegments || note.highlightableSegments.length === 0) {
    return note.content;
  }

  // Parse segments dynamically
  let remainingText = note.content;
  const elements: React.ReactNode[] = [];

  note.highlightableSegments.forEach((seg, idx) => {
    const splitIndex = remainingText.indexOf(seg.text);
    if (splitIndex !== -1) {
      const before = remainingText.substring(0, splitIndex);
      if (before) elements.push(<span key={`before-${idx}`}>{before}</span>);

      const isMarked = highlightedIds.includes(seg.id);
      const isAbnormal = seg.isAbnormalCue;

      elements.push(
        <button
          type="button"
          key={seg.id}
          onClick={() => onToggle(seg.id)}
          className={`inline rounded px-1 py-0.5 my-0.5 text-left transition-colors font-medium cursor-pointer ${
            isMarked
              ? "bg-amber-200 text-amber-950 ring-1 ring-amber-400"
              : isReviewMode && isAbnormal
              ? "bg-red-100 text-red-900 border-b-2 border-red-500 font-semibold"
              : "hover:bg-slate-100 text-slate-900 underline decoration-slate-300 decoration-dotted underline-offset-2"
          }`}
          title="Click to toggle clinical cue highlight"
        >
          {seg.text}
          {isReviewMode && isAbnormal && (
            <AlertCircle className="inline h-3 w-3 ml-1 text-red-600" />
          )}
        </button>
      );

      remainingText = remainingText.substring(splitIndex + seg.text.length);
    }
  });

  if (remainingText) {
    elements.push(<span key="tail">{remainingText}</span>);
  }

  return elements;
}
