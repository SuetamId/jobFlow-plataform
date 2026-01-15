import { CandidateRepository } from '../../domain/repositories/CandidateRepository';
import { ApplicationRepository } from '../../domain/repositories/ApplicationRepository';
import { SavedJobRepository } from '../../domain/repositories/SavedJobRepository';
import { DashboardSummaryDTO } from '../dtos/DashboardDTO';
import { mapApplicationsToDTO } from '../mappers/ApplicationMapper';
import { mapSavedJobsToDTO } from '../mappers/SavedJobMapper';

const RECENT_ITEMS_LIMIT = 5;
const PROFILE_FIELDS_COUNT = 7;

export interface GetCandidateDashboardUseCaseDeps {
  candidateRepository: CandidateRepository;
  applicationRepository: ApplicationRepository;
  savedJobRepository: SavedJobRepository;
}

export class DashboardError extends Error {
  constructor(message: string, public readonly code: string) {
    super(message);
    this.name = 'DashboardError';
  }
}

function calculateProfileCompleteness(candidate: {
  bio: string | null;
  location: string | null;
  phone: string | null;
  linkedinUrl: string | null;
  githubUrl: string | null;
  portfolioUrl: string | null;
  resumeUrl: string | null;
}): number {
  let filledFields = 0;
  if (candidate.bio) filledFields++;
  if (candidate.location) filledFields++;
  if (candidate.phone) filledFields++;
  if (candidate.linkedinUrl) filledFields++;
  if (candidate.githubUrl) filledFields++;
  if (candidate.portfolioUrl) filledFields++;
  if (candidate.resumeUrl) filledFields++;
  
  return Math.round((filledFields / PROFILE_FIELDS_COUNT) * 100);
}

export async function getCandidateDashboardUseCase(
  deps: GetCandidateDashboardUseCaseDeps,
  candidateId: string
): Promise<DashboardSummaryDTO> {
  const candidate = await deps.candidateRepository.findById(candidateId);
  if (!candidate) {
    throw new DashboardError('Candidate not found', 'CANDIDATE_NOT_FOUND');
  }

  const [applicationsResult, savedJobsResult] = await Promise.all([
    deps.applicationRepository.findByCandidateId(candidateId, { page: 1, perPage: RECENT_ITEMS_LIMIT }),
    deps.savedJobRepository.findByCandidateId(candidateId, { page: 1, perPage: RECENT_ITEMS_LIMIT }),
  ]);

  const activeApplications = applicationsResult.items.filter(app => app.isActive());

  return {
    totalApplications: applicationsResult.totalCount,
    activeApplications: activeApplications.length,
    savedJobs: savedJobsResult.totalCount,
    profileCompleteness: calculateProfileCompleteness(candidate.toJSON()),
    recentApplications: mapApplicationsToDTO(applicationsResult.items),
    recentSavedJobs: mapSavedJobsToDTO(savedJobsResult.items),
  };
}
