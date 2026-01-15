export type SeniorityLevel = 'junior' | 'mid' | 'senior' | 'lead' | 'executive';

const SENIORITY_LABELS: Record<SeniorityLevel, string> = {
  junior: 'Junior',
  mid: 'Mid-Level',
  senior: 'Senior',
  lead: 'Lead',
  executive: 'Executive',
};

const SENIORITY_ORDER: Record<SeniorityLevel, number> = {
  junior: 1,
  mid: 2,
  senior: 3,
  lead: 4,
  executive: 5,
};

export class Seniority {
  private readonly level: SeniorityLevel;

  private constructor(level: SeniorityLevel) {
    this.level = level;
  }

  static create(level: SeniorityLevel): Seniority {
    const validLevels: SeniorityLevel[] = ['junior', 'mid', 'senior', 'lead', 'executive'];
    if (!validLevels.includes(level)) {
      throw new Error(`Invalid seniority level: ${level}`);
    }
    return new Seniority(level);
  }

  static fromCode(code: string | null): Seniority | null {
    if (!code) return null;

    const mapping: Record<string, SeniorityLevel> = {
      EN: 'junior',
      JR: 'junior',
      MI: 'mid',
      SE: 'senior',
      EX: 'executive',
      LE: 'lead',
    };

    const level = mapping[code.toUpperCase()];
    if (!level) return null;

    return new Seniority(level);
  }

  static fromString(value: string): Seniority {
    const normalized = value.toLowerCase().trim();
    const mapping: Record<string, SeniorityLevel> = {
      junior: 'junior',
      jr: 'junior',
      entry: 'junior',
      'entry-level': 'junior',
      mid: 'mid',
      middle: 'mid',
      'mid-level': 'mid',
      intermediate: 'mid',
      senior: 'senior',
      sr: 'senior',
      lead: 'lead',
      principal: 'lead',
      staff: 'lead',
      executive: 'executive',
      director: 'executive',
      vp: 'executive',
      'c-level': 'executive',
    };

    const level = mapping[normalized];
    if (!level) {
      throw new Error(`Invalid seniority level: ${value}`);
    }
    return new Seniority(level);
  }

  static junior(): Seniority {
    return new Seniority('junior');
  }

  static mid(): Seniority {
    return new Seniority('mid');
  }

  static senior(): Seniority {
    return new Seniority('senior');
  }

  static lead(): Seniority {
    return new Seniority('lead');
  }

  static executive(): Seniority {
    return new Seniority('executive');
  }

  getLevel(): SeniorityLevel {
    return this.level;
  }

  getLabel(): string {
    return SENIORITY_LABELS[this.level];
  }

  getOrder(): number {
    return SENIORITY_ORDER[this.level];
  }

  toCode(): string {
    const codeMapping: Record<SeniorityLevel, string> = {
      junior: 'JR',
      mid: 'MI',
      senior: 'SE',
      lead: 'LE',
      executive: 'EX',
    };
    return codeMapping[this.level];
  }

  isJunior(): boolean {
    return this.level === 'junior';
  }

  isMid(): boolean {
    return this.level === 'mid';
  }

  isSenior(): boolean {
    return this.level === 'senior';
  }

  isLead(): boolean {
    return this.level === 'lead';
  }

  isExecutive(): boolean {
    return this.level === 'executive';
  }

  isHigherThan(other: Seniority): boolean {
    return this.getOrder() > other.getOrder();
  }

  isLowerThan(other: Seniority): boolean {
    return this.getOrder() < other.getOrder();
  }

  equals(other: Seniority): boolean {
    return this.level === other.level;
  }

  toString(): string {
    return this.level;
  }
}
