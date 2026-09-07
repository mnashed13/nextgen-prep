"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ClinicalCase, CaseQuestion } from "@/lib/mock-cases";
import { CBTHeader } from "@/components/layout/cbt-header";
import { ExamToolbar } from "@/components/layout/exam-toolbar";
import { TestNavFooter } from "@/components/layout/test-nav-footer";
import { EHRTabs } from "@/components/ehr/ehr-tabs";
import { ClinicalHighlight } from "@/components/question-types/clinical-highlight";
import { MatrixQuestion } from "@/components/question-types/matrix-question";
import { DragPriority } from "@/components/question-types/drag-priority";
import { ClozeDropdown } from "@/components/question-types/cloze-dropdown";
import { MultipleResponse } from "@/components/question-types/multiple-response";
import { CalculatorModal } from "@/components/layout/calculator-modal";
import { NotesModal } from "@/components/layout/notes-modal";
import { gradeExam } from "@/lib/engine/scoring-engine";
import { recordExamAttempt } from "@/lib/engine/fsrs-scheduler";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle, HelpCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ExamClientProps {
  caseStudy: ClinicalCase;
}

export function ExamClient({ caseStudy }: ExamClientProps) {
  const router = useRouter();

  // Navigation and test progress state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, unknown>>({});
  const [flaggedIndices, setFlaggedIndices] = useState<number[]>([]);
  const [startTime] = useState<number>(() => Date.now());
  const [isPaused, setIsPaused] = useState(false);

  // Modals & Tools
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isHighlightToolActive, setIsHighlightToolActive] = useState(false);
  const [isStrikethroughActive, setIsStrikethroughActive] = useState(false);

  const currentQuestion: CaseQuestion = caseStudy.questions[currentQuestionIndex];

  // Helper to get answered question indices
  const getAnsweredIndices = (): number[] => {
    return caseStudy.questions
      .map((q, idx) => {
        const val = answers[q.id];
        if (!val) return -1;
        if (Array.isArray(val) && val.length > 0) return idx;
        if (typeof val === "object" && Object.keys(val).length > 0) return idx;
        return -1;
      })
      .filter((idx) => idx !== -1);
  };

  const isCurrentFlagged = flaggedIndices.includes(currentQuestionIndex);

  const toggleCurrentFlag = () => {
    setFlaggedIndices((prev) =>
      prev.includes(currentQuestionIndex)
        ? prev.filter((i) => i !== currentQuestionIndex)
        : [...prev, currentQuestionIndex]
    );
  };

  const handleAnswerChange = (questionId: string, val: unknown) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: val,
    }));
  };

  const handleConfirmSubmit = () => {
    const elapsedSeconds = Math.round((Date.now() - startTime) / 1000);
    const examResult = gradeExam(caseStudy, answers, elapsedSeconds);

    // Save to local storage and update FSRS scheduler
    recordExamAttempt(examResult, caseStudy.difficulty);

    // Save recent result for review page
    try {
      sessionStorage.setItem(`exam_review_${caseStudy.id}`, JSON.stringify(examResult));
    } catch (e) {
      console.error(e);
    }

    setIsSubmitModalOpen(false);
    router.push(`/review/${caseStudy.id}`);
  };

  const answeredIndices = getAnsweredIndices();
  const unansweredCount = caseStudy.questions.length - answeredIndices.length;

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-100 font-sans select-none">
      {/* 1. Official CBT Header */}
      <CBTHeader
        caseTitle={caseStudy.title}
        totalTimeMinutes={caseStudy.estimatedMinutes || 45}
        isPaused={isPaused}
        onTogglePause={() => setIsPaused(!isPaused)}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onOpenNotes={() => setIsNotesOpen(true)}
        onTimeExpired={() => setIsSubmitModalOpen(true)}
      />

      {/* 2. CBT Exam Toolbar */}
      <ExamToolbar
        isHighlightActive={isHighlightToolActive}
        onToggleHighlight={() => setIsHighlightToolActive(!isHighlightToolActive)}
        isStrikethroughActive={isStrikethroughActive}
        onToggleStrikethrough={() => setIsStrikethroughActive(!isStrikethroughActive)}
      />

      {/* 3. Main Split View: Left (EHR Exhibit) & Right (Question Engine) */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden bg-slate-200">
        {/* Left Side: 4-Tab EHR */}
        <div className="lg:col-span-6 h-full overflow-hidden flex flex-col bg-white border-r border-slate-300">
          <EHRTabs ehr={caseStudy.ehr} />
        </div>

        {/* Right Side: Step-by-Step Question Engine */}
        <div className="lg:col-span-6 h-full overflow-y-auto flex flex-col bg-slate-50 p-4 sm:p-6 border-l border-slate-200">
          <div className="max-w-3xl mx-auto w-full space-y-4 flex-1">
            {/* Question Step Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-300">
              <div className="flex items-center space-x-2">
                <Badge variant="cbt" className="bg-slate-900 text-slate-100">
                  STEP {currentQuestion.stepNumber} OF 6
                </Badge>
                <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                  {currentQuestion.title}
                </span>
              </div>
              <div className="text-xs font-mono font-semibold text-slate-500">
                Item ID: {currentQuestion.id}
              </div>
            </div>

            {/* Question Prompt */}
            <div className="bg-white p-4 rounded-xl border border-slate-300 shadow-xs space-y-2">
              <div className="flex items-start space-x-2">
                <HelpCircle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                <h2 className="text-sm sm:text-base font-bold text-slate-950 leading-snug">
                  {currentQuestion.prompt}
                </h2>
              </div>
            </div>

            {/* Question Dynamic Interactive Body */}
            <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-300 shadow-xs">
              {currentQuestion.type === "highlight" && (
                <ClinicalHighlight
                  question={currentQuestion}
                  value={(answers[currentQuestion.id] as string[]) || []}
                  onChange={(val) => handleAnswerChange(currentQuestion.id, val)}
                />
              )}

              {currentQuestion.type === "matrix" && (
                <MatrixQuestion
                  question={currentQuestion}
                  value={(answers[currentQuestion.id] as Record<string, string>) || {}}
                  onChange={(val) => handleAnswerChange(currentQuestion.id, val)}
                />
              )}

              {currentQuestion.type === "drag_priority" && (
                <DragPriority
                  question={currentQuestion}
                  value={(answers[currentQuestion.id] as string[]) || []}
                  onChange={(val) => handleAnswerChange(currentQuestion.id, val)}
                />
              )}

              {currentQuestion.type === "cloze_dropdown" && (
                <ClozeDropdown
                  question={currentQuestion}
                  value={(answers[currentQuestion.id] as { dropdown1?: string; dropdown2?: string }) || {}}
                  onChange={(val) => handleAnswerChange(currentQuestion.id, val)}
                />
              )}

              {currentQuestion.type === "multiple_response" && (
                <MultipleResponse
                  question={currentQuestion}
                  value={(answers[currentQuestion.id] as string[]) || []}
                  onChange={(val) => handleAnswerChange(currentQuestion.id, val)}
                />
              )}

              {currentQuestion.type === "evaluate_matrix" && (
                <MatrixQuestion
                  question={currentQuestion}
                  value={(answers[currentQuestion.id] as Record<string, string>) || {}}
                  onChange={(val) => handleAnswerChange(currentQuestion.id, val)}
                />
              )}
            </div>
          </div>
        </div>
      </main>

      {/* 4. CBT Bottom Navigation Footer */}
      <TestNavFooter
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={caseStudy.questions.length}
        isFlagged={isCurrentFlagged}
        onToggleFlag={toggleCurrentFlag}
        onSelectQuestion={(idx) => setCurrentQuestionIndex(idx)}
        onPrevious={() =>
          setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))
        }
        onNext={() =>
          setCurrentQuestionIndex((prev) =>
            Math.min(caseStudy.questions.length - 1, prev + 1)
          )
        }
        onSubmit={() => setIsSubmitModalOpen(true)}
        answeredQuestionIndices={answeredIndices}
      />

      {/* Submit Confirmation Modal */}
      <Dialog open={isSubmitModalOpen} onOpenChange={setIsSubmitModalOpen}>
        <DialogContent className="max-w-md font-sans">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-600" />
              Submit Clinical Examination?
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-600">
              Once submitted, your answers will be graded against official NCSBN standards and cannot be modified.
            </DialogDescription>
          </DialogHeader>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-600">Total Questions:</span>
              <span className="font-bold text-slate-900 font-mono">
                {caseStudy.questions.length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Answered:</span>
              <span className="font-bold text-emerald-700 font-mono">
                {answeredIndices.length}
              </span>
            </div>
            {unansweredCount > 0 && (
              <div className="flex justify-between text-rose-600 font-semibold">
                <span>Unanswered Items:</span>
                <span className="font-mono">{unansweredCount}</span>
              </div>
            )}
            {flaggedIndices.length > 0 && (
              <div className="flex justify-between text-amber-700 font-semibold">
                <span>Items Flagged for Review:</span>
                <span className="font-mono">{flaggedIndices.length}</span>
              </div>
            )}
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsSubmitModalOpen(false)}
              className="text-xs font-semibold"
            >
              Return to Test
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleConfirmSubmit}
              className="text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              End Exam & View Rationales
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Calculator Modal */}
      <CalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />

      {/* Scratchpad Notes Modal */}
      <NotesModal
        isOpen={isNotesOpen}
        onClose={() => setIsNotesOpen(false)}
      />
    </div>
  );
}
