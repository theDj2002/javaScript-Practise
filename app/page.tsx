import Link from 'next/link';
import { BikeCard } from '@/components/bikes/bike-card';
import { Button } from '@/components/ui/button';
import { bikes } from '@/hooks/use-mock-data';

export default function HomePage() {
  return (
    <main className="container-page space-y-16">
      <section className="grid gap-8 rounded-3xl border border-border bg-card p-8 shadow-soft md:grid-cols-2">
        <div className="space-y-5">
          <p className="text-sm uppercase tracking-widest text-primary">Premium Urban Mobility</p>
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">Rent bikes in minutes. Ride your city in style.</h1>
          <p className="text-muted-foreground">Browse curated two-wheelers, pick your slot, pay instantly, and download invoices seamlessly.</p>
          <div className="flex gap-3">
            <Link href="/bikes"><Button>Explore Bikes</Button></Link>
            <Link href="/login"><Button variant="outline">Login</Button></Link>
          </div>
        </div>
        <div className="rounded-2xl bg-muted p-8 text-sm">
          <p className="font-semibold">How it works</p>
          <ol className="mt-4 space-y-2 text-muted-foreground">
            <li>1. Pick bike & schedule</li>
            <li>2. Complete secure payment</li>
            <li>3. Ride and track booking status</li>
          </ol>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Featured Bikes</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {bikes.map((bike) => <BikeCard key={bike.id} bike={bike} />)}
        </div>
      </section>
    </main>
  );
}
