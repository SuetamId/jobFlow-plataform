export interface JobTypeProps {
  id: number;
  name: string;
}

export class JobType {
  private readonly props: JobTypeProps;

  private constructor(props: JobTypeProps) {
    this.props = props;
  }

  static create(props: JobTypeProps): JobType {
    return new JobType(props);
  }

  get id(): number {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  toJSON(): JobTypeProps {
    return { ...this.props };
  }
}
