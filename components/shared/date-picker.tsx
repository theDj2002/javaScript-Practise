'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export function DatePicker() {
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));

  return (
    <Card className="p-3">
      <label className="mb-2 block text-sm font-medium">Select Date</label>
      <Input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
    </Card>
  );
}
