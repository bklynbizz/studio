// This page will be the main trip builder interface.
// For now, it's a placeholder. The full implementation will be provided
// to demonstrate the split-screen layout with the itinerary and AI assistant.

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, MapPin } from "lucide-react";

export default function TripEditPage({ params }: { params: { tripId: string } }) {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline">Trip Builder</h1>
        <p className="text-muted-foreground">Editing Trip ID: {params.tripId}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        Itinerary Panel (Coming Soon)
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">This area will display your day-by-day trip timeline. You'll be able to add, edit, and reorder activities here.</p>
                    <div className="mt-4 p-8 border-2 border-dashed rounded-lg text-center bg-muted/50">
                        <p className="font-semibold">Itinerary Builder UI will appear here.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
        <div>
        <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Bot className="h-5 w-5 text-primary" />
                        AI Assistant (Coming Soon)
                    </CardTitle>
                </CardHeader>
                <CardContent>
                     <p className="text-muted-foreground">Use this panel to get AI-powered suggestions for activities, restaurants, and more. Add them to your itinerary with one click.</p>
                     <div className="mt-4 p-8 border-2 border-dashed rounded-lg text-center bg-muted/50">
                        <p className="font-semibold">AI Assistant UI will appear here.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
