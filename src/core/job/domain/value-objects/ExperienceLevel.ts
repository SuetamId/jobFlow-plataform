export type ExperienceLevelCode = 'EN' | 'JR' | 'MI' | 'SE' | 'EX' | null;

const EXPERIENCE_LABELS: Record<string, string> = {
  EN: 'Entry Level',
  JR: 'Junior',
  MI: 'Mid-Level',
  SE: 'Senior',
  EX: 'Executive',
};

export class ExperienceLevel {
  private readonly code: ExperienceLevelCode;

  private constructor(code: ExperienceLevelCode) {
    this.code = code;
  }

  static create(code: ExperienceLevelCode): ExperienceLevel {
    return new ExperienceLevel(code);
  }

  static fromString(value: string | null): ExperienceLevel {
    if (!value) return new ExperienceLevel(null);

    const validCodes: ExperienceLevelCode[] = ['EN', 'JR', 'MI', 'SE', 'EX'];
    const code = validCodes.includes(value as ExperienceLevelCode)
      ? (value as ExperienceLevelCode)
      : null;

    return new ExperienceLevel(code);
  }

  getCode(): ExperienceLevelCode {
    return this.code;
  }

  getLabel(): string {
    if (!this.code) return 'Not specified';
    return EXPERIENCE_LABELS[this.code] || 'Not specified';
  }

  isSpecified(): boolean {
    return this.code !== null;
  }
}
