'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function PaymentButton() {
  const [loading, setLoading] = useState(false);

  return (
    <Button
      onClick={() => {
        setLoading(true);
        setTimeout(() => setLoading(false), 1200);
      }}
      className="w-full md:w-auto"
    >
      {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      Pay Advance
    </Button>
  );
}
