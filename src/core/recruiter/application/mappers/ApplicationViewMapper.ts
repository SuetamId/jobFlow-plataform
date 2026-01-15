import { Application } from '@/core/candidate/domain/entities/Application';
import { Candidate } from '@/core/candidate/domain/entities/Candidate';
import { Job } from '@/core/job/domain/entities/Job';
import { ApplicationStatusTransition } from '../../domain/value-objects/ApplicationStatusTransition';
import { ApplicationViewDTO } from '../dtos/ApplicationViewDTO';

export class ApplicationViewMapper {
  static toDTO(
    application: Application,
    candidate: Candidate,
    job: Job
  ): ApplicationViewDTO {
    return {
      id: application.id,
      candidateId: candidate.id,
      candidateName: candidate.name,
      candidateEmail: candidate.email,
      candidateAvatarUrl: candidate.avatarUrl,
      jobId: job.id,
      jobTitle: job.title,
      status: application.status,
      statusLabel: ApplicationStatusTransition.getStatusLabel(application.status),
      coverLetter: application.coverLetter,
      resumeUrl: application.resumeUrl,
      appliedAt: application.appliedAt.toISOString(),
      updatedAt: application.updatedAt.toISOString(),
      availableActions: ApplicationStatusTransition.getRecruiterActions(application.status),
    };
  }
}
