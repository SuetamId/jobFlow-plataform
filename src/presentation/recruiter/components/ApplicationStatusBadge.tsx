'use client';

import { ApplicationStatus } from '@/core/candidate/domain/entities/Application';

interface ApplicationStatusBadgeProps {
  status: ApplicationStatus;
  label: string;
}

const STATUS_STYLES: Record<ApplicationStatus, string> = {
  pending: 'bg-amber-100 text-amber-800 border-amber-200',
  reviewing: 'bg-blue-100 text-blue-800 border-blue-200',
  interviewed: 'bg-purple-100 text-purple-800 border-purple-200',
  offered: 'bg-green-100 text-green-800 border-green-200',
  rejected: 'bg-red-100 text-red-800 border-red-200',
  withdrawn: 'bg-gray-100 text-gray-800 border-gray-200',
};

export function ApplicationStatusBadge({ status, label }: ApplicationStatusBadgeProps) {
  return (
    <span className={`
      inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
      ${STATUS_STYLES[status]}
    `}>
      {label}
    </span>
  );
}
