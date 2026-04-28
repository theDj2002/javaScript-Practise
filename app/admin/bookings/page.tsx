'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EmptyState } from '@/components/shared/empty-state';
import { LoadingSkeleton } from '@/components/shared/loading-skeleton';
import { bookingApi } from '@/services/booking.api';
import type { Booking } from '@/types';

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookingId, setBookingId] = useState('');
  const [newAmount, setNewAmount] = useState('');

  const loadBookings = async () => {
    try {
      const response = await bookingApi.getMyBookings();
      setBookings(response);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadBookings();
  }, []);

  const handleUpdateAmount = async () => {
    if (!bookingId || !newAmount) return;
    await bookingApi.updateBookingAmount(bookingId, Number(newAmount));
    await loadBookings();
  };

  const handleCancel = async (id: string) => {
    await bookingApi.cancelBooking(id, 'Cancelled by admin');
    await loadBookings();
  };

  const handleExtend = async (id: string) => {
    const newEndTime = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString();
    await bookingApi.extendBooking(id, newEndTime, 'Extended by admin');
    await loadBookings();
  };

  return (
    <main className="container-page space-y-4">
      <h1 className="text-2xl font-semibold">Admin Booking Management</h1>

      {loading ? (
        <LoadingSkeleton />
      ) : bookings.length ? (
        <Card className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="p-2">Booking ID</th>
                <th className="p-2">Bike</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Actions</th>
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
                      <Button variant="outline" onClick={() => void handleExtend(booking.id)}>Extend</Button>
                      <Button variant="danger" onClick={() => void handleCancel(booking.id)}>Cancel</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      ) : (
        <EmptyState title="No bookings found" subtitle="No booking data is currently available for admin review." />
      )}

      <Card className="space-y-2">
        <h2 className="font-semibold">Edit booking amount</h2>
        <div className="grid gap-2 md:grid-cols-3">
          <Input placeholder="Booking ID" value={bookingId} onChange={(event) => setBookingId(event.target.value)} />
          <Input placeholder="New amount" type="number" value={newAmount} onChange={(event) => setNewAmount(event.target.value)} />
          <Button onClick={() => void handleUpdateAmount()}>Update Amount</Button>
        </div>
      </Card>
    </main>
  );
}
