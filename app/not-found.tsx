import React from "react";
import Link from "next/link";
import { FileQuestion, ArrowLeft, Home, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans select-none">
      {/* Mini CBT Header */}
      <header className="bg-slate-950 border-b border-slate-800 px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 text-white">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold">
            <Stethoscope className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-sm tracking-tight">
            NextGen Clinical Simulator
          </span>
        </Link>
      </header>

      {/* Main 404 Display */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-lg w-full bg-slate-800 border border-slate-700 rounded-2xl p-6 sm:p-10 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-blue-950/80 border border-blue-700/50 mx-auto flex items-center justify-center text-blue-400">
            <FileQuestion className="h-8 w-8" />
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-blue-400 bg-blue-950/60 px-3 py-1 rounded-full border border-blue-800/60 inline-block font-semibold">
              404 • Exhibit Not Found
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Clinical Case Study Not Found
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm mx-auto">
              The requested EHR record, clinical scenario identifier, or testing exhibit does not exist or has been relocated within the examination registry.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/">
              <Button
                variant="default"
                size="sm"
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs gap-1.5 h-10 px-5 cursor-pointer shadow-md"
              >
                <Home className="h-3.5 w-3.5" />
                Go to Case Library
              </Button>
            </Link>

            <Link href="/pricing">
              <Button
                variant="outline"
                size="sm"
                className="w-full sm:w-auto bg-slate-750 border-slate-600 text-slate-200 hover:bg-slate-700 text-xs font-semibold gap-1.5 h-10 px-5 cursor-pointer"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                View Access Passes
              </Button>
            </Link>
          </div>

          <div className="text-[11px] text-slate-400 border-t border-slate-700/60 pt-4 font-mono">
            Error Code: HTTP_404_EXHIBIT_ABSENT • Pearson VUE / CBT Style
          </div>
        </div>
      </main>
    </div>
  );
}
