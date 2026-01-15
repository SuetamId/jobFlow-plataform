'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/presentation/auth';
import { useRecruiter, useJobMutation, JobForm } from '@/presentation/recruiter';
import { UpdateJobDTO, CreateJobDTO } from '@/core/recruiter/application/dtos';
import { getJobDetailUseCase } from '@/core/recruiter/application/use-cases';
import { mockJobRepository } from '@/infrastructure/job';
import { mockApplicationRepository } from '@/infrastructure/candidate';
import { mockRecruiterRepository } from '@/infrastructure/recruiter';

export default function EditJobPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const jobId = params.id as string;
  
  const { recruiter, isLoading: recruiterLoading } = useRecruiter();
  const { updateJob, isLoading: mutationLoading } = useJobMutation(recruiter?.id ?? null);
  const [jobData, setJobData] = useState<Partial<CreateJobDTO> & { id: string } | null>(null);
  const [jobLoading, setJobLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && user?.role !== 'recruiter') {
      router.replace('/dashboard');
    }
  }, [user, authLoading, router]);

  if (authLoading || user?.role !== 'recruiter') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary" />
      </div>
    );
  }

  const loadJob = useCallback(async () => {
    if (!recruiter) return;
    
    setJobLoading(true);
    setError(null);
    
    try {
      const job = await getJobDetailUseCase(
        {
          jobRepository: mockJobRepository,
          applicationRepository: mockApplicationRepository,
          recruiterRepository: mockRecruiterRepository,
        },
        {
          recruiterId: recruiter.id,
          jobId,
        }
      );
      
      setJobData({
        id: job.id,
        title: job.title,
        companyId: recruiter.companyId,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load job');
    } finally {
      setJobLoading(false);
    }
  }, [recruiter, jobId]);

  useEffect(() => {
    if (recruiter) {
      loadJob();
    }
  }, [recruiter, loadJob]);

  const handleSubmit = async (data: CreateJobDTO | UpdateJobDTO) => {
    await updateJob(data as UpdateJobDTO);
  };

  const isLoading = recruiterLoading || jobLoading;

  return (
    <>
      <div className="space-y-6 mt-16 max-w-3xl mx-auto">
        <div className="flex items-center gap-4">
          <Link href={`/recruiter/jobs/${jobId}`} className="text-foreground-secondary hover:text-foreground">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Edit Job</h1>
            <p className="text-foreground-secondary">
              Update your job listing
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary" />
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600">{error}</p>
          </div>
        ) : recruiter && jobData ? (
          <JobForm
            companyId={recruiter.companyId}
            initialData={jobData}
            onSubmit={handleSubmit}
            isLoading={mutationLoading}
            mode="edit"
          />
        ) : (
          <div className="text-center py-12">
            <p className="text-foreground-secondary">Unable to load job data</p>
          </div>
        )}
      </div>
    </>
  );
}
