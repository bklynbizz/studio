'use client';

import { useMemo } from 'react';
import { APIProvider, Map, AdvancedMarker, InfoWindow, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';
import type { Trip } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Bot, Landmark, UtensilsCrossed, Plane, MapPin as MapPinIcon, Info } from 'lucide-react';
import { geocodeActivities } from '@/lib/geocoding';

const categoryIcons: { [key: string]: React.ReactNode } = {
    attraction: <Landmark className="h-5 w-5 text-accent" />,
    restaurant: <UtensilsCrossed className="h-5 w-5 text-accent" />,
    activity: <Plane className="h-5 w-5 text-accent" />,
    default: <MapPinIcon className="h-5 w-5 text-accent" />,
};

interface MapViewProps {
  trip: Trip;
}

// Simple component to manage marker state
function MapMarker({ activity }: { activity: any }) {
    const [markerRef, marker] = useAdvancedMarkerRef();
    const [infoWindowShown, setInfoWindowShown] = React.useState(false);

    if (!activity.location?.lat || !activity.location?.lng) {
        return null; // Don't render marker if no location
    }
    
    const Icon = categoryIcons[activity.category as keyof typeof categoryIcons] || categoryIcons.default;

    return (
        <>
            <AdvancedMarker
                ref={markerRef}
                onClick={() => setInfoWindowShown(true)}
                position={{ lat: activity.location.lat, lng: activity.location.lng }}
                title={activity.name}
            >
                 <div className="w-8 h-8 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
                    {Icon}
                </div>
            </AdvancedMarker>
            {infoWindowShown && (
                <InfoWindow
                    anchor={marker}
                    maxWidth={200}
                    onCloseClick={() => setInfoWindowShown(false)}
                >
                    <div className="p-1">
                        <h4 className="font-bold text-md">{activity.name}</h4>
                        <p className="text-sm text-muted-foreground">{activity.locationName}</p>
                        {activity.aiGenerated && (
                            <p className="flex items-center text-xs text-primary/80 gap-1 mt-1"><Bot className="h-3 w-3" /> AI Suggested</p>
                        )}
                    </div>
                </InfoWindow>
            )}
        </>
    );
}

export function MapView({ trip }: MapViewProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const [geocodedTrip, setGeocodedTrip] = React.useState<Trip | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (trip && apiKey) {
        setIsLoading(true);
        geocodeActivities(trip, apiKey).then(newTrip => {
            setGeocodedTrip(newTrip);
            setIsLoading(false);
        });
    }
  }, [trip, apiKey]);


  const allActivities = useMemo(() => {
    if (!geocodedTrip) return [];
    return geocodedTrip.days.flatMap(day => day.activities);
  }, [geocodedTrip]);

  const mapCenter = useMemo(() => {
    const firstLocatedActivity = allActivities.find(a => a.location?.lat && a.location?.lng);
    if (firstLocatedActivity) {
      return { lat: firstLocatedActivity.location.lat, lng: firstLocatedActivity.location.lng };
    }
    // Default to a central location if no activities have coordinates
    return { lat: 48.8566, lng: 2.3522 };
  }, [allActivities]);

  if (!apiKey) {
    return (
      <Card className="m-4 p-4 text-center">
        <h2 className="text-lg font-semibold text-destructive">Map Not Configured</h2>
        <p className="text-muted-foreground">A Google Maps API key is required to display the map. Please set the <code className="bg-muted px-1 py-0.5 rounded-sm">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> environment variable.</p>
      </Card>
    );
  }
  
  if (isLoading) {
    return <Card className="m-4 p-4 text-center">Loading map data...</Card>
  }

  return (
    <div className="w-full h-full">
      <APIProvider apiKey={apiKey}>
        <Map
          defaultCenter={mapCenter}
          defaultZoom={11}
          gestureHandling={'greedy'}
          disableDefaultUI={true}
          mapId={'f5883a48e358b577'}
        >
          {allActivities.map((activity, index) => (
             <MapMarker key={activity.id || index} activity={activity} />
          ))}
        </Map>
      </APIProvider>
    </div>
  );
}
