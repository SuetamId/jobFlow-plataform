import { Application } from '../../domain/entities/Application';
import { ApplicationDTO, ApplicationListDTO } from '../dtos/ApplicationDTO';
import { PaginatedResult } from '../../domain/repositories/ApplicationRepository';

export function mapApplicationToDTO(application: Application): ApplicationDTO {
  return {
    id: application.id,
    candidateId: application.candidateId,
    jobId: application.jobId,
    status: application.status,
    statusLabel: application.getStatusLabel(),
    coverLetter: application.coverLetter,
    resumeUrl: application.resumeUrl,
    isActive: application.isActive(),
    canBeWithdrawn: application.canBeWithdrawn(),
    appliedAt: application.appliedAt.toISOString(),
    updatedAt: application.updatedAt.toISOString(),
  };
}

export function mapApplicationsToDTO(applications: Application[]): ApplicationDTO[] {
  return applications.map(mapApplicationToDTO);
}

export function mapPaginatedApplicationsToDTO(result: PaginatedResult<Application>): ApplicationListDTO {
  return {
    items: mapApplicationsToDTO(result.items),
    totalCount: result.totalCount,
    currentPage: result.currentPage,
    totalPages: result.totalPages,
    hasNextPage: result.hasNextPage,
    hasPreviousPage: result.hasPreviousPage,
  };
}
