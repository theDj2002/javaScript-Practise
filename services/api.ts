import axios from 'axios';
import type { Booking } from '@/types';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080/api/v1',
  timeout: 10000
});

export const authApi = {
  login: (payload: { phone: string; password?: string; otp?: string }) => api.post('/auth/login', payload)
};

export const bikesApi = {
  list: () => api.get('/bikes'),
  details: (id: string) => api.get(`/bikes/${id}`)
};

export const bookingsApi = {
  create: (payload: { bikeId: string; from: string; to: string }) => api.post('/bookings/bookBike', payload),
  myBookings: () => api.get('/bookings/my'),
  details: (id: string) => api.get(`/bookings/${id}`),
  updateAmount: (id: string, amount: number) => api.put(`/admin/bookings/${id}/amount`, { amount }),
  cancel: (id: string, reason: string) => api.put(`/admin/bookings/${id}/cancel`, { reason }),
  extend: (id: string, newEndTime: string, reason: string) => api.put(`/admin/bookings/${id}/extend`, { newEndTime, reason })
};

export const paymentsApi = {
  createAdvanceOrder: (bookingId: string) => api.post(`/payments/advance/${bookingId}`)
};

export const invoicesApi = {
  download: (bookingId: string) => api.get(`/invoices/${bookingId}`, { responseType: 'blob' })
};

export const mockBookings: Booking[] = [];
