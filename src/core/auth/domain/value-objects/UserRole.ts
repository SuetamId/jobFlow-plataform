export type UserRoleType = 'candidate' | 'recruiter';

export class UserRole {
  private readonly value: UserRoleType;

  private constructor(value: UserRoleType) {
    this.value = value;
  }

  static create(role: UserRoleType): UserRole {
    if (!this.isValid(role)) {
      throw new Error(`Invalid user role: ${role}`);
    }
    return new UserRole(role);
  }

  static candidate(): UserRole {
    return new UserRole('candidate');
  }

  static recruiter(): UserRole {
    return new UserRole('recruiter');
  }

  static isValid(role: string): role is UserRoleType {
    return role === 'candidate' || role === 'recruiter';
  }

  get type(): UserRoleType {
    return this.value;
  }

  isCandidate(): boolean {
    return this.value === 'candidate';
  }

  isRecruiter(): boolean {
    return this.value === 'recruiter';
  }

  equals(other: UserRole): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }

  getLabel(): string {
    const labels: Record<UserRoleType, string> = {
      candidate: 'Candidate',
      recruiter: 'Recruiter',
    };
    return labels[this.value];
  }
}
