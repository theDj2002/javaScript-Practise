import Link from 'next/link';
import type { Booking } from '@/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function BookingCard({ booking }: { booking: Booking }) {
  const tone = booking.status === 'CANCELLED' ? 'danger' : booking.status === 'COMPLETED' ? 'success' : 'default';
  return (
    <Card>
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold">{booking.bike.name}</p>
          <p className="text-sm text-muted-foreground">{new Date(booking.from).toLocaleString()} → {new Date(booking.to).toLocaleString()}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge tone={tone}>{booking.status}</Badge>
          <Badge tone={booking.paymentStatus === 'PAID' ? 'success' : 'warning'}>{booking.paymentStatus}</Badge>
          <Link href={`/dashboard/bookings/${booking.id}`}><Button variant="outline">Details</Button></Link>
        </div>
      </div>
    </Card>
  );
}
