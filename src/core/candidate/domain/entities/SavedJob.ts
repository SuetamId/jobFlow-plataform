export interface SavedJobProps {
  id: string;
  candidateId: string;
  jobId: string;
  savedAt: Date;
  notes: string | null;
}

export class SavedJob {
  private readonly props: SavedJobProps;

  private constructor(props: SavedJobProps) {
    this.props = props;
  }

  static create(props: SavedJobProps): SavedJob {
    if (!props.candidateId || props.candidateId.trim().length === 0) {
      throw new Error('Candidate ID is required');
    }
    if (!props.jobId || props.jobId.trim().length === 0) {
      throw new Error('Job ID is required');
    }
    return new SavedJob(props);
  }

  static createNew(id: string, candidateId: string, jobId: string, notes: string | null = null): SavedJob {
    return SavedJob.create({
      id,
      candidateId,
      jobId,
      savedAt: new Date(),
      notes,
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

  get savedAt(): Date {
    return this.props.savedAt;
  }

  get notes(): string | null {
    return this.props.notes;
  }

  belongsToCandidate(candidateId: string): boolean {
    return this.props.candidateId === candidateId;
  }

  isForJob(jobId: string): boolean {
    return this.props.jobId === jobId;
  }

  hasNotes(): boolean {
    return this.props.notes !== null && this.props.notes.trim().length > 0;
  }

  toJSON(): SavedJobProps {
    return { ...this.props };
  }
}
