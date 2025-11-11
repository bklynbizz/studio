'use client';

import { useState, useMemo, use } from 'react';
import { doc, updateDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useFirestore, useDoc, useUser } from '@/firebase';
import type { Trip, Day, Activity } from '@/lib/types';
import { AIAssistant } from '@/components/trip/ai-assistant';
import { ItineraryPanel } from '@/components/trip/itinerary-panel';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';


export default function TripEditPage({ params }: { params: { tripId: string } }) {
  const { tripId } = use(params);
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  const router = useRouter();

  const tripRef = useMemo(() => {
      if (!firestore || !user) return null;
      return doc(firestore, `users/${user.uid}/trips/${tripId}`);
  }, [firestore, user, tripId]);
  
  const { data: trip, isLoading: isTripLoading, error: tripError } = useDoc<Trip>(tripRef);

  // This effect creates the trip document if it doesn't exist.
  // This is useful when navigating from the "new trip" page.
  useMemo(() => {
    if (tripRef && !trip && !isTripLoading) {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const newTripData: Omit<Trip, 'id'> = {
        userId: user!.uid,
        tripName: 'My New Adventure',
        startDate: today.toISOString(),
        endDate: tomorrow.toISOString(),
        destinations: [],
        days: [],
        totalCost: 0,
        sharedWith: [],
        isPublic: false,
        createdAt: serverTimestamp() as any,
        updatedAt: serverTimestamp() as any,
      };
      setDoc(tripRef, newTripData).catch(err => {
         console.error("Failed to create trip document", err);
         toast({
            variant: "destructive",
            title: "Error Creating Trip",
            description: "Could not create the new trip document in the database.",
         });
         router.push('/dashboard');
      });
    }
  }, [tripRef, trip, isTripLoading, user, toast, router]);


  const handleAddActivity = async (day: Day, activity: Omit<Activity, 'id' | 'addedAt'>) => {
    if (!tripRef || !trip) return;

    try {
      const dayIndex = trip.days.findIndex(d => d.date === day.date);
      if (dayIndex === -1) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Could not find the selected day in the itinerary.',
        });
        return;
      }

      const newActivity: Activity = {
        ...activity,
        id: `activity_${Date.now()}`,
        addedAt: new Date() as any, // Firestore will convert this to Timestamp
      };

      const updatedDays = [...trip.days];
      updatedDays[dayIndex].activities.push(newActivity);
      
      const newTotalCost = trip.totalCost + (Number(activity.estimatedCost) || 0);

      await updateDoc(tripRef, { days: updatedDays, totalCost: newTotalCost, updatedAt: serverTimestamp() });

      toast({
        title: 'Activity Added!',
        description: `${activity.name} has been added to your itinerary for ${new Date(day.date).toLocaleDateString()}.`,
      });
    } catch (error: any) {
      console.error("Error adding activity: ", error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error.message || 'Could not add activity to your itinerary.',
      });
    }
  };

  if (isTripLoading || (!trip && !tripError)) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center">
            <Loader2 className="h-12 w-12 text-primary animate-spin" />
            <h1 className="text-2xl font-bold font-headline">Loading your trip...</h1>
            <p className="text-muted-foreground">This may take a moment.</p>
        </div>
      </div>
    );
  }

  if (tripError) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Error loading trip: {tripError.message}</p>
      </div>
    );
  }

  if (!trip && !isTripLoading) {
      return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className="flex flex-col items-center gap-4 text-center">
                <h1 className="text-2xl font-bold font-headline">Trip not found.</h1>
                <p className="text-muted-foreground">We couldn't find the trip you were looking for.</p>
                <Button onClick={() => router.push('/dashboard')}>Go to Dashboard</Button>
            </div>
        </div>
      )
  }
  
  if (!trip) return null;

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      <div className="w-1/2 h-full overflow-y-auto border-r">
        <ItineraryPanel trip={trip} />
      </div>
      <div className="w-1/2 h-full overflow-y-auto">
        <AIAssistant trip={trip} onAddActivity={handleAddActivity} />
      </div>
    </div>
  );
}
