export interface LocationProps {
  city: string | null;
  state: string | null;
  country: string | null;
  isRemote: boolean;
}

export class Location {
  private readonly props: LocationProps;

  private constructor(props: LocationProps) {
    this.props = Object.freeze({ ...props });
  }

  static create(props: LocationProps): Location {
    return new Location(props);
  }

  static fromRaw(raw: string, isRemote: boolean): Location {
    const parts = raw.split(',').map(p => p.trim());
    
    if (raw.toLowerCase() === 'remote') {
      return new Location({
        city: null,
        state: null,
        country: null,
        isRemote: true,
      });
    }

    return new Location({
      city: parts[0] || null,
      state: parts[1] || null,
      country: parts[2] || parts[1] || null,
      isRemote,
    });
  }

  static remote(): Location {
    return new Location({
      city: null,
      state: null,
      country: null,
      isRemote: true,
    });
  }

  get city(): string | null {
    return this.props.city;
  }

  get state(): string | null {
    return this.props.state;
  }

  get country(): string | null {
    return this.props.country;
  }

  get isRemote(): boolean {
    return this.props.isRemote;
  }

  get hasRemote(): boolean {
    return this.props.isRemote;
  }

  get raw(): string {
    return this.format();
  }

  isRemoteOnly(): boolean {
    return this.props.isRemote && !this.props.city && !this.props.state && !this.props.country;
  }

  hasPhysicalLocation(): boolean {
    return !!(this.props.city || this.props.state || this.props.country);
  }

  format(): string {
    if (this.isRemoteOnly()) return 'Remote';

    const parts: string[] = [];
    if (this.props.city) parts.push(this.props.city);
    if (this.props.state) parts.push(this.props.state);
    if (this.props.country && this.props.country !== this.props.state) {
      parts.push(this.props.country);
    }

    const locationString = parts.join(', ');

    if (this.props.isRemote && locationString) {
      return `${locationString} (Remote available)`;
    }

    return locationString || 'Location not specified';
  }

  matchesSearch(searchTerm: string): boolean {
    const term = searchTerm.toLowerCase();
    return (
      (this.props.city?.toLowerCase().includes(term) ?? false) ||
      (this.props.state?.toLowerCase().includes(term) ?? false) ||
      (this.props.country?.toLowerCase().includes(term) ?? false)
    );
  }

  equals(other: Location): boolean {
    return (
      this.props.city === other.props.city &&
      this.props.state === other.props.state &&
      this.props.country === other.props.country &&
      this.props.isRemote === other.props.isRemote
    );
  }

  toJSON(): LocationProps {
    return { ...this.props };
  }
}
