import Link from 'next/link';
import { Bike, UserCircle2 } from 'lucide-react';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import { Button } from '@/components/ui/button';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Bike className="h-5 w-5 text-primary" />
          RideFlow
        </Link>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          <Link href="/bikes">Bikes</Link>
          <Link href="/dashboard/bookings">My Bookings</Link>
          <Link href="/admin/bookings">Admin</Link>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" className="gap-2"><UserCircle2 className="h-4 w-4" /> Profile</Button>
        </div>
      </div>
    </header>
  );
}
