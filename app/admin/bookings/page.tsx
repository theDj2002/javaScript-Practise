import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { bookings } from '@/hooks/use-mock-data';

export default function AdminBookingsPage() {
  return (
    <main className="container-page space-y-4">
      <h1 className="text-2xl font-semibold">Admin Booking Management</h1>
      <Card className="overflow-x-auto">
        <table className="w-full min-w-[700px] text-left text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="p-2">Booking ID</th><th className="p-2">Bike</th><th className="p-2">Amount</th><th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-b border-border/70">
                <td className="p-2">{booking.id}</td>
                <td className="p-2">{booking.bike.name}</td>
                <td className="p-2">₹{booking.totalAmount}</td>
                <td className="p-2">
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline">Extend</Button>
                    <Button variant="danger">Cancel</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <Card className="space-y-2">
        <h2 className="font-semibold">Edit booking amount</h2>
        <div className="grid gap-2 md:grid-cols-3">
          <Input placeholder="Booking ID" />
          <Input placeholder="New amount" type="number" />
          <Button>Update Amount</Button>
        </div>
      </Card>
    </main>
  );
}
