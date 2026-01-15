export type Currency = 'USD' | 'EUR' | 'GBP' | 'BRL' | 'CAD';

export interface SalaryRangeProps {
  min: number | null;
  max: number | null;
  currency: Currency | null;
}

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  BRL: 'R$',
  CAD: 'C$',
};

export class SalaryRange {
  private readonly props: SalaryRangeProps;

  private constructor(props: SalaryRangeProps) {
    this.props = Object.freeze({ ...props });
  }

  static create(min: number | null, max: number | null, currency: Currency | null): SalaryRange {
    if (min !== null && max !== null && min > max) {
      throw new Error('Minimum salary cannot be greater than maximum salary');
    }
    if (min !== null && min < 0) {
      throw new Error('Salary cannot be negative');
    }
    if (max !== null && max < 0) {
      throw new Error('Salary cannot be negative');
    }
    return new SalaryRange({ min, max, currency });
  }

  static empty(): SalaryRange {
    return new SalaryRange({ min: null, max: null, currency: null });
  }

  get min(): number | null {
    return this.props.min;
  }

  get max(): number | null {
    return this.props.max;
  }

  get currency(): Currency | null {
    return this.props.currency;
  }

  isSpecified(): boolean {
    return this.props.min !== null || this.props.max !== null;
  }

  getCurrencySymbol(): string {
    if (!this.props.currency) return '';
    return CURRENCY_SYMBOLS[this.props.currency] || this.props.currency;
  }

  contains(amount: number): boolean {
    if (!this.isSpecified()) return true;
    const min = this.props.min ?? 0;
    const max = this.props.max ?? Infinity;
    return amount >= min && amount <= max;
  }

  format(): string {
    if (!this.isSpecified()) return 'Not specified';

    const symbol = this.getCurrencySymbol();
    const formatNumber = (n: number) => n.toLocaleString();

    if (this.props.min && this.props.max) {
      return `${symbol}${formatNumber(this.props.min)} - ${symbol}${formatNumber(this.props.max)}`;
    }

    if (this.props.min) {
      return `From ${symbol}${formatNumber(this.props.min)}`;
    }

    if (this.props.max) {
      return `Up to ${symbol}${formatNumber(this.props.max)}`;
    }

    return 'Not specified';
  }

  equals(other: SalaryRange): boolean {
    return (
      this.props.min === other.props.min &&
      this.props.max === other.props.max &&
      this.props.currency === other.props.currency
    );
  }

  toJSON(): SalaryRangeProps {
    return { ...this.props };
  }
}
