import { RecruiterRepository } from '@/core/recruiter/domain/repositories/RecruiterRepository';
import { Recruiter } from '@/core/recruiter/domain/entities/Recruiter';
import { mockRecruiters, MockRecruiterData } from './mockData';

const SIMULATED_DELAY = 300;

function mapToRecruiterEntity(data: MockRecruiterData): Recruiter {
  return Recruiter.create({
    id: data.id,
    userId: data.user_id,
    companyId: data.company_id,
    email: data.email,
    name: data.name,
    avatarUrl: data.avatar_url,
    phone: data.phone,
    title: data.title,
    linkedinUrl: data.linkedin_url,
    createdAt: new Date(data.created_at),
    updatedAt: new Date(data.updated_at),
  });
}

export class MockRecruiterRepository implements RecruiterRepository {
  async findById(id: string): Promise<Recruiter | null> {
    await this.simulateDelay();
    
    const recruiterData = mockRecruiters.find(r => r.id === id);
    if (!recruiterData) {
      return null;
    }
    
    return mapToRecruiterEntity(recruiterData);
  }

  async findByUserId(userId: string): Promise<Recruiter | null> {
    await this.simulateDelay();
    
    const recruiterData = mockRecruiters.find(r => r.user_id === userId);
    if (!recruiterData) {
      return null;
    }
    
    return mapToRecruiterEntity(recruiterData);
  }

  async findByCompanyId(companyId: string): Promise<Recruiter[]> {
    await this.simulateDelay();
    
    const companyRecruiters = mockRecruiters.filter(r => r.company_id === companyId);
    return companyRecruiters.map(mapToRecruiterEntity);
  }

  private simulateDelay(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));
  }
}

export const mockRecruiterRepository = new MockRecruiterRepository();
