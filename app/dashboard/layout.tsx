import { Sidebar } from '@/components/layout/sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="container-page flex flex-col gap-6 lg:flex-row">
      <Sidebar />
      <section className="flex-1">{children}</section>
    </main>
  );
}
