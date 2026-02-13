import React from 'react';
import { cn } from '@/lib/utils';

export function Badge({ children, tone = 'default' }: { children: React.ReactNode; tone?: 'default' | 'success' | 'warning' | 'danger' }) {
  return (
    <span
      className={cn(
        'rounded-full px-3 py-1 text-xs font-semibold',
        tone === 'default' && 'bg-muted text-foreground',
        tone === 'success' && 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
        tone === 'warning' && 'bg-amber-500/20 text-amber-600 dark:text-amber-400',
        tone === 'danger' && 'bg-rose-500/20 text-rose-600 dark:text-rose-400'
      )}
    >
      {children}
    </span>
  );
}
