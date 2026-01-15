'use client';

import { useState, useCallback } from 'react';
import { applyToJobUseCase } from '@/core/candidate/application/use-cases';
import { ApplicationDTO } from '@/core/candidate/application/dtos';
import { 
  mockCandidateRepository, 
  mockApplicationRepository 
} from '@/infrastructure/candidate';
import { mockJobRepository } from '@/infrastructure/job';

interface UseApplyToJobResult {
  application: ApplicationDTO | null;
  isLoading: boolean;
  error: string | null;
  apply: (coverLetter?: string, resumeUrl?: string) => Promise<void>;
  reset: () => void;
}

const deps = {
  candidateRepository: mockCandidateRepository,
  applicationRepository: mockApplicationRepository,
  jobRepository: mockJobRepository,
};

export function useApplyToJob(candidateId: string, jobId: string): UseApplyToJobResult {
  const [application, setApplication] = useState<ApplicationDTO | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apply = useCallback(async (coverLetter?: string, resumeUrl?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await applyToJobUseCase(deps, {
        candidateId,
        jobId,
        coverLetter,
        resumeUrl,
      });
      setApplication(result);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to apply to job';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [candidateId, jobId]);

  const reset = useCallback(() => {
    setApplication(null);
    setError(null);
  }, []);

  return {
    application,
    isLoading,
    error,
    apply,
    reset,
  };
}
