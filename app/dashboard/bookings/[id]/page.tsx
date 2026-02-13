'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PaymentButton } from '@/components/shared/payment-button';
import { EmptyState } from '@/components/shared/empty-state';
import { LoadingSkeleton } from '@/components/shared/loading-skeleton';
import { bookingApi } from '@/services/booking.api';
import type { Booking } from '@/types';

export default function BookingDetailsPage() {
  const params = useParams<{ id: string }>();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bookingId = params?.id;
    if (!bookingId) return;

    const loadBooking = async () => {
      try {
        const response = await bookingApi.getBookingById(bookingId);
        setBooking(response);
      } finally {
        setLoading(false);
      }
    };

    void loadBooking();
  }, [params?.id]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (!booking) {
    return <EmptyState title="Booking not found" subtitle="Please check the booking ID and try again." />;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Booking {booking.id}</h1>
      <Card className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="font-semibold">{booking.bike.name}</p>
          <Badge tone={booking.status === 'COMPLETED' ? 'success' : booking.status === 'CANCELLED' ? 'danger' : 'default'}>{booking.status}</Badge>
        </div>
        <div className="space-y-1 text-sm text-muted-foreground">
          <p>Booked: {new Date(booking.from).toLocaleString()}</p>
          <p>End: {new Date(booking.to).toLocaleString()}</p>
          <p>Total: ₹{booking.totalAmount}</p>
        </div>
        <div className="rounded-xl bg-muted p-4 text-sm">
          Timeline: Booked → Pickup → Ride Started → Returned → Invoice Generated.
        </div>
        <div className="flex flex-wrap gap-2">
          <PaymentButton />
          <Button variant="outline">Download Invoice</Button>
        </div>
      </Card>
    </div>
  );
}
