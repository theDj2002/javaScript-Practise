import type { Bike, Booking } from '@/types';

export const bikes: Bike[] = [
  {
    id: 'b1',
    name: 'Yamaha MT-15',
    category: 'Sport',
    city: 'Bangalore',
    pricePerHour: 249,
    rating: 4.8,
    available: true,
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=80',
    description: 'Agile city sport bike with premium handling and punchy acceleration.'
  },
  {
    id: 'b2',
    name: 'Ather 450X',
    category: 'Electric',
    city: 'Pune',
    pricePerHour: 199,
    rating: 4.7,
    available: true,
    image: 'https://images.unsplash.com/photo-1629285483773-6d0f137c296a?auto=format&fit=crop&w=900&q=80',
    description: 'Connected electric scooter for eco-friendly commute and instant torque.'
  },
  {
    id: 'b3',
    name: 'Royal Enfield Classic 350',
    category: 'Cruiser',
    city: 'Goa',
    pricePerHour: 349,
    rating: 4.9,
    available: false,
    image: 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&w=900&q=80',
    description: 'Timeless touring icon made for weekend rides and long stretches.'
  }
];

export const bookings: Booking[] = [
  {
    id: 'bk-101',
    bike: bikes[0],
    from: '2026-03-01T10:00:00Z',
    to: '2026-03-01T17:00:00Z',
    totalAmount: 1743,
    status: 'UPCOMING',
    paymentStatus: 'PENDING'
  },
  {
    id: 'bk-103',
    bike: bikes[1],
    from: '2026-02-10T08:00:00Z',
    to: '2026-02-10T13:00:00Z',
    totalAmount: 995,
    status: 'COMPLETED',
    paymentStatus: 'PAID'
  }
];
