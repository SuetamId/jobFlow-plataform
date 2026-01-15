import { 
  SavedJobRepository, 
  PaginationParams, 
  PaginatedResult 
} from '@/core/candidate/domain/repositories/SavedJobRepository';
import { SavedJob } from '@/core/candidate/domain/entities/SavedJob';
import { 
  mockSavedJobs, 
  MockSavedJobData,
  generateSavedJobId 
} from './mockData';

const SIMULATED_DELAY = 300;
const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 10;

function mapToSavedJobEntity(data: MockSavedJobData): SavedJob {
  return SavedJob.create({
    id: data.id,
    candidateId: data.candidate_id,
    jobId: data.job_id,
    notes: data.notes,
    savedAt: new Date(data.saved_at),
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

export class MockSavedJobRepository implements SavedJobRepository {
  async findById(id: string): Promise<SavedJob | null> {
    await this.simulateDelay();

    const savedJobData = mockSavedJobs.find(sj => sj.id === id);
    if (!savedJobData) {
      return null;
    }

    return mapToSavedJobEntity(savedJobData);
  }

  async findByCandidateId(
    candidateId: string, 
    pagination?: PaginationParams
  ): Promise<PaginatedResult<SavedJob>> {
    await this.simulateDelay();

    const candidateSavedJobs = mockSavedJobs
      .filter(sj => sj.candidate_id === candidateId)
      .sort((a, b) => new Date(b.saved_at).getTime() - new Date(a.saved_at).getTime());

    const result = paginate(candidateSavedJobs, pagination);
    return {
      ...result,
      items: result.items.map(mapToSavedJobEntity),
    };
  }

  async findByCandidateAndJob(
    candidateId: string, 
    jobId: string
  ): Promise<SavedJob | null> {
    await this.simulateDelay();

    const savedJobData = mockSavedJobs.find(
      sj => sj.candidate_id === candidateId && sj.job_id === jobId
    );

    if (!savedJobData) {
      return null;
    }

    return mapToSavedJobEntity(savedJobData);
  }

  async save(
    candidateId: string, 
    jobId: string, 
    notes?: string | null
  ): Promise<SavedJob> {
    await this.simulateDelay();

    const existingIndex = mockSavedJobs.findIndex(
      sj => sj.candidate_id === candidateId && sj.job_id === jobId
    );

    if (existingIndex !== -1) {
      throw new Error('Job is already saved');
    }

    const newSavedJob: MockSavedJobData = {
      id: generateSavedJobId(),
      candidate_id: candidateId,
      job_id: jobId,
      notes: notes ?? null,
      saved_at: new Date().toISOString(),
    };

    mockSavedJobs.push(newSavedJob);

    return mapToSavedJobEntity(newSavedJob);
  }

  async remove(candidateId: string, jobId: string): Promise<void> {
    await this.simulateDelay();

    const index = mockSavedJobs.findIndex(
      sj => sj.candidate_id === candidateId && sj.job_id === jobId
    );

    if (index === -1) {
      throw new Error('Saved job not found');
    }

    mockSavedJobs.splice(index, 1);
  }

  async updateNotes(id: string, notes: string | null): Promise<SavedJob> {
    await this.simulateDelay();

    const savedJobIndex = mockSavedJobs.findIndex(sj => sj.id === id);
    if (savedJobIndex === -1) {
      throw new Error('Saved job not found');
    }

    mockSavedJobs[savedJobIndex] = {
      ...mockSavedJobs[savedJobIndex],
      notes,
    };

    return mapToSavedJobEntity(mockSavedJobs[savedJobIndex]);
  }

  async countByCandidateId(candidateId: string): Promise<number> {
    await this.simulateDelay();
    return mockSavedJobs.filter(sj => sj.candidate_id === candidateId).length;
  }

  async isSaved(candidateId: string, jobId: string): Promise<boolean> {
    await this.simulateDelay();
    return mockSavedJobs.some(
      sj => sj.candidate_id === candidateId && sj.job_id === jobId
    );
  }

  private simulateDelay(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));
  }
}

export const mockSavedJobRepository = new MockSavedJobRepository();
