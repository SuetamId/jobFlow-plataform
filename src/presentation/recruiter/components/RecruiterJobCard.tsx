'use client';

import Link from 'next/link';
import { JobSummaryDTO } from '@/core/recruiter/application/dtos';

interface RecruiterJobCardProps {
  job: JobSummaryDTO;
}

export function RecruiterJobCard({ job }: RecruiterJobCardProps) {
  const formattedDate = new Date(job.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="bg-background border border-border rounded-xl p-5 hover:border-secondary/50 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          {job.companyLogo ? (
            <img 
              src={job.companyLogo} 
              alt={job.companyName}
              className="w-10 h-10 rounded-lg object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
              <span className="text-secondary font-semibold text-sm">
                {job.companyName.charAt(0)}
              </span>
            </div>
          )}
          <div>
            <h3 className="font-semibold text-foreground">{job.title}</h3>
            <p className="text-sm text-foreground-secondary">{job.companyName}</p>
          </div>
        </div>
        <span className={`
          px-2.5 py-0.5 rounded-full text-xs font-medium
          ${job.isActive 
            ? 'bg-green-100 text-green-800' 
            : 'bg-gray-100 text-gray-800'
          }
        `}>
          {job.isActive ? 'Active' : 'Expired'}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-foreground-secondary">
        <span className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {job.location}
        </span>
        <span className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          {job.workModel}
        </span>
        {job.seniority && (
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            {job.seniority}
          </span>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-foreground">
            {job.salary}
          </span>
          <span className="flex items-center gap-1 text-sm text-foreground-secondary">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {job.applicationCount} applicants
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Link 
            href={`/recruiter/jobs/${job.id}`}
            className="px-3 py-1.5 text-sm font-medium text-secondary hover:text-secondary/80 transition-colors"
          >
            View
          </Link>
          <Link 
            href={`/recruiter/jobs/${job.id}/edit`}
            className="px-3 py-1.5 text-sm font-medium bg-secondary/10 text-secondary rounded-lg hover:bg-secondary/20 transition-colors"
          >
            Edit
          </Link>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-xs text-foreground-secondary">
        <span>Published: {formattedDate}</span>
        {job.expiresAt && (
          <span>Expires: {new Date(job.expiresAt).toLocaleDateString()}</span>
        )}
      </div>
    </div>
  );
}
