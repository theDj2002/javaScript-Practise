import { notFound } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PaymentButton } from '@/components/shared/payment-button';
import { bookings } from '@/hooks/use-mock-data';

export default function BookingDetailsPage({ params }: { params: { id: string } }) {
  const booking = bookings.find((b) => b.id === params.id);
  if (!booking) return notFound();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Booking {booking.id}</h1>
      <Card className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="font-semibold">{booking.bike.name}</p>
          <Badge tone={booking.status === 'COMPLETED' ? 'success' : 'default'}>{booking.status}</Badge>
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
