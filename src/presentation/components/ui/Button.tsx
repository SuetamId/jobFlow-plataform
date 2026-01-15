import { ButtonHTMLAttributes, forwardRef } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-foreground-inverse shadow-sm hover:bg-primary/90 active:bg-primary/95',
  secondary: 'bg-secondary text-foreground-inverse shadow-sm hover:bg-secondary/90 active:bg-secondary/95',
  outline: 'border border-border bg-transparent text-foreground hover:bg-background-secondary active:bg-background-tertiary',
  ghost: 'text-foreground-secondary bg-transparent hover:text-foreground hover:bg-background-secondary active:bg-background-tertiary',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-sm gap-1.5',
  md: 'h-10 px-4 text-sm gap-2',
  lg: 'h-12 px-6 text-base gap-2.5',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => {
    const baseStyles = `
      inline-flex items-center justify-center 
      font-medium rounded-lg
      transition-all duration-150 ease-out
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2
      disabled:opacity-50 disabled:pointer-events-none
      select-none
    `.replace(/\s+/g, ' ').trim();

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
