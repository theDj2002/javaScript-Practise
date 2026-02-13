import { api } from '@/services/api';
import type { Booking } from '@/types';

interface BookingBikeApiResponse {
  id?: string | number;
  bikeId?: string | number;
  name?: string;
  model?: string;
  category?: string;
  city?: string;
  pricePerHour?: number;
  image?: string;
  description?: string;
  available?: boolean;
}

interface BookingApiResponse {
  id?: string | number;
  bookingId?: string | number;
  bike?: BookingBikeApiResponse;
  bikeId?: string | number;
  bikeName?: string;
  from?: string;
  startTime?: string;
  to?: string;
  endTime?: string;
  totalAmount?: number;
  amount?: number;
  status?: Booking['status'];
  paymentStatus?: Booking['paymentStatus'];
}

const extractList = (payload: BookingApiResponse[] | { data?: BookingApiResponse[] } | { content?: BookingApiResponse[] }): BookingApiResponse[] => {
  if (Array.isArray(payload)) return payload;
  if ('data' in payload && Array.isArray(payload.data)) return payload.data;
  if ('content' in payload && Array.isArray(payload.content)) return payload.content;
  return [];
};

const mapBooking = (booking: BookingApiResponse): Booking => ({
  id: String(booking.id ?? booking.bookingId ?? ''),
  bike: {
    id: String(booking.bike?.id ?? booking.bike?.bikeId ?? booking.bikeId ?? ''),
    name: booking.bike?.name ?? booking.bike?.model ?? booking.bikeName ?? 'Bike',
    category: (booking.bike?.category ?? 'City') as Booking['bike']['category'],
    city: booking.bike?.city ?? 'Unknown City',
    pricePerHour: Number(booking.bike?.pricePerHour ?? 0),
    rating: 4.5,
    available: Boolean(booking.bike?.available ?? true),
    image:
      booking.bike?.image ??
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=80',
    description: booking.bike?.description ?? 'No description available.'
  },
  from: booking.from ?? booking.startTime ?? new Date().toISOString(),
  to: booking.to ?? booking.endTime ?? new Date().toISOString(),
  totalAmount: Number(booking.totalAmount ?? booking.amount ?? 0),
  status: booking.status ?? 'UPCOMING',
  paymentStatus: booking.paymentStatus ?? 'PENDING'
});

export const bookingApi = {
  async getMyBookings(): Promise<Booking[]> {
    const response = await api.get<BookingApiResponse[] | { data?: BookingApiResponse[] } | { content?: BookingApiResponse[] }>('/bookings/my');
    return extractList(response.data).map(mapBooking);
  },

  async getBookingById(id: string): Promise<Booking> {
    const response = await api.get<BookingApiResponse>(`/bookings/${id}`);
    return mapBooking(response.data);
  },

  bookBike(payload: { bikeId: string; from: string; to: string }) {
    return api.post('/bookings/bookBike', payload);
  },

  cancelBooking(id: string, reason: string) {
    return api.put(`/admin/bookings/${id}/cancel`, { reason });
  },

  extendBooking(id: string, newEndTime: string, reason: string) {
    return api.put(`/admin/bookings/${id}/extend`, { newEndTime, reason });
  },

  updateBookingAmount(id: string, amount: number) {
    return api.put(`/admin/bookings/${id}/amount`, { amount });
  }
};
