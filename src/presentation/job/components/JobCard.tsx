'use client';

import Link from 'next/link';
import { JobDTO } from '@/core/job/application/dtos';
import { Card, Badge } from '@/presentation/components/ui';

interface JobCardProps {
  job: JobDTO;
  href?: string;
}

export function JobCard({ job, href }: JobCardProps) {
  const content = (
    <Card interactive className="h-full">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-lg bg-background-secondary flex items-center justify-center overflow-hidden flex-shrink-0 border border-border">
          {job.company.logo ? (
            <img
              src={job.company.logo}
              alt={job.company.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-lg font-bold text-foreground-secondary">
              {job.company.name.charAt(0)}
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground leading-snug line-clamp-1">{job.title}</h3>
          <p className="text-sm text-foreground-secondary mt-0.5">{job.company.name}</p>
        </div>
      </div>

      <div className="mt-4 space-y-1.5">
        <div className="flex items-center gap-2 text-sm text-foreground-secondary">
          <svg className="w-4 h-4 text-foreground-tertiary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="truncate">{job.location}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-foreground-secondary">
          <svg className="w-4 h-4 text-foreground-tertiary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-medium text-foreground">{job.salaryFormatted}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border flex flex-wrap gap-1.5">
        {job.contractTypeLabels.map((label, index) => (
          <Badge key={index} variant="secondary">
            {label}
          </Badge>
        ))}
        {job.hasRemote && (
          <Badge variant="success">Remote</Badge>
        )}
        {job.workModelLabel && (
          <Badge variant="outline">{job.workModelLabel}</Badge>
        )}
        {job.seniorityLabel !== 'Not specified' && (
          <Badge variant="default">{job.seniorityLabel}</Badge>
        )}
        {job.isFeatured && (
          <Badge variant="primary">Featured</Badge>
        )}
      </div>
    </Card>
  );

  if (href) {
    return <Link href={href} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 rounded-xl">{content}</Link>;
  }

  return content;
}
