'use server';
import { config } from 'dotenv';
config();

import '@/ai/flows/ai-suggest-activity.ts';
import '@/ai/flows/ai-generate-trip-image.ts';
