'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Bike } from '@/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function BikeCard({ bike }: { bike: Bike }) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Card className="overflow-hidden p-0">
        <div className="relative h-48 w-full">
          <Image src={bike.image} alt={bike.name} fill className="object-cover" />
        </div>
        <div className="space-y-3 p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{bike.name}</h3>
            <Badge tone={bike.available ? 'success' : 'warning'}>{bike.available ? 'Available' : 'Blocked'}</Badge>
          </div>
          <p className="text-sm text-muted-foreground">{bike.category} · {bike.city}</p>
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">₹{bike.pricePerHour}/hr</p>
            <Link href={`/bikes/${bike.id}`} className="rounded-xl bg-primary px-3 py-1.5 text-sm text-primary-foreground">View</Link>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
