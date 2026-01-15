import { 
  CandidateRepository, 
  UpdateCandidateData 
} from '@/core/candidate/domain/repositories/CandidateRepository';
import { Candidate } from '@/core/candidate/domain/entities/Candidate';
import { 
  mockCandidates, 
  mockApplications, 
  mockSavedJobs, 
  MockCandidateData 
} from './mockData';

const SIMULATED_DELAY = 300;

function mapToCandidateEntity(data: MockCandidateData): Candidate {
  const appliedJobIds = mockApplications
    .filter(app => app.candidate_id === data.id)
    .map(app => app.job_id);

  const savedJobIds = mockSavedJobs
    .filter(saved => saved.candidate_id === data.id)
    .map(saved => saved.job_id);

  return Candidate.create(
    {
      id: data.id,
      userId: data.user_id,
      email: data.email,
      name: data.name,
      avatarUrl: data.avatar_url,
      phone: data.phone,
      bio: data.bio,
      location: data.location,
      linkedinUrl: data.linkedin_url,
      githubUrl: data.github_url,
      portfolioUrl: data.portfolio_url,
      resumeUrl: data.resume_url,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    },
    appliedJobIds,
    savedJobIds
  );
}

export class MockCandidateRepository implements CandidateRepository {
  async findById(id: string): Promise<Candidate | null> {
    await this.simulateDelay();

    const candidateData = mockCandidates.find(c => c.id === id);
    if (!candidateData) {
      return null;
    }

    return mapToCandidateEntity(candidateData);
  }

  async findByUserId(userId: string): Promise<Candidate | null> {
    await this.simulateDelay();

    const candidateData = mockCandidates.find(c => c.user_id === userId);
    if (!candidateData) {
      return null;
    }

    return mapToCandidateEntity(candidateData);
  }

  async findByEmail(email: string): Promise<Candidate | null> {
    await this.simulateDelay();

    const candidateData = mockCandidates.find(c => c.email === email);
    if (!candidateData) {
      return null;
    }

    return mapToCandidateEntity(candidateData);
  }

  async update(id: string, data: UpdateCandidateData): Promise<Candidate> {
    await this.simulateDelay();

    const candidateIndex = mockCandidates.findIndex(c => c.id === id);
    if (candidateIndex === -1) {
      throw new Error('Candidate not found');
    }

    const existingCandidate = mockCandidates[candidateIndex];
    const updatedCandidate: MockCandidateData = {
      ...existingCandidate,
      name: data.name ?? existingCandidate.name,
      phone: data.phone !== undefined ? data.phone : existingCandidate.phone,
      bio: data.bio !== undefined ? data.bio : existingCandidate.bio,
      location: data.location !== undefined ? data.location : existingCandidate.location,
      linkedin_url: data.linkedinUrl !== undefined ? data.linkedinUrl : existingCandidate.linkedin_url,
      github_url: data.githubUrl !== undefined ? data.githubUrl : existingCandidate.github_url,
      portfolio_url: data.portfolioUrl !== undefined ? data.portfolioUrl : existingCandidate.portfolio_url,
      resume_url: data.resumeUrl !== undefined ? data.resumeUrl : existingCandidate.resume_url,
      updated_at: new Date().toISOString(),
    };

    mockCandidates[candidateIndex] = updatedCandidate;

    return mapToCandidateEntity(updatedCandidate);
  }

  private simulateDelay(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));
  }
}

export const mockCandidateRepository = new MockCandidateRepository();
