'use client'

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

// In a real application, this page would contain a form to create a new trip.
// For this MVP, we will simulate the creation and redirect to a new trip page.

export default function NewTripPage() {
    const router = useRouter();

    useEffect(() => {
        // Simulate creating a new trip document in Firestore and getting its ID
        const newTripId = `trip_${Date.now()}`;
        
        // Redirect to the trip builder page for the new trip
        const timer = setTimeout(() => {
            router.push(`/trips/${newTripId}/edit`);
        }, 1500);

        return () => clearTimeout(timer);

    }, [router]);

    return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className="flex flex-col items-center gap-4 text-center">
                <Loader2 className="h-12 w-12 text-primary animate-spin" />
                <h1 className="text-2xl font-bold font-headline">Crafting Your New Adventure...</h1>
                <p className="text-muted-foreground">Getting your new trip plan ready. You will be redirected shortly.</p>
            </div>
        </div>
    );
}
