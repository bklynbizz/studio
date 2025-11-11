import type { Timestamp } from 'firebase/firestore';

export type UserProfile = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  createdAt: Timestamp;
};

export type Location = {
    lat: number;
    lng: number;
}

export type Activity = {
  id: string;
  name: string;
  description: string;
  category: 'attraction' | 'restaurant' | 'activity' | 'entertainment' | 'shopping' | 'nature' | 'other';
  time?: string; // e.g., "09:00"
  location: string | Location;
  locationName?: string;
  estimatedCost?: string;
  currency?: string;
  duration?: string;
  notes?: string;
  aiGenerated: boolean;
  addedAt: Timestamp;
  bestTime?: string;
  whyVisit?: string;
};

export type Day = {
  date: string; // ISO string e.g., "2025-11-15"
  destinationName: string;
  activities: Activity[];
};

export type Destination = {
  id: string;
  name: string;
  arrivalDate: string; // ISO string
  departureDate: string; // ISO string
  location?: {
    lat: number;
    lng: number;
  };
};

export type Trip = {
  id: string;
  userId: string;
  tripName: string;
  startDate: string; // ISO string
  endDate: string; // ISO string
  destinations: Destination[];
  days: Day[];
  totalCost: number;
  shareId?: string;
  sharedWith: string[]; // array of user UIDs
  isPublic: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  coverImage?: {
    url: string;
    aiHint: string;
  }
};
