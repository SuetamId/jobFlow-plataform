'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, Button } from '@/presentation/components/ui';
import { useAuth } from '@/presentation/auth';
import { 
  useRecruiter, 
  useJobApplications, 
  useApplicationStatus,
  ApplicationCard 
} from '@/presentation/recruiter';
import { ApplicationStatus } from '@/core/candidate/domain/entities/Application';

export default function JobApplicationsPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const jobId = params.id as string;
  
  const [page, setPage] = useState(1);
  const { recruiter, isLoading: recruiterLoading } = useRecruiter();
  const { 
    applications, 
    pagination, 
    isLoading: applicationsLoading,
    refresh 
  } = useJobApplications({ 
    recruiterId: recruiter?.id ?? null,
    jobId,
    page,
    perPage: 10 
  });
  
  const { changeStatus, isLoading: statusLoading } = useApplicationStatus(recruiter?.id ?? null);

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

  const isLoading = recruiterLoading || applicationsLoading;

  const handleStatusChange = async (applicationId: string, newStatus: ApplicationStatus) => {
    await changeStatus(applicationId, newStatus);
    refresh();
  };

  return (
    <>
      <div className="space-y-6 mt-16">
        <div className="flex items-center gap-4">
          <Link href="/recruiter/jobs" className="text-foreground-secondary hover:text-foreground">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground">Job Applications</h1>
            <p className="text-foreground-secondary">
              Review and manage applicants for this position
            </p>
          </div>
          <Link href={`/recruiter/jobs/${jobId}/edit`}>
            <Button variant="outline">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Job
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary" />
          </div>
        ) : applications.length === 0 ? (
          <Card>
            <div className="text-center py-12">
              <svg className="w-12 h-12 mx-auto text-foreground-secondary mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3 className="text-lg font-semibold text-foreground mb-2">No applications yet</h3>
              <p className="text-foreground-secondary">
                Applications will appear here as candidates apply
              </p>
            </div>
          </Card>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <p className="text-sm text-foreground-secondary">
                {pagination?.totalCount ?? 0} total applications
              </p>
              <Button variant="ghost" size="sm" onClick={refresh} disabled={statusLoading}>
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </Button>
            </div>

            <div className="grid gap-4">
              {applications.map(application => (
                <ApplicationCard 
                  key={application.id} 
                  application={application}
                  onStatusChange={handleStatusChange}
                  isUpdating={statusLoading}
                />
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
