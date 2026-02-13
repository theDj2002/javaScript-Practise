'use client';

import { useEffect, useState } from 'react';
import { BookingCard } from '@/components/bookings/booking-card';
import { EmptyState } from '@/components/shared/empty-state';
import { LoadingSkeleton } from '@/components/shared/loading-skeleton';
import { bookingApi } from '@/services/booking.api';
import type { Booking } from '@/types';

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const response = await bookingApi.getMyBookings();
        setBookings(response);
      } finally {
        setLoading(false);
      }
    };

    void loadBookings();
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">My Bookings</h1>

      {loading ? (
        <>
          <LoadingSkeleton />
          <LoadingSkeleton />
        </>
      ) : bookings.length ? (
        bookings.map((booking) => <BookingCard key={booking.id} booking={booking} />)
      ) : (
        <EmptyState title="No bookings yet" subtitle="Book your first bike to see activity." />
      )}
    </div>
  );
}
