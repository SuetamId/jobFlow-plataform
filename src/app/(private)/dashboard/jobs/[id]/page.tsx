'use client';

import { use } from 'react';
import Link from 'next/link';
import { Button, Skeleton } from '@/presentation/components/ui';
import { JobDetails, useJobDetails } from '@/presentation/job';

interface PrivateJobDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default function PrivateJobDetailsPage({ params }: PrivateJobDetailsPageProps) {
  const { id } = use(params);
  const { job, isLoading, error } = useJobDetails(id);

  if (isLoading) {
    return (
      <div className="max-w-4xl">
        <Skeleton className="h-8 w-32 mb-6" />
        <Skeleton className="h-64 mb-6" />
        <Skeleton className="h-48 mb-6" />
        <Skeleton className="h-32" />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="max-w-4xl text-center py-12">
        <h1 className="text-2xl font-bold text-foreground mb-4">Job not found</h1>
        <p className="text-foreground-secondary mb-6">
          The job you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Link href="/dashboard/jobs">
          <Button variant="secondary">Browse All Jobs</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <Link 
        href="/dashboard/jobs" 
        className="inline-flex items-center gap-2 text-foreground-secondary hover:text-secondary mb-6"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Jobs
      </Link>
      
      <JobDetails job={job} />
    </div>
  );
}
