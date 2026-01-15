export { applyToJobUseCase, ApplicationError } from './ApplyToJobUseCase';
export type { ApplyToJobUseCaseDeps } from './ApplyToJobUseCase';

export { saveJobUseCase, unsaveJobUseCase, isJobSavedUseCase, SaveJobError } from './SaveJobUseCase';
export type { SaveJobUseCaseDeps } from './SaveJobUseCase';

export { getCandidateApplicationsUseCase } from './GetCandidateApplicationsUseCase';
export type { GetCandidateApplicationsUseCaseDeps, GetCandidateApplicationsInput } from './GetCandidateApplicationsUseCase';

export { getCandidateSavedJobsUseCase } from './GetCandidateSavedJobsUseCase';
export type { GetCandidateSavedJobsUseCaseDeps, GetCandidateSavedJobsInput } from './GetCandidateSavedJobsUseCase';

export { getCandidateDashboardUseCase, DashboardError } from './GetCandidateDashboardUseCase';
export type { GetCandidateDashboardUseCaseDeps } from './GetCandidateDashboardUseCase';

export { withdrawApplicationUseCase, WithdrawApplicationError } from './WithdrawApplicationUseCase';
export type { WithdrawApplicationUseCaseDeps } from './WithdrawApplicationUseCase';
