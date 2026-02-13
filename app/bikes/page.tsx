import { BikeCard } from '@/components/bikes/bike-card';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { bikes } from '@/hooks/use-mock-data';

export default function BikesPage() {
  return (
    <main className="container-page grid gap-6 lg:grid-cols-[280px_1fr]">
      <Card className="h-fit space-y-3">
        <h2 className="font-semibold">Filters</h2>
        <Input placeholder="Max price (₹)" type="number" />
        <Select>
          <option value="">All Categories</option>
          <option value="Sport">Sport</option>
          <option value="Cruiser">Cruiser</option>
          <option value="Electric">Electric</option>
          <option value="City">City</option>
        </Select>
      </Card>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {bikes.map((bike) => <BikeCard key={bike.id} bike={bike} />)}
      </section>
    </main>
  );
}
