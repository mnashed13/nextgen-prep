"use client";

import React, { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[CBT Simulator Fatal Root Error]:", error);
  }, [error]);

  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex items-center justify-center bg-slate-950 text-slate-100 p-6 font-sans">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 text-center space-y-5 shadow-2xl">
          <div className="w-14 h-14 rounded-full bg-amber-950/70 border border-amber-600/50 mx-auto flex items-center justify-center text-amber-400">
            <AlertTriangle className="h-7 w-7" />
          </div>

          <div className="space-y-2">
            <h1 className="text-xl font-bold tracking-tight text-white">
              Application Load Error
            </h1>
            <p className="text-xs text-slate-400 leading-relaxed">
              A critical failure occurred during application initialization. Attempting a fresh restart of the simulator environment may restore functionality.
            </p>
          </div>

          <div className="pt-2">
            <Button
              variant="default"
              size="sm"
              onClick={() => reset()}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs gap-1.5 h-10 px-6 cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Restart Application
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}
