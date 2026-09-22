"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertOctagon, RotateCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log runtime exception safely
    console.error("[CBT Simulator Runtime Error]:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-4 font-sans select-none">
      <div className="max-w-md w-full bg-slate-800 border border-slate-700 rounded-2xl p-6 sm:p-8 shadow-2xl text-center space-y-5">
        <div className="w-14 h-14 rounded-full bg-red-950/80 border border-red-700/60 mx-auto flex items-center justify-center text-red-400">
          <AlertOctagon className="h-7 w-7" />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-red-400 bg-red-950/60 px-2.5 py-0.5 rounded border border-red-800/60 inline-block">
            CBT Session Interruption
          </span>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Simulation State Error
          </h1>
          <p className="text-xs text-slate-300 leading-relaxed">
            The clinical examination engine encountered an unexpected exception while rendering this exhibit. Your local test progress and answers have been safely preserved in browser storage.
          </p>
          {error.digest && (
            <p className="text-[11px] font-mono text-slate-500 bg-slate-900/60 py-1 px-2 rounded">
              Error Digest: {error.digest}
            </p>
          )}
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="default"
            size="sm"
            onClick={() => reset()}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs gap-1.5 h-10 px-4 cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Resume Simulation
          </Button>

          <Link href="/">
            <Button
              variant="outline"
              size="sm"
              className="w-full sm:w-auto bg-slate-750 border-slate-600 text-slate-200 hover:bg-slate-700 text-xs font-semibold gap-1.5 h-10 px-4 cursor-pointer"
            >
              <Home className="h-3.5 w-3.5" />
              Return to Dashboard
            </Button>
          </Link>
        </div>

        <div className="text-[11px] text-slate-500 border-t border-slate-700/60 pt-3">
          If this issue persists, contact technical candidate support at{" "}
          <span className="text-slate-400 font-mono">support@nextgen-prep.com.au</span>
        </div>
      </div>
    </div>
  );
}
