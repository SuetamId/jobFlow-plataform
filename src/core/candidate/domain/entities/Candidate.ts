export interface CandidateProps {
  id: string;
  userId: string;
  email: string;
  name: string;
  avatarUrl: string | null;
  phone: string | null;
  bio: string | null;
  location: string | null;
  linkedinUrl: string | null;
  githubUrl: string | null;
  portfolioUrl: string | null;
  resumeUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export class Candidate {
  private readonly props: CandidateProps;
  private readonly appliedJobIds: Set<string>;
  private readonly savedJobIds: Set<string>;

  private constructor(props: CandidateProps, appliedJobIds: string[] = [], savedJobIds: string[] = []) {
    this.props = props;
    this.appliedJobIds = new Set(appliedJobIds);
    this.savedJobIds = new Set(savedJobIds);
  }

  static create(props: CandidateProps, appliedJobIds: string[] = [], savedJobIds: string[] = []): Candidate {
    if (!props.email || props.email.trim().length === 0) {
      throw new Error('Candidate email is required');
    }
    if (!props.name || props.name.trim().length === 0) {
      throw new Error('Candidate name is required');
    }
    return new Candidate(props, appliedJobIds, savedJobIds);
  }

  get id(): string {
    return this.props.id;
  }

  get userId(): string {
    return this.props.userId;
  }

  get email(): string {
    return this.props.email;
  }

  get name(): string {
    return this.props.name;
  }

  get avatarUrl(): string | null {
    return this.props.avatarUrl;
  }

  get phone(): string | null {
    return this.props.phone;
  }

  get bio(): string | null {
    return this.props.bio;
  }

  get location(): string | null {
    return this.props.location;
  }

  get linkedinUrl(): string | null {
    return this.props.linkedinUrl;
  }

  get githubUrl(): string | null {
    return this.props.githubUrl;
  }

  get portfolioUrl(): string | null {
    return this.props.portfolioUrl;
  }

  get resumeUrl(): string | null {
    return this.props.resumeUrl;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  hasAppliedToJob(jobId: string): boolean {
    return this.appliedJobIds.has(jobId);
  }

  canApplyToJob(jobId: string): boolean {
    return !this.hasAppliedToJob(jobId);
  }

  hasSavedJob(jobId: string): boolean {
    return this.savedJobIds.has(jobId);
  }

  canSaveJob(jobId: string): boolean {
    return !this.hasSavedJob(jobId);
  }

  getAppliedJobIds(): string[] {
    return Array.from(this.appliedJobIds);
  }

  getSavedJobIds(): string[] {
    return Array.from(this.savedJobIds);
  }

  getApplicationCount(): number {
    return this.appliedJobIds.size;
  }

  getSavedJobCount(): number {
    return this.savedJobIds.size;
  }

  hasCompleteProfile(): boolean {
    return !!(
      this.props.bio &&
      this.props.location &&
      (this.props.linkedinUrl || this.props.githubUrl || this.props.portfolioUrl)
    );
  }

  toJSON(): CandidateProps {
    return { ...this.props };
  }
}
