import { ApplicationStatus } from '@/core/candidate/domain/entities/Application';

type TransitionMap = Record<ApplicationStatus, ApplicationStatus[]>;

const VALID_TRANSITIONS: TransitionMap = {
  pending: ['reviewing', 'rejected'],
  reviewing: ['interviewed', 'rejected'],
  interviewed: ['offered', 'rejected'],
  offered: ['rejected'],
  rejected: [],
  withdrawn: [],
};

export class ApplicationStatusTransition {
  static canTransition(from: ApplicationStatus, to: ApplicationStatus): boolean {
    const allowedTransitions = VALID_TRANSITIONS[from];
    return allowedTransitions.includes(to);
  }

  static getValidTransitions(from: ApplicationStatus): ApplicationStatus[] {
    return [...VALID_TRANSITIONS[from]];
  }

  static validateTransition(from: ApplicationStatus, to: ApplicationStatus): void {
    if (!this.canTransition(from, to)) {
      throw new Error(
        `Invalid status transition: cannot change from '${from}' to '${to}'`
      );
    }
  }

  static isTerminalStatus(status: ApplicationStatus): boolean {
    return status === 'rejected' || status === 'withdrawn' || status === 'offered';
  }

  static getStatusLabel(status: ApplicationStatus): string {
    const labels: Record<ApplicationStatus, string> = {
      pending: 'Pending Review',
      reviewing: 'Under Review',
      interviewed: 'Interviewed',
      offered: 'Offer Extended',
      rejected: 'Rejected',
      withdrawn: 'Withdrawn',
    };
    return labels[status];
  }

  static getRecruiterActions(status: ApplicationStatus): Array<{
    targetStatus: ApplicationStatus;
    label: string;
    variant: 'default' | 'destructive' | 'success';
  }> {
    const transitions = this.getValidTransitions(status);
    
    return transitions.map(targetStatus => ({
      targetStatus,
      label: this.getActionLabel(targetStatus),
      variant: this.getActionVariant(targetStatus),
    }));
  }

  private static getActionLabel(status: ApplicationStatus): string {
    const labels: Record<ApplicationStatus, string> = {
      pending: 'Mark as Pending',
      reviewing: 'Start Review',
      interviewed: 'Mark as Interviewed',
      offered: 'Extend Offer',
      rejected: 'Reject',
      withdrawn: 'Mark as Withdrawn',
    };
    return labels[status];
  }

  private static getActionVariant(status: ApplicationStatus): 'default' | 'destructive' | 'success' {
    if (status === 'rejected') return 'destructive';
    if (status === 'offered') return 'success';
    return 'default';
  }
}
