export interface CompanyProps {
  id: string;
  name: string;
  logo: string | null;
  description: string | null;
  websiteUrl: string | null;
  linkedinUrl: string | null;
  twitterHandle: string | null;
  githubUrl: string | null;
  industry: string | null;
  size: string | null;
  foundedYear: number | null;
}

export class Company {
  private readonly props: CompanyProps;

  private constructor(props: CompanyProps) {
    this.props = props;
  }

  static create(props: CompanyProps): Company {
    if (!props.name || props.name.trim().length === 0) {
      throw new Error('Company name is required');
    }
    return new Company(props);
  }

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get logo(): string | null {
    return this.props.logo;
  }

  get description(): string | null {
    return this.props.description;
  }

  get websiteUrl(): string | null {
    return this.props.websiteUrl;
  }

  get linkedinUrl(): string | null {
    return this.props.linkedinUrl;
  }

  get twitterHandle(): string | null {
    return this.props.twitterHandle;
  }

  get githubUrl(): string | null {
    return this.props.githubUrl;
  }

  get industry(): string | null {
    return this.props.industry;
  }

  get size(): string | null {
    return this.props.size;
  }

  get foundedYear(): number | null {
    return this.props.foundedYear;
  }

  hasLogo(): boolean {
    return this.props.logo !== null;
  }

  hasSocialLinks(): boolean {
    return !!(this.props.linkedinUrl || this.props.twitterHandle || this.props.githubUrl);
  }

  toJSON(): CompanyProps {
    return { ...this.props };
  }
}
