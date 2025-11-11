import Link from 'next/link';
import { Plane } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AuthForm } from '@/components/auth/auth-form';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
            <Link href="/" className="flex items-center space-x-2 text-foreground">
                <Plane className="h-8 w-8 text-primary" />
                <span className="font-bold text-2xl font-headline">TravelWise</span>
            </Link>
        </div>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-headline">Welcome Back!</CardTitle>
            <CardDescription>Log in to continue planning your adventures.</CardDescription>
          </CardHeader>
          <CardContent>
            <AuthForm />
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="font-semibold text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
