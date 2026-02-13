import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function LoginPage() {
  return (
    <main className="container-page flex justify-center">
      <Card className="w-full max-w-md space-y-4">
        <h1 className="text-xl font-semibold">Login / OTP</h1>
        <Input placeholder="Phone number" />
        <Input placeholder="Password" type="password" />
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline">Send OTP</Button>
          <Button>Login</Button>
        </div>
      </Card>
    </main>
  );
}
