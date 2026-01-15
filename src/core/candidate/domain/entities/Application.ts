export type ApplicationStatus = 'pending' | 'reviewing' | 'interviewed' | 'offered' | 'rejected' | 'withdrawn';

export interface ApplicationProps {
  id: string;
  candidateId: string;
  jobId: string;
  status: ApplicationStatus;
  coverLetter: string | null;
  resumeUrl: string | null;
  appliedAt: Date;
  updatedAt: Date;
}

const STATUS_LABELS: Record<ApplicationStatus, string> = {
  pending: 'Pending',
  reviewing: 'Under Review',
  interviewed: 'Interviewed',
  offered: 'Offer Made',
  rejected: 'Rejected',
  withdrawn: 'Withdrawn',
};

const TERMINAL_STATUSES: ApplicationStatus[] = ['offered', 'rejected', 'withdrawn'];

export class Application {
  private readonly props: ApplicationProps;

  private constructor(props: ApplicationProps) {
    this.props = props;
  }

  static create(props: ApplicationProps): Application {
    if (!props.candidateId || props.candidateId.trim().length === 0) {
      throw new Error('Candidate ID is required');
    }
    if (!props.jobId || props.jobId.trim().length === 0) {
      throw new Error('Job ID is required');
    }
    return new Application(props);
  }

  static createNew(
    id: string,
    candidateId: string,
    jobId: string,
    coverLetter: string | null = null,
    resumeUrl: string | null = null
  ): Application {
    const now = new Date();
    return Application.create({
      id,
      candidateId,
      jobId,
      status: 'pending',
      coverLetter,
      resumeUrl,
      appliedAt: now,
      updatedAt: now,
    });
  }

  get id(): string {
    return this.props.id;
  }

  get candidateId(): string {
    return this.props.candidateId;
  }

  get jobId(): string {
    return this.props.jobId;
  }

  get status(): ApplicationStatus {
    return this.props.status;
  }

  get coverLetter(): string | null {
    return this.props.coverLetter;
  }

  get resumeUrl(): string | null {
    return this.props.resumeUrl;
  }

  get appliedAt(): Date {
    return this.props.appliedAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  getStatusLabel(): string {
    return STATUS_LABELS[this.props.status];
  }

  isPending(): boolean {
    return this.props.status === 'pending';
  }

  isReviewing(): boolean {
    return this.props.status === 'reviewing';
  }

  isInterviewed(): boolean {
    return this.props.status === 'interviewed';
  }

  isOffered(): boolean {
    return this.props.status === 'offered';
  }

  isRejected(): boolean {
    return this.props.status === 'rejected';
  }

  isWithdrawn(): boolean {
    return this.props.status === 'withdrawn';
  }

  isTerminal(): boolean {
    return TERMINAL_STATUSES.includes(this.props.status);
  }

  isActive(): boolean {
    return !this.isTerminal();
  }

  canBeWithdrawn(): boolean {
    return this.isActive();
  }

  belongsToCandidate(candidateId: string): boolean {
    return this.props.candidateId === candidateId;
  }

  isForJob(jobId: string): boolean {
    return this.props.jobId === jobId;
  }

  toJSON(): ApplicationProps {
    return { ...this.props };
  }
}
