"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShieldCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const CONSENT_STORAGE_KEY = "nextgen_cbt_cookie_consent_v1";

export function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const savedConsent = localStorage.getItem(CONSENT_STORAGE_KEY);
        if (!savedConsent) {
          setIsVisible(true);
        }
      } catch {
        // LocalStorage unavailable fallback
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const handleConsent = (level: "all" | "essential") => {
    try {
      localStorage.setItem(
        CONSENT_STORAGE_KEY,
        JSON.stringify({
          level,
          timestamp: new Date().toISOString(),
          jurisdiction: "AU",
        })
      );
    } catch {
      // Ignore
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="region"
      aria-label="Privacy and Local Storage Notice"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 bg-slate-900/95 backdrop-blur-md text-white border border-slate-700 rounded-2xl p-4 sm:p-5 shadow-2xl space-y-3 font-sans"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center space-x-2 text-blue-400">
          <ShieldCheck className="h-5 w-5 shrink-0" />
          <span className="font-bold text-xs uppercase tracking-wider text-slate-200">
            Privacy &amp; Local-First Storage (AU)
          </span>
        </div>
        <button
          onClick={() => handleConsent("essential")}
          className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
          aria-label="Dismiss notice"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <p className="text-xs text-slate-300 leading-relaxed">
        We respect your privacy under the <em>Australian Privacy Act 1988 (Cth)</em>. We use local browser storage to persist your clinical exam answers, vital trends, and FSRS memory schedules on this device. We do not sell or track your medical student identity across the web.
      </p>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pt-1">
        <Link
          href="/privacy"
          className="text-[11px] text-blue-400 hover:text-blue-300 underline font-medium self-center sm:self-auto"
        >
          Learn more in Privacy Policy
        </Link>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleConsent("essential")}
            className="flex-1 sm:flex-none h-8 text-[11px] border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700"
          >
            Essential Only
          </Button>

          <Button
            variant="default"
            size="sm"
            onClick={() => handleConsent("all")}
            className="flex-1 sm:flex-none h-8 text-[11px] font-bold bg-blue-600 hover:bg-blue-500 text-white"
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
