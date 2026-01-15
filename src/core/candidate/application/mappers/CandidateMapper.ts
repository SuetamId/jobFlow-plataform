import { Candidate } from '../../domain/entities/Candidate';
import { CandidateDTO } from '../dtos/CandidateDTO';

export function mapCandidateToDTO(candidate: Candidate): CandidateDTO {
  return {
    id: candidate.id,
    userId: candidate.userId,
    email: candidate.email,
    name: candidate.name,
    avatarUrl: candidate.avatarUrl,
    phone: candidate.phone,
    bio: candidate.bio,
    location: candidate.location,
    linkedinUrl: candidate.linkedinUrl,
    githubUrl: candidate.githubUrl,
    portfolioUrl: candidate.portfolioUrl,
    resumeUrl: candidate.resumeUrl,
    hasCompleteProfile: candidate.hasCompleteProfile(),
    applicationCount: candidate.getApplicationCount(),
    savedJobCount: candidate.getSavedJobCount(),
    createdAt: candidate.createdAt.toISOString(),
    updatedAt: candidate.updatedAt.toISOString(),
  };
}
