'use client';

import { useState } from 'react';
import { ApplicationViewDTO } from '@/core/recruiter/application/dtos';
import { ApplicationStatus } from '@/core/candidate/domain/entities/Application';
import { ApplicationStatusBadge } from './ApplicationStatusBadge';
import { Button } from '@/presentation/components/ui';

interface ApplicationCardProps {
  application: ApplicationViewDTO;
  onStatusChange: (applicationId: string, newStatus: ApplicationStatus) => Promise<void>;
  isUpdating?: boolean;
}

export function ApplicationCard({ 
  application, 
  onStatusChange,
  isUpdating = false 
}: ApplicationCardProps) {
  const [showActions, setShowActions] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const formattedDate = new Date(application.appliedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const handleStatusChange = async (newStatus: ApplicationStatus) => {
    await onStatusChange(application.id, newStatus);
    setShowActions(false);
  };

  return (
    <div className="bg-background border border-border rounded-xl p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          {application.candidateAvatarUrl ? (
            <img 
              src={application.candidateAvatarUrl} 
              alt={application.candidateName}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
              <span className="text-secondary font-semibold">
                {application.candidateName.charAt(0)}
              </span>
            </div>
          )}
          <div>
            <h3 className="font-semibold text-foreground">{application.candidateName}</h3>
            <p className="text-sm text-foreground-secondary">{application.candidateEmail}</p>
          </div>
        </div>
        <ApplicationStatusBadge status={application.status} label={application.statusLabel} />
      </div>

      <div className="mt-4 flex items-center gap-4 text-sm text-foreground-secondary">
        <span>Applied: {formattedDate}</span>
        {application.resumeUrl && (
          <a 
            href={application.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary hover:underline flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Resume
          </a>
        )}
      </div>

      {application.coverLetter && (
        <div className="mt-4">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-sm text-secondary hover:underline flex items-center gap-1"
          >
            <svg 
              className={`w-4 h-4 transition-transform ${expanded ? 'rotate-90' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
            {expanded ? 'Hide' : 'Show'} Cover Letter
          </button>
          {expanded && (
            <div className="mt-2 p-3 bg-background-secondary rounded-lg text-sm text-foreground-secondary">
              {application.coverLetter}
            </div>
          )}
        </div>
      )}

      {application.availableActions.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          {!showActions ? (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowActions(true)}
              disabled={isUpdating}
            >
              Update Status
            </Button>
          ) : (
            <div className="flex flex-wrap gap-2">
              {application.availableActions.map(action => (
                <Button
                  key={action.targetStatus}
                  variant="outline"
                  size="sm"
                  onClick={() => handleStatusChange(action.targetStatus)}
                  disabled={isUpdating}
                  className={action.variant === 'destructive' ? 'border-red-300 text-red-600 hover:bg-red-50' : ''}
                >
                  {action.label}
                </Button>
              ))}
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowActions(false)}
                disabled={isUpdating}
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
