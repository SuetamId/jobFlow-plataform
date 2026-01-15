import { useState, useCallback } from 'react';
import { ApplicationStatus } from '@/core/candidate/domain/entities/Application';
import { ApplicationViewDTO } from '@/core/recruiter/application/dtos';
import { changeApplicationStatusUseCase } from '@/core/recruiter/application/use-cases';
import { mockJobRepository } from '@/infrastructure/job';
import { mockApplicationRepository, mockCandidateRepository } from '@/infrastructure/candidate';
import { mockRecruiterRepository } from '@/infrastructure/recruiter';

interface UseApplicationStatusResult {
  changeStatus: (applicationId: string, newStatus: ApplicationStatus) => Promise<ApplicationViewDTO>;
  isLoading: boolean;
  error: Error | null;
}

export function useApplicationStatus(recruiterId: string | null): UseApplicationStatusResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const changeStatus = useCallback(async (
    applicationId: string, 
    newStatus: ApplicationStatus
  ): Promise<ApplicationViewDTO> => {
    if (!recruiterId) {
      throw new Error('Recruiter not found');
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await changeApplicationStatusUseCase(
        {
          jobRepository: mockJobRepository,
          applicationRepository: mockApplicationRepository,
          candidateRepository: mockCandidateRepository,
          recruiterRepository: mockRecruiterRepository,
        },
        {
          recruiterId,
          applicationId,
          newStatus,
        }
      );

      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to change status');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [recruiterId]);

  return {
    changeStatus,
    isLoading,
    error,
  };
}
