export interface CandidateDTO {
  id: string;
  userId: string;
  email: string;
  name: string;
  avatarUrl: string | null;
  phone: string | null;
  bio: string | null;
  location: string | null;
  linkedinUrl: string | null;
  githubUrl: string | null;
  portfolioUrl: string | null;
  resumeUrl: string | null;
  hasCompleteProfile: boolean;
  applicationCount: number;
  savedJobCount: number;
  createdAt: string;
  updatedAt: string;
}
