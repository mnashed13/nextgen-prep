"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NotesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotesModal({ isOpen, onClose }: NotesModalProps) {
  const [noteText, setNoteText] = useState("");

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md font-sans p-5">
        <DialogHeader className="pb-2 border-b border-slate-200">
          <DialogTitle className="text-sm font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wider">
            <FileText className="h-4 w-4 text-emerald-600" />
            Candidate Clinical Scratchpad
          </DialogTitle>
        </DialogHeader>

        <p className="text-xs text-slate-500">
          Use this scratchpad to synthesize cues, calculate drip rates, or note differential diagnoses. Notes are cleared upon exam submission.
        </p>

        <textarea
          rows={7}
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Type clinical thoughts, calculations, or problem lists here..."
          className="w-full p-3 text-xs font-mono rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />

        <div className="flex justify-end pt-2">
          <Button
            size="sm"
            onClick={onClose}
            className="h-8 text-xs bg-slate-800 hover:bg-slate-700 text-white"
          >
            Save & Close Scratchpad
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
