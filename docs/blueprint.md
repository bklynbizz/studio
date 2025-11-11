# **App Name**: TravelWise

## Core Features:

- User Authentication: Secure user sign-up, login, and profile management using Firebase Authentication with email/password and Google Sign-In options.
- Trip Creation & Management: Allow users to create, edit, and delete multi-destination trips with specific dates and locations stored in Firestore.
- AI-Powered Activity Suggestions: Integrate Google's Gemini API via Firebase Functions to provide users with relevant activity, restaurant, and attraction suggestions based on destination and query. The model acts as a tool to extract information that matches the user's request and desired format.
- Itinerary Timeline View: Present a clear, chronological day-by-day timeline view of the trip itinerary, including activity details, locations, and estimated costs.
- Shareable Itineraries: Generate unique, shareable links for trips, allowing read-only access to the itinerary without authentication.
- Collaborative Editing (Basic): Enable basic trip collaboration by allowing users to invite others via email to view and edit the itinerary. Real-time updates should be visible to all collaborators.
- Map Integration: Incorporate Google Maps API to display trip destinations and activities on a map, providing visual context and location information.

## Style Guidelines:

- Primary color: Deep Indigo (#3F51B5) to evoke a sense of trust and exploration.
- Background color: Very light grey (#F0F2F5), a slightly tinted background will contrast gently against a lighter content area.
- Accent color: Vivid Orange (#FF5722) for interactive elements and highlights, providing a strong visual contrast.
- Body font: 'Inter' sans-serif for a modern, clean, and readable interface.
- Headline font: 'Poppins' sans-serif for a geometric and contemporary touch, creating visual hierarchy.
- Use clean and consistent line icons to represent activity categories, destinations, and actions.
- Employ a modern, minimal layout inspired by Google Material Design, with a focus on mobile-first responsiveness.