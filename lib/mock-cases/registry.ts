import { ClinicalCase } from "./index";
import { sampleSepsisCase } from "./sample-sepsis-case";
import { samplePediatricCase } from "./sample-pediatric-case";
import { sampleCardiacCase } from "./sample-cardiac-case";

export const ALL_CASES: ClinicalCase[] = [
  sampleSepsisCase,
  samplePediatricCase,
  sampleCardiacCase,
];

export function getAllCases(): ClinicalCase[] {
  return ALL_CASES;
}

export function getCaseById(id: string): ClinicalCase | undefined {
  return ALL_CASES.find((c) => c.id === id || c.slug === id);
}
