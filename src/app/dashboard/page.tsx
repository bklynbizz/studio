import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

// This is mock data. In a real application, this would come from Firestore.
const mockTrips = [
  { id: '1', name: 'Paris Adventure', dates: 'Nov 15-20, 2025', destinations: 3, cost: 1450, currency: 'EUR', imageId: 'paris-trip' },
  { id: '2', name: 'Tokyo Explorer', dates: 'Dec 1-7, 2025', destinations: 2, cost: 180000, currency: 'JPY', imageId: 'tokyo-trip' },
];

const placeholderImages = [
    {
      "id": "hero-image",
      "description": "A stunning collage of various travel destinations, including mountains, cities, and beaches, conveying a sense of adventure.",
      "imageUrl": "https://images.unsplash.com/photo-1610206587623-2afc395a3ca5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHx0cmF2ZWwlMjBjb2xsYWdlfGVufDB8fHx8MTc2Mjc5MTAyNXww&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "travel collage"
    },
    {
      "id": "paris-trip",
      "description": "A picture of the Eiffel Tower in Paris on a sunny day.",
      "imageUrl": "https://images.unsplash.com/photo-1516437097933-e351e288df02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxwYXJpcyUyMGNpdHl8ZW58MHx8fHwxNzYyODIzNzEyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "paris city"
    },
    {
      "id": "tokyo-trip",
      "description": "A vibrant street scene in Tokyo at night with neon lights.",
      "imageUrl": "https://images.unsplash.com/photo-1554058501-f6872d688003?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8dG9reW8lMjBzdHJlZXR8ZW58MHx8fHwxNzYyNzI1OTg1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "tokyo street"
    },
    {
      "id": "new-trip",
      "description": "An inspiring image of a map and a compass on a wooden table.",
      "imageUrl": "https://images.unsplash.com/photo-1542383578-4cb83f35eac0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxtYXAlMjBjb21wYXNzfGVufDB8fHx8MTc2MjgyNzQzMHww&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "map compass"
    }
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
