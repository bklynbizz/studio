'use client';

import { useState, useMemo } from 'react';
import { doc, updateDoc, collection } from 'firebase/firestore';
import { useFirestore, useDoc, useUser } from '@/firebase';
import type { Trip, Day, Activity } from '@/lib/types';
import { AIAssistant } from '@/components/trip/ai-assistant';
import { ItineraryPanel } from '@/components/trip/itinerary-panel';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { addDocumentNonBlocking, updateDocumentNonBlocking } from '@/firebase';


export default function TripEditPage({ params }: { params: { tripId: string } }) {
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();

  const tripRef = useMemo(() => {
      if (!firestore || !user) return null;
      return doc(firestore, `users/${user.uid}/trips/${params.tripId}`);
  }, [firestore, user, params.tripId]);
  
  const { data: trip, isLoading: isTripLoading, error: tripError } = useDoc<Trip>(tripRef);

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

      await updateDoc(tripRef, { days: updatedDays, totalCost: newTotalCost });

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

  const handleCreateTrip = async () => {
    if (!firestore || !user) return;
    const newTripData: Omit<Trip, 'id' | 'createdAt' | 'updatedAt'> = {
        userId: user.uid,
        tripName: 'New Trip',
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        destinations: [],
        days: [
          { date: new Date().toISOString().split('T')[0], destinationName: "Main Destination", activities: [] },
        ],
        totalCost: 0,
        sharedWith: [],
        isPublic: false,
    };
    const tripsCollection = collection(firestore, `users/${user.uid}/trips`);
    await addDocumentNonBlocking(tripsCollection, {
      ...newTripData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  };

  if (isTripLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 text-primary animate-spin" />
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
    // This could be a new trip, so we should create it
    if (params.tripId.startsWith('trip_')) {
      handleCreateTrip();
      return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className="flex flex-col items-center gap-4 text-center">
                <Loader2 className="h-12 w-12 text-primary animate-spin" />
                <h1 className="text-2xl font-bold font-headline">Creating your new trip...</h1>
                <p className="text-muted-foreground">Please wait a moment.</p>
            </div>
        </div>
      );
    }
    return <div className="text-center py-10"><p>Trip not found.</p></div>
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
