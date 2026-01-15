export interface CompanyDTO {
  id: string;
  name: string;
  logo: string | null;
  websiteUrl: string | null;
  linkedinUrl: string | null;
  twitterHandle: string | null;
  githubUrl: string | null;
}

export interface JobDTO {
  id: string;
  externalId: string;
  company: CompanyDTO;
  title: string;
  location: string;
  city: string | null;
  state: string | null;
  country: string | null;
  hasRemote: boolean;
  workModel: string;
  workModelLabel: string;
  contractTypes: string[];
  contractTypeLabels: string[];
  publishedAt: string;
  expiresAt: string | null;
  isExpired: boolean;
  isActive: boolean;
  description: string;
  applicationUrl: string;
  seniority: string | null;
  seniorityLabel: string;
  salaryMin: number | null;
  salaryMax: number | null;
  salaryCurrency: string | null;
  salaryFormatted: string;
  isFeatured: boolean;
}

export interface JobListDTO {
  items: JobDTO[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
