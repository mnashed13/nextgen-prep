import { notFound } from "next/navigation";
import { getCaseById, getAllCases } from "@/lib/mock-cases/registry";
import { ReviewClient } from "./review-client";

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

export default async function ReviewPage({ params }: PageProps) {
  const resolvedParams = await params;
  const caseStudy = getCaseById(resolvedParams.caseId);

  if (!caseStudy) {
    notFound();
  }

  return <ReviewClient caseStudy={caseStudy} />;
}
