import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clipboard, Landmark, MapPin, Share2, UtensilsCrossed, Wallet, Plane, Bot } from "lucide-react";

// Mock data for a shared trip view
const mockSharedTrip = {
    tripName: "Paris Adventure",
    dateRange: "November 15-17, 2025",
    destinationCount: 1,
    totalCost: 450,
    currency: "EUR",
    days: [
        {
            dayNumber: 1,
            date: "Monday, November 15",
            destination: "Paris, France",
            activities: [
                {
                    time: "9:00 AM",
                    name: "Eiffel Tower Visit",
                    category: "attraction",
                    location: "Champ de Mars, 5 Avenue Anatole",
                    duration: "2-3 hours",
                    cost: "€30",
                    notes: "Booked tickets in advance online.",
                    aiGenerated: true,
                },
                {
                    time: "12:30 PM",
                    name: "Lunch at Le Cinq",
                    category: "restaurant",
                    location: "Four Seasons Hotel George V",
                    duration: "2 hours",
                    cost: "€85",
                    notes: "Michelin 3-star, dress code applies.",
                    aiGenerated: false,
                },
                {
                    time: "3:00 PM",
                    name: "Louvre Museum",
                    category: "attraction",
                    location: "Rue de Rivoli, 75001 Paris",
                    duration: "3-4 hours",
                    cost: "€17",
                    notes: "Focus on the Denon wing to see the Mona Lisa.",
                    aiGenerated: true,
                }
            ]
        },
        {
            dayNumber: 2,
            date: "Tuesday, November 16",
            destination: "Paris, France",
            activities: [
                {
                    time: "10:00 AM",
                    name: "Notre-Dame Cathedral",
                    category: "attraction",
                    location: "6 Parvis Notre-Dame - Pl. Jean-Paul II",
                    duration: "1 hour",
                    cost: "Free",
                    notes: "Check reconstruction status before visiting.",
                    aiGenerated: false,
                },
                {
                    time: "1:00 PM",
                    name: "Montmartre & Sacré-Cœur",
                    category: "attraction",
                    location: "Montmartre neighborhood",
                    duration: "3 hours",
                    cost: "Free",
                    notes: "Explore the artists' square.",
                    aiGenerated: true,
                }
            ]
        }
    ]
};

const categoryIcons = {
    attraction: <Landmark className="h-5 w-5 text-accent" />,
    restaurant: <UtensilsCrossed className="h-5 w-5 text-accent" />,
    activity: <Plane className="h-5 w-5 text-accent" />,
    default: <MapPin className="h-5 w-5 text-accent" />,
};

export default function SharedTripPage({ params }: { params: { shareId: string }}) {
    // In a real app, you'd fetch the trip data using params.shareId
    const trip = mockSharedTrip;

    return (
        <div className="bg-background min-h-screen">
            <header className="bg-card border-b py-4">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary">{trip.tripName}</h1>
                            <div className="flex items-center gap-4 text-muted-foreground mt-2">
                                <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> {trip.dateRange}</span>
                                <span className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {trip.destinationCount} Destination{trip.destinationCount > 1 ? 's' : ''}</span>
                                <span className="flex items-center gap-2"><Wallet className="h-4 w-4" /> Est. {new Intl.NumberFormat('en-US', { style: 'currency', currency: trip.currency }).format(trip.totalCost)}</span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline"><Share2 className="mr-2 h-4 w-4" /> Share</Button>
                            <Button variant="outline"><Clipboard className="mr-2 h-4 w-4" /> Copy Trip</Button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 md:px-6 py-8">
                <div className="space-y-8">
                    {trip.days.map(day => (
                        <div key={day.dayNumber}>
                            <div className="flex items-baseline gap-4 mb-4">
                                <h2 className="text-2xl font-bold font-headline">Day {day.dayNumber}</h2>
                                <p className="text-muted-foreground">{day.date} - <span className="font-medium text-foreground">{day.destination}</span></p>
                            </div>
                            
                            <div className="relative pl-8 space-y-8 border-l-2 border-border/70">
                                {day.activities.map((activity, index) => (
                                    <div key={index} className="relative">
                                        <div className="absolute -left-[2.1rem] top-1 flex h-8 w-8 items-center justify-center rounded-full bg-card border-2">
                                            {categoryIcons[activity.category as keyof typeof categoryIcons] || categoryIcons.default}
                                        </div>
                                        <Card className="ml-4">
                                            <CardContent className="p-4">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <p className="font-semibold text-lg">{activity.name}</p>
                                                        <p className="text-sm text-muted-foreground">{activity.location}</p>
                                                    </div>
                                                    <div className="text-right flex-shrink-0 ml-4">
                                                        <p className="font-bold text-lg">{activity.time}</p>
                                                        <p className="text-sm text-muted-foreground">{activity.cost}</p>
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
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </main>
            <footer className="text-center py-8 text-muted-foreground text-sm">
                <p>Created with <a href="/" className="font-semibold text-primary hover:underline">TravelWise</a> ❤️</p>
            </footer>
        </div>
    );
}
