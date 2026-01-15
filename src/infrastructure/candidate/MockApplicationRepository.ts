import { 
  ApplicationRepository, 
  PaginationParams, 
  PaginatedResult,
  CreateApplicationData
} from '@/core/candidate/domain/repositories/ApplicationRepository';
import { Application, ApplicationStatus } from '@/core/candidate/domain/entities/Application';
import { 
  mockApplications, 
  MockApplicationData,
  generateApplicationId 
} from './mockData';

const SIMULATED_DELAY = 300;
const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 10;

function mapToApplicationEntity(data: MockApplicationData): Application {
  return Application.create({
    id: data.id,
    candidateId: data.candidate_id,
    jobId: data.job_id,
    status: data.status,
    coverLetter: data.cover_letter,
    resumeUrl: data.resume_url,
    appliedAt: new Date(data.applied_at),
    updatedAt: new Date(data.updated_at),
  });
}

function paginate<T>(
  items: T[], 
  pagination?: PaginationParams
): PaginatedResult<T> {
  const page = pagination?.page ?? DEFAULT_PAGE;
  const perPage = pagination?.perPage ?? DEFAULT_PER_PAGE;
  const totalCount = items.length;
  const totalPages = Math.ceil(totalCount / perPage);
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedItems = items.slice(startIndex, endIndex);

  return {
    items: paginatedItems,
    totalCount,
    currentPage: page,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
}

export class MockApplicationRepository implements ApplicationRepository {
  async findById(id: string): Promise<Application | null> {
    await this.simulateDelay();

    const applicationData = mockApplications.find(app => app.id === id);
    if (!applicationData) {
      return null;
    }

    return mapToApplicationEntity(applicationData);
  }

  async findByCandidateId(
    candidateId: string, 
    pagination?: PaginationParams
  ): Promise<PaginatedResult<Application>> {
    await this.simulateDelay();

    const candidateApplications = mockApplications
      .filter(app => app.candidate_id === candidateId)
      .sort((a, b) => new Date(b.applied_at).getTime() - new Date(a.applied_at).getTime());

    const result = paginate(candidateApplications, pagination);
    return {
      ...result,
      items: result.items.map(mapToApplicationEntity),
    };
  }

  async findByJobId(
    jobId: string, 
    pagination?: PaginationParams
  ): Promise<PaginatedResult<Application>> {
    await this.simulateDelay();

    const jobApplications = mockApplications
      .filter(app => app.job_id === jobId)
      .sort((a, b) => new Date(b.applied_at).getTime() - new Date(a.applied_at).getTime());

    const result = paginate(jobApplications, pagination);
    return {
      ...result,
      items: result.items.map(mapToApplicationEntity),
    };
  }

  async findByCandidateAndJob(
    candidateId: string, 
    jobId: string
  ): Promise<Application | null> {
    await this.simulateDelay();

    const applicationData = mockApplications.find(
      app => app.candidate_id === candidateId && app.job_id === jobId
    );

    if (!applicationData) {
      return null;
    }

    return mapToApplicationEntity(applicationData);
  }

  async create(data: CreateApplicationData): Promise<Application> {
    await this.simulateDelay();

    const now = new Date().toISOString();
    const newApplication: MockApplicationData = {
      id: generateApplicationId(),
      candidate_id: data.candidateId,
      job_id: data.jobId,
      status: 'pending',
      cover_letter: data.coverLetter ?? null,
      resume_url: data.resumeUrl ?? null,
      applied_at: now,
      updated_at: now,
    };

    mockApplications.push(newApplication);

    return mapToApplicationEntity(newApplication);
  }

  async updateStatus(id: string, status: ApplicationStatus): Promise<Application> {
    await this.simulateDelay();

    const applicationIndex = mockApplications.findIndex(app => app.id === id);
    if (applicationIndex === -1) {
      throw new Error('Application not found');
    }

    mockApplications[applicationIndex] = {
      ...mockApplications[applicationIndex],
      status,
      updated_at: new Date().toISOString(),
    };

    return mapToApplicationEntity(mockApplications[applicationIndex]);
  }

  async withdraw(id: string): Promise<Application> {
    return this.updateStatus(id, 'withdrawn');
  }

  async countByCandidateId(candidateId: string): Promise<number> {
    await this.simulateDelay();
    return mockApplications.filter(app => app.candidate_id === candidateId).length;
  }

  async countActiveByJobId(jobId: string): Promise<number> {
    await this.simulateDelay();
    const terminalStatuses: ApplicationStatus[] = ['offered', 'rejected', 'withdrawn'];
    return mockApplications.filter(
      app => app.job_id === jobId && !terminalStatuses.includes(app.status)
    ).length;
  }

  private simulateDelay(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));
  }
}

export const mockApplicationRepository = new MockApplicationRepository();
