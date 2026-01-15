import { Candidate } from '../entities/Candidate';

export interface UpdateCandidateData {
  name?: string;
  phone?: string | null;
  bio?: string | null;
  location?: string | null;
  linkedinUrl?: string | null;
  githubUrl?: string | null;
  portfolioUrl?: string | null;
  resumeUrl?: string | null;
}

export interface CandidateRepository {
  findById(id: string): Promise<Candidate | null>;
  findByUserId(userId: string): Promise<Candidate | null>;
  findByEmail(email: string): Promise<Candidate | null>;
  update(id: string, data: UpdateCandidateData): Promise<Candidate>;
}
