'use client';

import { useState } from 'react';
import type { Trip } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, MapPin, Wallet, Sparkles, Edit, Check, Share2, Loader2, Image as ImageIcon } from 'lucide-react';
import { generateTripImage } from '@/ai/flows/ai-generate-trip-image';
import { useToast } from '@/hooks/use-toast';


type TripHeaderProps = {
    trip: Trip;
    onUpdateTrip: (updatedFields: Partial<Trip>) => Promise<void>;
};

export function TripHeader({ trip, onUpdateTrip }: TripHeaderProps) {
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [tripName, setTripName] = useState(trip.tripName);
    const [isGeneratingImage, setIsGeneratingImage] = useState(false);
    const { toast } = useToast();

    const handleTitleSave = () => {
        onUpdateTrip({ tripName });
        setIsEditingTitle(false);
    };

    const handleGenerateImage = async () => {
        setIsGeneratingImage(true);
        try {
            const result = await generateTripImage({ prompt: trip.tripName });
            if (result.imageUrl) {
                await onUpdateTrip({
                    coverImage: {
                        url: result.imageUrl,
                        aiHint: trip.tripName,
                    },
                });
                toast({
                    title: "Cover Image Generated!",
                    description: "Your new trip cover image has been saved.",
                });
            }
        } catch (error: any) {
            console.error("Error generating image:", error);
            toast({
                variant: "destructive",
                title: "Image Generation Failed",
                description: error.message || "Could not generate a new cover image.",
            });
        } finally {
            setIsGeneratingImage(false);
        }
    };


    return (
        <Card>
            <CardHeader>
                {isEditingTitle ? (
                    <div className="flex items-center gap-2">
                        <Input
                            value={tripName}
                            onChange={(e) => setTripName(e.target.value)}
                            className="text-3xl font-headline font-bold p-0 h-auto border-0 focus-visible:ring-0"
                        />
                        <Button size="icon" variant="ghost" onClick={handleTitleSave}>
                            <Check className="h-6 w-6 text-green-500" />
                        </Button>
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <CardTitle className="font-headline text-3xl">{trip.tripName}</CardTitle>
                        <Button size="icon" variant="ghost" onClick={() => setIsEditingTitle(true)}>
                            <Edit className="h-5 w-5" />
                        </Button>
                    </div>
                )}
                <CardDescription>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-muted-foreground mt-2">
                        <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> {new Date(trip.startDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })} - {new Date(trip.endDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        <span className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {trip.destinations?.length || 0} Destination{(trip.destinations?.length || 0) !== 1 ? 's' : ''}</span>
                        <span className="flex items-center gap-2"><Wallet className="h-4 w-4" /> Est. {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(trip.totalCost)}</span>
                    </div>
                </CardDescription>
            </CardHeader>
            <CardFooter className="gap-2">
                <Button variant="outline" onClick={handleGenerateImage} disabled={isGeneratingImage}>
                    {isGeneratingImage ? <Loader2 className="animate-spin" /> : <ImageIcon />}
                    Generate Cover Image
                </Button>
                <Button variant="outline">
                    <Share2 /> Share
                </Button>
            </CardFooter>
        </Card>
    )
}
