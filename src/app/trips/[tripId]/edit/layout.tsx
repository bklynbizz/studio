import AuthGuard from '@/components/auth/auth-guard';
import { Header } from '@/components/layout/header';

export default function TripEditLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
            {children}
        </main>
      </div>
    </AuthGuard>
  );
}
