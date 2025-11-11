'use server';

/**
 * @fileOverview An AI agent that generates a trip cover image.
 *
 * - generateTripImage - A function that handles the image generation process.
 * - GenerateTripImageInput - The input type for the generateTripImage function.
 * - GenerateTripImageOutput - The return type for the generateTripImage function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateTripImageInputSchema = z.object({
  prompt: z.string().describe('The prompt to use for generating the image. Should be descriptive, e.g., "A beautiful sunset over the Eiffel Tower in Paris, impressionist style."'),
});
export type GenerateTripImageInput = z.infer<typeof GenerateTripImageInputSchema>;

const GenerateTripImageOutputSchema = z.object({
  imageUrl: z.string().describe('The data URI of the generated image.'),
});
export type GenerateTripImageOutput = z.infer<typeof GenerateTripImageOutputSchema>;

export async function generateTripImage(input: GenerateTripImageInput): Promise<GenerateTripImageOutput> {
  return generateTripImageFlow(input);
}

const generateTripImageFlow = ai.defineFlow(
  {
    name: 'generateTripImageFlow',
    inputSchema: GenerateTripImageInputSchema,
    outputSchema: GenerateTripImageOutputSchema,
  },
  async ({ prompt }) => {
    const { media } = await ai.generate({
      model: 'googleai/imagen-4.0-fast-generate-001',
      prompt: `Generate a beautiful, vibrant, cinematic travel poster for: ${prompt}. Do not include any text or words in the image.`,
      config: {
        aspectRatio: '16:9',
      }
    });

    if (!media.url) {
      throw new Error('Image generation failed to return a URL.');
    }

    return {
      imageUrl: media.url,
    };
  }
);
