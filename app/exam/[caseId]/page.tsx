import { notFound } from "next/navigation";
import { getCaseById, getAllCases } from "@/lib/mock-cases/registry";
import { ExamClient } from "./exam-client";

interface PageProps {
  params: Promise<{
    caseId: string;
  }>;
}

export async function generateStaticParams() {
  const cases = getAllCases();
  return cases.map((c) => ({
    caseId: c.id,
  }));
}

export default async function ExamPage({ params }: PageProps) {
  const resolvedParams = await params;
  const caseStudy = getCaseById(resolvedParams.caseId);

  if (!caseStudy) {
    notFound();
  }

  return <ExamClient caseStudy={caseStudy} />;
}
