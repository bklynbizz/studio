'use server';

/**
 * @fileOverview An AI agent that suggests activities for a given destination and query.
 *
 * - suggestActivities - A function that handles the activity suggestion process.
 * - SuggestActivitiesInput - The input type for the suggestActivities function.
 * - SuggestActivitiesOutput - The return type for the suggestActivities function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestActivitiesInputSchema = z.object({
  destination: z.string().describe('The destination for which to suggest activities.'),
  query: z.string().describe('The query to use to find activities.'),
});
export type SuggestActivitiesInput = z.infer<typeof SuggestActivitiesInputSchema>;

const SuggestActivitiesOutputSchema = z.object({
  suggestions: z.array(
    z.object({
      name: z.string().describe('The name of the activity.'),
      description: z.string().describe('A short description of the activity.'),
      category: z.string().describe('The category of the activity (e.g., attraction, restaurant, activity, entertainment, nature, shopping).'),
      estimatedCost: z.string().describe('The estimated cost of the activity.'),
      currency: z.string().describe('The currency of the estimated cost.'),
      duration: z.string().describe('The approximate duration of the activity.'),
      bestTime: z.string().describe('The best time to visit or do the activity.'),
      location: z.string().describe('The full address of the activity.'),
      whyVisit: z.string().describe('One sentence why this is recommended.'),
    })
  ).describe('A list of suggested activities.'),
  destination: z.string().describe('The destination for which activities were suggested.'),
});
export type SuggestActivitiesOutput = z.infer<typeof SuggestActivitiesOutputSchema>;

export async function suggestActivities(input: SuggestActivitiesInput): Promise<SuggestActivitiesOutput> {
  return suggestActivitiesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestActivitiesPrompt',
  input: {schema: SuggestActivitiesInputSchema},
  output: {schema: SuggestActivitiesOutputSchema},
  prompt: `You are an expert travel advisor. A traveler is visiting {{destination}}.\n\nUser query: "{{query}}"\n\nProvide 6-8 specific, actionable travel suggestions in valid JSON format only (no markdown, no code blocks):\n\n[{\n  "name": "Activity/Place Name",\n  "description": "One-sentence description",\n  "category": "attraction|restaurant|activity|entertainment|nature|shopping",\n  "estimatedCost": "Price range in local currency",\n  "currency": "EUR|USD|JPY|etc",\n  "duration": "Approximate time needed",\n  "bestTime": "Best time to visit",\n  "location": "Full address",\n  "whyVisit": "One sentence why this is recommended"\n}]\n\nEnsure suggestions are diverse, realistic, and specific to {{destination}}.`,
});

const suggestActivitiesFlow = ai.defineFlow(
  {
    name: 'suggestActivitiesFlow',
    inputSchema: SuggestActivitiesInputSchema,
    outputSchema: SuggestActivitiesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
