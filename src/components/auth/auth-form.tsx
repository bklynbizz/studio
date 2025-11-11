'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from 'firebase/auth';
import { auth, db } from '@/lib/firebase/firebase';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
  displayName: z.string().optional(),
});

type AuthFormProps = {
  isSignUp?: boolean;
};

export function AuthForm({ isSignUp = false }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      displayName: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      let userCredential;
      if (isSignUp) {
        userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
        if (values.displayName) {
          await updateProfile(userCredential.user, { displayName: values.displayName });
        }
        await setDoc(doc(db, "users", userCredential.user.uid), {
            uid: userCredential.user.uid,
            email: userCredential.user.email,
            displayName: values.displayName || userCredential.user.displayName,
            photoURL: userCredential.user.photoURL,
            createdAt: serverTimestamp(),
        });
      } else {
        userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
      }
      toast({
        title: isSignUp ? 'Account created!' : 'Logged in!',
        description: isSignUp ? "Welcome to TravelWise!" : "Welcome back to TravelWise!",
      });
      router.push('/dashboard');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Authentication Failed',
        description: error.message || 'An unexpected error occurred.',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            createdAt: serverTimestamp(),
        }, { merge: true }); // Merge to avoid overwriting existing data if user signs up differently first

        toast({
            title: 'Logged in with Google!',
            description: "Welcome to TravelWise!",
        });
        router.push('/dashboard');
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: 'Google Sign-In Failed',
            description: error.message || 'An unexpected error occurred.',
        });
    } finally {
        setIsLoading(false);
    }
  };


  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {isSignUp && (
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="you@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSignUp ? 'Create Account' : 'Log In'}
          </Button>
        </form>
      </Form>
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={isLoading}>
         {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 
         <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 23.4 172.9 61.9l-76.2 76.2c-27.3-26.2-63.5-42.3-104.1-42.3-84.3 0-152.3 68.1-152.3 152.3s68 152.3 152.3 152.3c97.1 0 134.3-70.1 138.9-106.3H248v-95.6h239.9c.7 12.6 1.1 25.4 1.1 38.8z"></path></svg>
         }
        Google
      </Button>
    </>
  );
}
