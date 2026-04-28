import Link from 'next/link';
import { CalendarClock, ReceiptText, Shield } from 'lucide-react';

const links = [
  { href: '/dashboard/bookings', label: 'Bookings', icon: CalendarClock },
  { href: '/dashboard/bookings/bk-101', label: 'Booking Detail', icon: ReceiptText },
  { href: '/admin/bookings', label: 'Admin Bookings', icon: Shield }
];

export function Sidebar() {
  return (
    <aside className="w-full rounded-2xl border border-border bg-card p-4 shadow-soft lg:w-72">
      <p className="mb-4 text-xs uppercase tracking-widest text-muted-foreground">Dashboard</p>
      <div className="space-y-2">
        {links.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href} className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-muted/60">
            <Icon className="h-4 w-4" /> {label}
          </Link>
        ))}
      </div>
    </aside>
  );
}
