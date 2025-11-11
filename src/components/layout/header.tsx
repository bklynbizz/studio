'use client';

import Link from 'next/link';
import { Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { UserNav } from '@/components/layout/user-nav';

export function Header() {
  const { user, loading } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Plane className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline text-xl">TravelWise</span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          {/* Add more nav links here if needed */}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          {loading ? (
            <div className="flex items-center space-x-4">
                <div className="w-24 h-9 bg-muted rounded-md animate-pulse"></div>
                <div className="w-24 h-9 bg-muted rounded-md animate-pulse"></div>
            </div>
          ) : user ? (
            <UserNav />
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">Log In</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
