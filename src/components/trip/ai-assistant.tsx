'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Bot, PlusCircle, Sparkles } from 'lucide-react';
import { suggestActivities } from '@/ai/flows/ai-suggest-activity';
import type { SuggestActivitiesOutput } from '@/ai/flows/ai-suggest-activity';
import type { Trip, Day, Activity } from '@/lib/types';

const formSchema = z.object({
  destination: z.string().min(1, 'Please enter a destination.'),
  query: z.string().min(1, 'Please describe what you are looking for.'),
});

type AIAssistantProps = {
  trip: Trip;
  onAddActivity: (day: Day, activity: Omit<Activity, 'id'|'addedAt'>) => void;
};

export function AIAssistant({ trip, onAddActivity }: AIAssistantProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<SuggestActivitiesOutput['suggestions']>([]);
  const [selectedDay, setSelectedDay] = useState<string>(trip.days[0]?.date || '');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destination: trip.destinations[0]?.name || '',
      query: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setSuggestions([]);
    try {
      const result = await suggestActivities(values);
      if (result && result.suggestions) {
        setSuggestions(result.suggestions);
      }
    } catch (error) {
      console.error('Error fetching AI suggestions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = (suggestion: SuggestActivitiesOutput['suggestions'][0]) => {
    const day = trip.days.find(d => d.date === selectedDay);
    if (!day) return;

    const newActivity = {
        name: suggestion.name,
        description: suggestion.description,
        category: suggestion.category as Activity['category'],
        location: suggestion.location,
        estimatedCost: suggestion.estimatedCost,
        currency: suggestion.currency,
        duration: suggestion.duration,
        aiGenerated: true,
        bestTime: suggestion.bestTime,
        whyVisit: suggestion.whyVisit,
        notes: `AI Suggestion for ${form.getValues('destination')}`,
    };

    onAddActivity(day, newActivity);
  };

  return (
    <Card className="m-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <Bot className="h-6 w-6 text-primary" />
          AI Assistant
        </CardTitle>
        <CardDescription>Get personalized activity suggestions for your trip.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="destination"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Destination</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Rome, Italy" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="query"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>I'm looking for...</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., family-friendly museums" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating ideas...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Get Suggestions
                </>
              )}
            </Button>
          </form>
        </Form>
        
        {suggestions.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Suggestions</h3>
            <div className="space-y-4">
              {suggestions.map((suggestion, index) => (
                <Card key={index} className="bg-muted/50">
                  <CardHeader>
                    <CardTitle className="text-lg">{suggestion.name}</CardTitle>
                    <CardDescription>{suggestion.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm space-y-1 text-muted-foreground">
                    <p><strong>Category:</strong> {suggestion.category}</p>
                    <p><strong>Cost:</strong> {suggestion.estimatedCost} {suggestion.currency}</p>
                    <p><strong>Best time:</strong> {suggestion.bestTime}</p>
                    <p><strong>Location:</strong> {suggestion.location}</p>
                    <p><strong>Why visit:</strong> {suggestion.whyVisit}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Label htmlFor={`day-select-${index}`} className="text-xs">Add to day:</Label>
                        <Select onValueChange={setSelectedDay} defaultValue={selectedDay}>
                            <SelectTrigger id={`day-select-${index}`} className="h-8 w-48">
                                <SelectValue placeholder="Select a day" />
                            </SelectTrigger>
                            <SelectContent>
                                {trip.days.map(d => (
                                    <SelectItem key={d.date} value={d.date}>
                                        {new Date(d.date).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <Button size="sm" onClick={() => handleAdd(suggestion)}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add to Itinerary
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
