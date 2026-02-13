export type BikeCategory = 'Cruiser' | 'Sport' | 'Electric' | 'City';

export interface Bike {
  id: string;
  name: string;
  category: BikeCategory;
  city: string;
  pricePerHour: number;
  rating: number;
  available: boolean;
  image: string;
  description: string;
}

export type BookingStatus = 'UPCOMING' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
export type PaymentStatus = 'PENDING' | 'PAID' | 'REFUNDED';

export interface Booking {
  id: string;
  bike: Bike;
  from: string;
  to: string;
  totalAmount: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
}
