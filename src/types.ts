export type Industry = 
  | "IT & Technology"
  | "Finance & Banking"
  | "HR & Recruitment"
  | "Operations & Logistics"
  | "Healthcare"
  | "Construction"
  | "Marketing"
  | "Education";

export type Status = "Draft" | "Needs Edit" | "Approved";

export interface PlaybookEntry {
  id: string;
  title: string;
  industry: Industry;
  status: Status;
  dateCreated: number;
  lastUpdated: number;
  
  // Incident / Lesson details
  summary: string; // What Happened
  rootCause: string;
  impact: string;
  category: string;
  
  // AI Generated / Structured content
  recommendation: string; // Recommended Fix
  doList: string[];
  dontList: string[];
  preventionChecklist: string[];
  
  tags: string[];
}

export const INDUSTRIES: Industry[] = [
  "IT & Technology",
  "Finance & Banking",
  "HR & Recruitment",
  "Operations & Logistics",
  "Healthcare",
  "Construction",
  "Marketing",
  "Education"
];
