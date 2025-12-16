export type Industry =
  | "IT & Technology"
  | "Finance & Banking"
  | "HR & Recruitment"
  | "Operations & Logistics"
  | "Healthcare"
  | "Construction"
  | "Marketing"
  | "Education"
  | "Retail & E-commerce"
  | "Manufacturing"
  | "Legal & Compliance"
  | "Sales"
  | "Customer Service"
  | "Product Management"
  | "Real Estate"
  | "Hospitality & Tourism"
  | "Media & Entertainment"
  | "Government & Public Sector"
  | string;

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

export const INDUSTRIES: string[] = [
  "IT & Technology",
  "Finance & Banking",
  "HR & Recruitment",
  "Operations & Logistics",
  "Healthcare",
  "Construction",
  "Marketing",
  "Education",
  "Retail & E-commerce",
  "Manufacturing",
  "Legal & Compliance",
  "Sales",
  "Customer Service",
  "Product Management",
  "Real Estate",
  "Hospitality & Tourism",
  "Media & Entertainment",
  "Government & Public Sector"
];

export const CATEGORIES: string[] = [
  "Process Improvement",
  "Risk Management",
  "Technical Issue",
  "Communication",
  "Compliance",
  "Security",
  "Quality Assurance",
  "Project Management",
  "Budget & Finance",
  "Training & Development",
  "Vendor Management",
  "Change Management",
  "Crisis Response",
  "Documentation",
  "Performance Optimization"
];
