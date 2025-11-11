'use client';

import type { Trip, Day, Activity } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Wallet, Landmark, UtensilsCrossed, Plane, Bot } from 'lucide-react';

type ItineraryPanelProps = {
  trip: Trip;
};

const categoryIcons: { [key: string]: React.ReactNode } = {
    attraction: <Landmark className="h-5 w-5 text-accent" />,
    restaurant: <UtensilsCrossed className="h-5 w-5 text-accent" />,
    activity: <Plane className="h-5 w-5 text-accent" />,
    default: <MapPin className="h-5 w-5 text-accent" />,
};

export function ItineraryPanel({ trip }: ItineraryPanelProps) {
  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">{trip.tripName}</CardTitle>
          <CardDescription>
            <div className="flex items-center gap-4 text-muted-foreground mt-2">
                <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</span>
                <span className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {trip.destinations.length} Destination{trip.destinations.length > 1 ? 's' : ''}</span>
                <span className="flex items-center gap-2"><Wallet className="h-4 w-4" /> Est. {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(trip.totalCost)}</span>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {trip.days.map((day, dayIndex) => (
              <div key={dayIndex}>
                <div className="flex items-baseline gap-4 mb-4">
                  <h2 className="text-2xl font-bold font-headline">Day {dayIndex + 1}</h2>
                  <p className="text-muted-foreground">{new Date(day.date).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })} - <span className="font-medium text-foreground">{day.destinationName}</span></p>
                </div>

                <div className="relative pl-8 space-y-6 border-l-2 border-border/70">
                    {day.activities.length > 0 ? (
                        day.activities.map((activity, activityIndex) => (
                            <div key={activity.id || activityIndex} className="relative">
                                <div className="absolute -left-[2.1rem] top-1 flex h-8 w-8 items-center justify-center rounded-full bg-card border-2">
                                    {categoryIcons[activity.category] || categoryIcons.default}
                                </div>
                                <Card className="ml-4">
                                    <CardContent className="p-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="font-semibold text-lg">{activity.name}</p>
                                                <p className="text-sm text-muted-foreground">{activity.location}</p>
                                            </div>
                                            <div className="text-right flex-shrink-0 ml-4">
                                                {activity.time && <p className="font-bold text-lg">{activity.time}</p>}
                                                {activity.estimatedCost && <p className="text-sm text-muted-foreground">{activity.estimatedCost} {activity.currency}</p>}
                                            </div>
                                        </div>
                                        <div className="text-sm mt-2 text-muted-foreground space-y-1">
                                            {activity.duration && <p>Duration: {activity.duration}</p>}
                                            {activity.notes && <p>Notes: {activity.notes}</p>}
                                            {activity.aiGenerated && (
                                                <p className="flex items-center text-xs text-primary/80 gap-1"><Bot className="h-3 w-3" /> AI Suggested</p>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        ))
                    ) : (
                        <p className="text-muted-foreground italic pl-4">No activities planned for this day. Use the AI Assistant to get some ideas!</p>
                    )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
