'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { DatePicker } from '@/components/shared/date-picker';
import { EmptyState } from '@/components/shared/empty-state';
import { LoadingSkeleton } from '@/components/shared/loading-skeleton';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { bikeApi } from '@/services/bike.api';
import type { Bike } from '@/types';

export default function BikeDetailsPage() {
  const params = useParams<{ id: string }>();
  const [bike, setBike] = useState<Bike | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bikeId = params?.id;
    if (!bikeId) return;

    const loadBike = async () => {
      try {
        const response = await bikeApi.getBikeById(bikeId);
        setBike(response);
      } finally {
        setLoading(false);
      }
    };

    void loadBike();
  }, [params?.id]);

  if (loading) {
    return (
      <main className="container-page">
        <LoadingSkeleton />
      </main>
    );
  }

  if (!bike) {
    return (
      <main className="container-page">
        <EmptyState title="Bike not found" subtitle="Please choose another bike from the listing page." />
      </main>
    );
  }

  return (
    <main className="container-page grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <div className="relative h-[320px] overflow-hidden rounded-3xl">
          <Image src={bike.image} alt={bike.name} fill className="object-cover" />
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3].map((img) => <div key={img} className="h-20 rounded-xl bg-muted" />)}
        </div>
      </div>
      <Card className="space-y-4">
        <h1 className="text-2xl font-semibold">{bike.name}</h1>
        <p className="text-sm text-muted-foreground">{bike.description}</p>
        <p className="font-semibold">₹{bike.pricePerHour} / hour</p>
        <DatePicker />
        <Button className="w-full">Book Bike</Button>
      </Card>
    </main>
  );
}
