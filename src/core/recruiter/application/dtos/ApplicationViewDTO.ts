import { ApplicationStatus } from '@/core/candidate/domain/entities/Application';

export interface ApplicationViewDTO {
  id: string;
  candidateId: string;
  candidateName: string;
  candidateEmail: string;
  candidateAvatarUrl: string | null;
  jobId: string;
  jobTitle: string;
  status: ApplicationStatus;
  statusLabel: string;
  coverLetter: string | null;
  resumeUrl: string | null;
  appliedAt: string;
  updatedAt: string;
  availableActions: Array<{
    targetStatus: ApplicationStatus;
    label: string;
    variant: 'default' | 'destructive' | 'success';
  }>;
}

export interface ChangeApplicationStatusDTO {
  applicationId: string;
  newStatus: ApplicationStatus;
}
