import * as React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'danger';
}

export function Button({ className, variant = 'default', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-medium transition hover:translate-y-[-1px] disabled:cursor-not-allowed disabled:opacity-50',
        variant === 'default' && 'bg-primary text-primary-foreground shadow-soft',
        variant === 'outline' && 'border border-border bg-card text-foreground',
        variant === 'ghost' && 'bg-transparent text-foreground hover:bg-muted/50',
        variant === 'danger' && 'bg-danger text-white shadow-soft',
        className
      )}
      {...props}
    />
  );
}
