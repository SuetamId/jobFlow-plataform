'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, Button } from '@/presentation/components/ui';
import { useAuth } from '@/presentation/auth';
import { useRecruiter, useCompanyJobs, RecruiterJobCard } from '@/presentation/recruiter';

export default function RecruiterJobsPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [page, setPage] = useState(1);
  const { recruiter, isLoading: recruiterLoading } = useRecruiter();
  const { jobs, pagination, isLoading: jobsLoading, refresh } = useCompanyJobs({ 
    recruiterId: recruiter?.id ?? null,
    page,
    perPage: 10 
  });

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

  const isLoading = recruiterLoading || jobsLoading;

  return (
    <>
      <div className="space-y-6 mt-16">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Job Postings</h1>
            <p className="text-foreground-secondary">
              Manage all your company's job listings
            </p>
          </div>
          <Link href="/recruiter/jobs/new">
            <Button>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Post New Job
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary" />
          </div>
        ) : jobs.length === 0 ? (
          <Card>
            <div className="text-center py-12">
              <svg className="w-12 h-12 mx-auto text-foreground-secondary mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <h3 className="text-lg font-semibold text-foreground mb-2">No job postings yet</h3>
              <p className="text-foreground-secondary mb-6">
                Start attracting talent by posting your first job opening
              </p>
              <Link href="/recruiter/jobs/new">
                <Button>Create Your First Job</Button>
              </Link>
            </div>
          </Card>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <p className="text-sm text-foreground-secondary">
                Showing {jobs.length} of {pagination?.totalCount ?? 0} jobs
              </p>
              <Button variant="ghost" size="sm" onClick={refresh}>
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </Button>
            </div>

            <div className="grid gap-4">
              {jobs.map(job => (
                <RecruiterJobCard key={job.id} job={job} />
              ))}
            </div>

            {pagination && pagination.totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!pagination.hasPreviousPage}
                  onClick={() => setPage(p => p - 1)}
                >
                  Previous
                </Button>
                <span className="text-sm text-foreground-secondary px-4">
                  Page {pagination.currentPage} of {pagination.totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!pagination.hasNextPage}
                  onClick={() => setPage(p => p + 1)}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
