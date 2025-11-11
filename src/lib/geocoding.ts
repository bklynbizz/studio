import type { Trip, Activity } from './types';

// A simple in-memory cache for geocoding results
const geocodingCache = new Map<string, { lat: number; lng: number }>();

async function geocodeAddress(address: string, apiKey: string): Promise<{ lat: number; lng: number } | null> {
  if (geocodingCache.has(address)) {
    return geocodingCache.get(address)!;
  }

  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'OK') {
      const location = data.results[0].geometry.location;
      geocodingCache.set(address, location);
      return location; // { lat, lng }
    } else {
      console.warn(`Geocoding failed for address "${address}": ${data.status}`);
      return null;
    }
  } catch (error) {
    console.error('Error during geocoding fetch:', error);
    return null;
  }
}

export async function geocodeActivities(trip: Trip, apiKey: string): Promise<Trip> {
  const newTrip = JSON.parse(JSON.stringify(trip)); // Deep copy to avoid mutation

  for (const day of newTrip.days) {
    for (const activity of day.activities) {
      if (activity.location && typeof activity.location === 'string') {
        const coords = await geocodeAddress(activity.location, apiKey);
        if (coords) {
            // We are modifying the structure here to hold both original string and coords
            activity.locationName = activity.location;
            activity.location = coords;
        }
      }
    }
  }

  return newTrip;
}
