import { CandidateRepository } from '../../domain/repositories/CandidateRepository';
import { ApplicationRepository } from '../../domain/repositories/ApplicationRepository';
import { ApplicationDTO } from '../dtos/ApplicationDTO';
import { mapApplicationToDTO } from '../mappers/ApplicationMapper';

export interface WithdrawApplicationUseCaseDeps {
  candidateRepository: CandidateRepository;
  applicationRepository: ApplicationRepository;
}

export class WithdrawApplicationError extends Error {
  constructor(message: string, public readonly code: string) {
    super(message);
    this.name = 'WithdrawApplicationError';
  }
}

export async function withdrawApplicationUseCase(
  deps: WithdrawApplicationUseCaseDeps,
  candidateId: string,
  applicationId: string
): Promise<ApplicationDTO> {
  const candidate = await deps.candidateRepository.findById(candidateId);
  if (!candidate) {
    throw new WithdrawApplicationError('Candidate not found', 'CANDIDATE_NOT_FOUND');
  }

  const application = await deps.applicationRepository.findById(applicationId);
  if (!application) {
    throw new WithdrawApplicationError('Application not found', 'APPLICATION_NOT_FOUND');
  }

  if (!application.belongsToCandidate(candidateId)) {
    throw new WithdrawApplicationError('Not authorized to withdraw this application', 'NOT_AUTHORIZED');
  }

  if (!application.canBeWithdrawn()) {
    throw new WithdrawApplicationError('Application cannot be withdrawn', 'CANNOT_WITHDRAW');
  }

  const updatedApplication = await deps.applicationRepository.withdraw(applicationId);
  return mapApplicationToDTO(updatedApplication);
}
