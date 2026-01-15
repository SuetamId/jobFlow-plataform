export interface RecruiterProps {
  id: string;
  userId: string;
  companyId: string;
  email: string;
  name: string;
  avatarUrl: string | null;
  phone: string | null;
  title: string | null;
  linkedinUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export class Recruiter {
  private readonly props: RecruiterProps;

  private constructor(props: RecruiterProps) {
    this.props = props;
  }

  static create(props: RecruiterProps): Recruiter {
    if (!props.email || props.email.trim().length === 0) {
      throw new Error('Recruiter email is required');
    }
    if (!props.name || props.name.trim().length === 0) {
      throw new Error('Recruiter name is required');
    }
    if (!props.companyId || props.companyId.trim().length === 0) {
      throw new Error('Company ID is required');
    }
    return new Recruiter(props);
  }

  get id(): string {
    return this.props.id;
  }

  get userId(): string {
    return this.props.userId;
  }

  get companyId(): string {
    return this.props.companyId;
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

  get title(): string | null {
    return this.props.title;
  }

  get linkedinUrl(): string | null {
    return this.props.linkedinUrl;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  belongsToCompany(companyId: string): boolean {
    return this.props.companyId === companyId;
  }

  hasCompleteProfile(): boolean {
    return !!(this.props.title && this.props.phone);
  }

  toJSON(): RecruiterProps {
    return { ...this.props };
  }
}
