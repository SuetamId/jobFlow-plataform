import { UserRole, UserRoleType } from '../value-objects/UserRole';

export interface UserProps {
  id: string;
  email: string;
  name: string;
  role: UserRoleType;
  avatarUrl: string | null;
  createdAt: Date;
}

export class User {
  private readonly props: UserProps;
  private readonly userRole: UserRole;

  private constructor(props: UserProps) {
    this.props = props;
    this.userRole = UserRole.create(props.role);
  }

  static create(props: UserProps): User {
    return new User(props);
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

  get role(): UserRole {
    return this.userRole;
  }

  get avatarUrl(): string | null {
    return this.props.avatarUrl;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  isCandidate(): boolean {
    return this.userRole.isCandidate();
  }

  isRecruiter(): boolean {
    return this.userRole.isRecruiter();
  }

  hasRole(role: UserRoleType): boolean {
    return this.userRole.type === role;
  }

  toJSON(): UserProps {
    return { ...this.props };
  }
}
