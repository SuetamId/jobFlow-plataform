export interface UserProfileProps {
  id: string;
  email: string;
  name: string;
  avatarUrl: string | null;
  phone: string | null;
  bio: string | null;
  location: string | null;
  linkedinUrl: string | null;
  githubUrl: string | null;
  portfolioUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export class UserProfile {
  private readonly props: UserProfileProps;

  private constructor(props: UserProfileProps) {
    this.props = props;
  }

  static create(props: UserProfileProps): UserProfile {
    return new UserProfile(props);
  }

  get id(): string {
    return this.props.id;
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

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  toJSON(): UserProfileProps {
    return { ...this.props };
  }
}
