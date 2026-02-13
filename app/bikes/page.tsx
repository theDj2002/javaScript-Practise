'use client';

import { useEffect, useMemo, useState } from 'react';
import { BikeCard } from '@/components/bikes/bike-card';
import { EmptyState } from '@/components/shared/empty-state';
import { LoadingSkeleton } from '@/components/shared/loading-skeleton';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { bikeApi } from '@/services/bike.api';
import type { Bike } from '@/types';

export default function BikesPage() {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [loading, setLoading] = useState(true);
  const [maxPrice, setMaxPrice] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    const loadBikes = async () => {
      try {
        const response = await bikeApi.getBikes();
        setBikes(response);
      } finally {
        setLoading(false);
      }
    };

    void loadBikes();
  }, []);

  const filteredBikes = useMemo(() => {
    return bikes.filter((bike) => {
      const categoryPass = category ? bike.category === category : true;
      const pricePass = maxPrice ? bike.pricePerHour <= Number(maxPrice) : true;
      return categoryPass && pricePass;
    });
  }, [bikes, maxPrice, category]);

  return (
    <main className="container-page grid gap-6 lg:grid-cols-[280px_1fr]">
      <Card className="h-fit space-y-3">
        <h2 className="font-semibold">Filters</h2>
        <Input placeholder="Max price (₹)" type="number" value={maxPrice} onChange={(event) => setMaxPrice(event.target.value)} />
        <Select value={category} onChange={(event) => setCategory(event.target.value)}>
          <option value="">All Categories</option>
          <option value="Sport">Sport</option>
          <option value="Cruiser">Cruiser</option>
          <option value="Electric">Electric</option>
          <option value="City">City</option>
        </Select>
      </Card>

      {loading ? (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <LoadingSkeleton />
          <LoadingSkeleton />
          <LoadingSkeleton />
        </section>
      ) : filteredBikes.length ? (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredBikes.map((bike) => <BikeCard key={bike.id} bike={bike} />)}
        </section>
      ) : (
        <EmptyState title="No matching bikes" subtitle="Try changing your filters." />
      )}
    </main>
  );
}
