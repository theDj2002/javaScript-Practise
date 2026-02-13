import Image from 'next/image';
import { notFound } from 'next/navigation';
import { DatePicker } from '@/components/shared/date-picker';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { bikes } from '@/hooks/use-mock-data';

export default function BikeDetailsPage({ params }: { params: { id: string } }) {
  const bike = bikes.find((item) => item.id === params.id);
  if (!bike) return notFound();

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
