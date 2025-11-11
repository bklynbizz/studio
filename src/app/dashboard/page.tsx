import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { placeholderImages } from '@/lib/placeholder-images';

// This is mock data. In a real application, this would come from Firestore.
const mockTrips = [
  { id: '1', name: 'Paris Adventure', dates: 'Nov 15-20, 2025', destinations: 3, cost: 1450, currency: 'EUR', imageId: 'paris-trip' },
  { id: '2', name: 'Tokyo Explorer', dates: 'Dec 1-7, 2025', destinations: 2, cost: 180000, currency: 'JPY', imageId: 'tokyo-trip' },
];


export default function DashboardPage() {
    const newTripImage = placeholderImages.find(p => p.id === 'new-trip');
  
    return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold font-headline">My Trips</h1>
        <Button asChild>
          <Link href="/trips/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Trip
          </Link>
        </Button>
      </div>
      
      {mockTrips.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockTrips.map(trip => {
                const tripImage = placeholderImages.find(p => p.id === trip.imageId);
                return (
                    <Card key={trip.id} className="flex flex-col overflow-hidden">
                        <div className="relative h-40 w-full">
                            {tripImage && <Image src={tripImage.imageUrl} alt={trip.name} fill className="object-cover" data-ai-hint={tripImage.imageHint} />}
                        </div>
                        <CardHeader>
                            <CardTitle className="font-headline">{trip.name}</CardTitle>
                            <CardDescription>{trip.dates}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <div className="text-sm text-muted-foreground">
                                <p>{trip.destinations} destinations</p>
                                <p>Est. Budget: {new Intl.NumberFormat('en-US', { style: 'currency', currency: trip.currency, maximumFractionDigits: 0 }).format(trip.cost)}</p>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button asChild variant="default">
                                <Link href={`/trips/${trip.id}/edit`}>View</Link>
                            </Button>
                             <Button asChild variant="outline">
                                <Link href={`/trips/${trip.id}/edit`}>Edit</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                )
            })}
        </div>
      ) : (
        <div className="text-center py-20 border-2 border-dashed rounded-lg">
          {newTripImage && (
            <div className="relative h-48 w-48 mx-auto mb-4 opacity-50">
              <Image src={newTripImage.imageUrl} alt="Create a new trip" fill className="object-contain" data-ai-hint={newTripImage.imageHint} />
            </div>
          )}
          <h2 className="text-2xl font-bold font-headline mb-2">No trips yet. Let's plan an adventure!</h2>
          <p className="text-muted-foreground mb-6">Click the button below to start creating your first trip itinerary.</p>
          <Button asChild size="lg">
            <Link href="/trips/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Your First Trip
            </Link>
          </Button>
        </div>
      )}
    </>
  );
}
