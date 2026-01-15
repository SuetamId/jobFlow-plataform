import { Recruiter } from '../entities/Recruiter';

export interface RecruiterRepository {
  findById(id: string): Promise<Recruiter | null>;
  findByUserId(userId: string): Promise<Recruiter | null>;
  findByCompanyId(companyId: string): Promise<Recruiter[]>;
}
