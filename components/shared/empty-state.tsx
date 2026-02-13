import { Inbox } from 'lucide-react';

export function EmptyState({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-border p-8 text-center">
      <Inbox className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
      <p className="font-semibold">{title}</p>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
    </div>
  );
}
