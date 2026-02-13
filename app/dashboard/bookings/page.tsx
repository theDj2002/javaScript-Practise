import { BookingCard } from '@/components/bookings/booking-card';
import { EmptyState } from '@/components/shared/empty-state';
import { bookings } from '@/hooks/use-mock-data';

export default function MyBookingsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">My Bookings</h1>
      {bookings.length ? bookings.map((booking) => <BookingCard key={booking.id} booking={booking} />) : <EmptyState title="No bookings yet" subtitle="Book your first bike to see activity." />}
    </div>
  );
}
