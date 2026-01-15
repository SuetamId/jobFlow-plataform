'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/presentation/auth';
import { useRecruiter, useJobMutation, JobForm } from '@/presentation/recruiter';
import { CreateJobDTO } from '@/core/recruiter/application/dtos';

export default function NewJobPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const { recruiter, isLoading: recruiterLoading } = useRecruiter();
  const { createJob, isLoading: mutationLoading } = useJobMutation(recruiter?.id ?? null);

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

  const handleSubmit = async (data: CreateJobDTO) => {
    await createJob(data);
  };

  return (
    <>
      <div className="space-y-6 mt-16 max-w-3xl mx-auto">
        <div className="flex items-center gap-4">
          <Link href="/recruiter/jobs" className="text-foreground-secondary hover:text-foreground">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Post New Job</h1>
            <p className="text-foreground-secondary">
              Create a new job listing for your company
            </p>
          </div>
        </div>

        {recruiterLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary" />
          </div>
        ) : recruiter ? (
          <JobForm
            companyId={recruiter.companyId}
            onSubmit={handleSubmit}
            isLoading={mutationLoading}
            mode="create"
          />
        ) : (
          <div className="text-center py-12">
            <p className="text-foreground-secondary">Unable to load recruiter profile</p>
          </div>
        )}
      </div>
    </>
  );
}
