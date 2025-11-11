import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { CheckCircle2, Map, Bot, Share2, Users, Wallet, Calendar, Plane } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { placeholderImages } from '@/lib/placeholder-images';

const features = [
  { icon: Bot, title: 'AI Activity Suggestions', description: 'Get smart recommendations for activities, restaurants, and attractions tailored to your interests.' },
  { icon: Plane, title: 'Clean Timeline View', description: 'Visualize your entire trip in a clean, chronological day-by-day layout.' },
  { icon: Users, title: 'Collaborative Planning', description: 'Invite friends and family to plan your trip together in real-time.' },
  { icon: Wallet, title: 'Cost Tracking', description: 'Keep an eye on your budget with per-activity cost entry and trip-wide totals.' },
  { icon: Share2, title: 'Shareable Itineraries', description: 'Easily share a beautiful, read-only version of your itinerary with anyone.' },
  { icon: Map, title: 'Map Integration', description: 'View all your planned activities and destinations plotted on an interactive map.' },
];

const faqs = [
    {
      question: "How does the AI suggestion feature work?",
      answer: "Our AI, powered by Google's Gemini, acts as an expert travel advisor. You provide a destination and a query (like 'family-friendly activities in Rome'), and it returns a list of tailored, actionable suggestions complete with descriptions, estimated costs, and more."
    },
    {
      question: "Is my travel data secure?",
      answer: "Absolutely. Your data is stored securely in Firebase Firestore, protected by robust security rules. Only you and the people you explicitly share your trips with can access your itinerary."
    },
    {
      question: "Can I collaborate with others on a trip plan?",
      answer: "Yes! TravelWise is built for collaboration. You can invite friends, family, or colleagues to your trip. Everyone can add or edit activities, and all changes are updated in real-time for all collaborators."
    },
    {
      question: "Can I access my itinerary offline?",
      answer: "Currently, TravelWise requires an internet connection to sync your data in real-time. Offline access is a feature we are considering for our future native mobile apps."
    }
  ];

export default function Home() {
  const heroImage = placeholderImages.find(p => p.id === 'hero-image');

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="relative w-full pt-12 md:pt-24 lg:pt-32">
          <div className="container px-4 md:px-6 text-center space-y-6">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Plan Your Dream Trip in Minutes
            </h1>
            <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
              TravelWise is an AI-powered itinerary builder that brings all your travel plans together. Stop juggling apps and start your adventure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="font-semibold">
                <Link href="/dashboard">Start Planning for Free</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="font-semibold">
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </div>
          {heroImage && (
            <div className="relative mt-12 h-[300px] md:h-[500px] lg:h-[600px] w-full">
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover object-center"
                data-ai-hint={heroImage.imageHint}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
            </div>
          )}
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-card">
            <div className="container px-4 md:px-6">
                <div className="text-center space-y-4 mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">How It Works in 3 Simple Steps</h2>
                    <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
                        From idea to detailed itinerary in no time.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center text-center p-6 rounded-lg">
                        <div className="p-4 bg-primary/10 rounded-full mb-4">
                            <Map className="w-10 h-10 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold mb-2 font-headline">1. Add Destinations</h3>
                        <p className="text-muted-foreground">Start by creating a new trip and adding the cities you want to visit, along with your travel dates.</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-6 rounded-lg">
                         <div className="p-4 bg-primary/10 rounded-full mb-4">
                            <Bot className="w-10 h-10 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold mb-2 font-headline">2. Get AI Suggestions</h3>
                        <p className="text-muted-foreground">Ask our AI travel assistant for recommendations on activities, restaurants, or hidden gems. Add them to your plan with a single click.</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-6 rounded-lg">
                        <div className="p-4 bg-primary/10 rounded-full mb-4">
                            <Share2 className="w-10 h-10 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold mb-2 font-headline">3. Share Your Itinerary</h3>
                        <p className="text-muted-foreground">Once your plan is ready, generate a shareable link to send to friends, family, or fellow travelers.</p>
                    </div>
                </div>
            </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                  Everything You Need to Plan a Perfect Trip
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  TravelWise combines powerful planning tools with intelligent AI to make trip organization effortless and enjoyable.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-3 mt-12">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="h-full">
                    <CardHeader className="flex flex-row items-center gap-4">
                      <div className="p-3 bg-primary/10 rounded-full">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section id="faq" className="w-full py-12 md:py-24 lg:py-32 bg-card">
            <div className="container px-4 md:px-6">
                <div className="text-center space-y-4 mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">Frequently Asked Questions</h2>
                </div>
                <div className="max-w-3xl mx-auto">
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                        <AccordionItem value={`item-${index+1}`} key={index}>
                            <AccordionTrigger className="text-lg font-semibold">{faq.question}</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground text-base">
                            {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
      </main>
      <footer className="bg-card border-t py-6">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} TravelWise. All Rights Reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">Contact</Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link>
            </div>
        </div>
      </footer>
    </div>
  );
}
