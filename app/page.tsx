"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getAllCases } from "@/lib/mock-cases/registry";
import { ClinicalCase } from "@/lib/mock-cases";
import {
  computeCandidateReadiness,
  getUserAccessPass,
  loadExamHistory,
  CandidateReadinessReport,
  UserAccessPass,
} from "@/lib/engine/fsrs-scheduler";
import { ExamGradeResult } from "@/lib/engine/scoring-engine";
import { SemesterPassModal } from "@/components/checkout/semester-pass-modal";
import { Footer } from "@/components/legal/footer";
import {
  Stethoscope,
  Clock,
  Play,
  BookOpen,
  Zap,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function DashboardPage() {
  const cases: ClinicalCase[] = getAllCases();
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("All");
  const [readinessReport, setReadinessReport] = useState<CandidateReadinessReport | null>(null);
  const [userPass, setUserPass] = useState<UserAccessPass | null>(null);
  const [history, setHistory] = useState<ExamGradeResult[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setReadinessReport(computeCandidateReadiness());
      setUserPass(getUserAccessPass());
      setHistory(loadExamHistory());
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const specialties = [
    "All",
    ...Array.from(new Set(cases.map((c) => c.specialty))),
  ];

  const filteredCases =
    selectedSpecialty === "All"
      ? cases
      : cases.filter((c) => c.specialty === selectedSpecialty);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans select-none">
      {/* Top Header */}
      <header className="bg-slate-900 text-white border-b border-slate-800 px-6 py-3.5 flex flex-wrap items-center justify-between gap-4 shadow-md">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-bold shadow-sm">
            <Stethoscope className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-base sm:text-lg tracking-tight">
                NextGen Clinical Simulator
              </span>
              <Badge variant="cbt" className="hidden sm:inline-flex bg-slate-800 text-blue-300 border-blue-900">
                NCSBN NGN & USMLE CBT
              </Badge>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">
              High-Stakes Clinical Judgment Simulation Environment
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Access Pass Status */}
          <button
            onClick={() => setIsCheckoutOpen(true)}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 border border-slate-700 text-xs text-slate-200 transition-colors cursor-pointer"
          >
            <Zap className="h-3.5 w-3.5 text-amber-400" />
            <span className="font-semibold">
              {userPass?.type === "full_access"
                ? "Full Access Active"
                : userPass?.type === "semester_cram"
                ? "90-Day Cram Pass"
                : "Trial Pass Active"}
            </span>
            <span className="text-blue-400 underline text-[11px] ml-1">
              Upgrade
            </span>
          </button>

          <Link href="/pricing">
            <Button
              variant="default"
              size="sm"
              className="h-8 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-sm"
            >
              Exam Passes ($79 AUD)
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {/* Candidate Mastery & Spaced Repetition Overview */}
        {readinessReport && (
          <section className="bg-white rounded-2xl border border-slate-300 p-5 sm:p-7 shadow-xs">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              {/* Left: Passing Probability Dial */}
              <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-6 text-center sm:text-left w-full lg:w-auto">
                <div className="relative w-24 h-24 rounded-full flex items-center justify-center bg-blue-50 border-4 border-blue-600 shadow-inner">
                  <div className="text-center">
                    <span className="text-2xl font-black font-mono text-blue-950 block leading-none">
                      {readinessReport.passingProbability}%
                    </span>
                    <span className="text-[9px] font-bold text-blue-700 uppercase tracking-wider">
                      Readiness
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                      Passing Probability: {readinessReport.overallMasteryLevel}
                    </h2>
                    <Badge variant="success" className="text-xs px-2 py-0.5">
                      FSRS Engine v1
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-600 max-w-md">
                    Based on your local-first memory retention curves and accuracy across the 6 NCSBN Clinical Judgment Measurement Model steps.
                  </p>
                  <div className="flex items-center space-x-4 text-xs font-mono text-slate-500 pt-1">
                    <span>
                      Completed: <strong>{readinessReport.totalSimulationsCompleted}</strong>
                    </span>
                    <span>•</span>
                    <span>
                      Average Score: <strong>{readinessReport.averageScorePercent}%</strong>
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: 6 Cognitive Steps Quick Progress */}
              <div className="w-full lg:max-w-md bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs space-y-2">
                <div className="flex justify-between font-bold text-slate-800 text-[11px] uppercase tracking-wider">
                  <span>NCSBN Cognitive Steps</span>
                  <span>Mastery Level</span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-700">1. Recognize Cues</span>
                    <span className="font-mono font-bold text-slate-900">
                      {readinessReport.cjmmMastery.recognize_cues?.masteryScore}%
                    </span>
                  </div>
                  <Progress
                    value={readinessReport.cjmmMastery.recognize_cues?.masteryScore}
                    indicatorClassName="bg-blue-600"
                  />

                  <div className="flex items-center justify-between text-[11px] pt-1">
                    <span className="text-slate-700">2. Analyze Cues</span>
                    <span className="font-mono font-bold text-slate-900">
                      {readinessReport.cjmmMastery.analyze_cues?.masteryScore}%
                    </span>
                  </div>
                  <Progress
                    value={readinessReport.cjmmMastery.analyze_cues?.masteryScore}
                    indicatorClassName="bg-indigo-600"
                  />

                  <div className="flex items-center justify-between text-[11px] pt-1">
                    <span className="text-slate-700">3. Prioritize Hypotheses</span>
                    <span className="font-mono font-bold text-slate-900">
                      {readinessReport.cjmmMastery.prioritize_hypotheses?.masteryScore}%
                    </span>
                  </div>
                  <Progress
                    value={readinessReport.cjmmMastery.prioritize_hypotheses?.masteryScore}
                    indicatorClassName="bg-emerald-600"
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Case Study Library Filter & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Clinical Case Study Library
            </h2>
            <p className="text-xs text-slate-500">
              Select an electronic health record scenario to begin authentic computer-based testing.
            </p>
          </div>

          {/* Specialty Filter Buttons */}
          <div className="flex items-center space-x-1.5 overflow-x-auto text-xs pb-1 sm:pb-0">
            {specialties.map((spec) => (
              <button
                key={spec}
                onClick={() => setSelectedSpecialty(spec)}
                className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedSpecialty === spec
                    ? "bg-blue-700 text-white shadow-xs"
                    : "bg-white text-slate-700 hover:bg-slate-200 border border-slate-300"
                }`}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>

        {/* Case Study Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCases.map((caseStudy) => {
            const hasAttempted = history.some((h) => h.caseId === caseStudy.id);
            const latestAttempt = history.find((h) => h.caseId === caseStudy.id);

            return (
              <div
                key={caseStudy.id}
                className="bg-white rounded-2xl border border-slate-300 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Card Top Banner */}
                  <div className="bg-slate-900 text-white p-4 border-b border-slate-800 flex items-center justify-between">
                    <Badge variant="cbt" className="bg-slate-800 text-blue-300 border-blue-900 text-[10px]">
                      {caseStudy.specialty}
                    </Badge>
                    <div className="flex items-center space-x-2 text-[11px] font-mono text-slate-400">
                      <Clock className="h-3 w-3" />
                      <span>{caseStudy.estimatedMinutes} Mins</span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 space-y-3">
                    <div className="space-y-1">
                      <h3 className="font-bold text-base text-slate-900 leading-snug">
                        {caseStudy.title}
                      </h3>
                      <p className="text-xs text-blue-800 font-medium">
                        {caseStudy.subtitle}
                      </p>
                    </div>

                    {/* Patient Vignette Teaser */}
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1 text-slate-700">
                      <div className="font-semibold text-slate-900">
                        Patient: {caseStudy.ehr.patientProfile.name} ({caseStudy.ehr.patientProfile.age} yo {caseStudy.ehr.patientProfile.gender})
                      </div>
                      <div className="text-slate-600 line-clamp-2">
                        Admission: {caseStudy.ehr.patientProfile.diagnosis}
                      </div>
                    </div>

                    {/* Features list */}
                    <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500 pt-1 font-mono">
                      <div>• 4-Tab Full EHR</div>
                      <div>• 6 CJMM Questions</div>
                      <div>• High-Yield Rationales</div>
                      <div>• Target: {caseStudy.targetExam}</div>
                    </div>

                    {/* Past Score Badge if attempted */}
                    {hasAttempted && latestAttempt && (
                      <div className="p-2 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between text-xs">
                        <span className="text-blue-900 font-semibold">
                          Latest Attempt:
                        </span>
                        <span className="font-mono font-bold text-blue-950">
                          {latestAttempt.overallPercentage}% ({latestAttempt.isPassing ? "PASS" : "FAIL"})
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="p-5 pt-0 flex items-center space-x-2">
                  <Link href={`/exam/${caseStudy.id}`} className="flex-1">
                    <Button
                      variant="default"
                      size="sm"
                      className="w-full h-10 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs gap-1.5 shadow-sm cursor-pointer"
                    >
                      <Play className="h-3.5 w-3.5 fill-current" />
                      Start Simulation
                    </Button>
                  </Link>

                  <Link href={`/review/${caseStudy.id}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-10 text-xs font-semibold border-slate-300 text-slate-700 hover:bg-slate-100 cursor-pointer"
                      title="Inspect rationales"
                    >
                      <BookOpen className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Non-Renewing Access Pass Promotion Banner */}
        <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-700 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center space-x-1.5 bg-blue-600/30 text-blue-300 border border-blue-500/40 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              <Sparkles className="h-3 w-3" />
              <span>100% Non-Renewing Passes</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              Ready for high-stakes test day? Unlock all clinical cases now.
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Pay once for 90 days ($79 AUD) or 180 days ($149 AUD). All prices include 10% Australian GST. Zero monthly recurring charges. Unlimited case simulations, complete EHR tabs, and FSRS cognitive memory curves.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link href="/pricing">
              <Button
                variant="default"
                size="lg"
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs h-11 px-6 shadow-md"
              >
                View Pass Comparison
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setIsCheckoutOpen(true)}
              className="bg-slate-800 border-slate-600 text-slate-200 hover:bg-slate-700 font-bold text-xs h-11 px-5"
            >
              Simulate Checkout
            </Button>
          </div>
        </section>
      </main>

      {/* Australian Compliance Footer */}
      <Footer />

      {/* Checkout Modal */}
      <SemesterPassModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </div>
  );
}
