import AuthGuard from '@/components/auth/auth-guard';
import { Header } from '@/components/layout/header';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 container py-8">
            {children}
        </main>
      </div>
    </AuthGuard>
  );
}
