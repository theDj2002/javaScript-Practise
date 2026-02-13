import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/shared/theme-provider';
import { Navbar } from '@/components/layout/navbar';

export const metadata: Metadata = {
  title: 'RideFlow | Bike Rental Platform',
  description: 'Modern bike rental platform UI built with Next.js 14 and TypeScript.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
