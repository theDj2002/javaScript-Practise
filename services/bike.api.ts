import { api } from '@/services/api';
import type { Bike } from '@/types';

interface BikeApiResponse {
  id?: string | number;
  bikeId?: string | number;
  name?: string;
  model?: string;
  category?: string;
  type?: string;
  city?: string;
  location?: string;
  pricePerHour?: number;
  hourlyRate?: number;
  rating?: number;
  available?: boolean;
  isAvailable?: boolean;
  image?: string;
  imageUrl?: string;
  description?: string;
}

const fallbackImage =
  'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=80';

const mapBike = (bike: BikeApiResponse): Bike => ({
  id: String(bike.id ?? bike.bikeId ?? ''),
  name: bike.name ?? bike.model ?? 'Unnamed Bike',
  category: (bike.category ?? bike.type ?? 'City') as Bike['category'],
  city: bike.city ?? bike.location ?? 'Unknown City',
  pricePerHour: Number(bike.pricePerHour ?? bike.hourlyRate ?? 0),
  rating: Number(bike.rating ?? 4.5),
  available: Boolean(bike.available ?? bike.isAvailable ?? true),
  image: bike.image ?? bike.imageUrl ?? fallbackImage,
  description: bike.description ?? 'No description available for this bike.'
});

const extractList = (payload: BikeApiResponse[] | { data?: BikeApiResponse[] } | { content?: BikeApiResponse[] }): BikeApiResponse[] => {
  if (Array.isArray(payload)) return payload;
  if ('data' in payload && Array.isArray(payload.data)) return payload.data;
  if ('content' in payload && Array.isArray(payload.content)) return payload.content;
  return [];
};

export const bikeApi = {
  async getBikes(): Promise<Bike[]> {
    const response = await api.get<BikeApiResponse[] | { data?: BikeApiResponse[] } | { content?: BikeApiResponse[] }>('/bikes');
    return extractList(response.data).map(mapBike);
  },

  async getBikeById(id: string): Promise<Bike> {
    const response = await api.get<BikeApiResponse>(`/bikes/${id}`);
    return mapBike(response.data);
  }
};
