import { Header } from "@/components/layout/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Mail, MessageSquare } from "lucide-react";

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
    question: "How do I export my trip itinerary?",
    answer: "On the trip view page, you will find options to share, copy, or export your itinerary. We are working on providing exports in PDF and calendar formats."
  }
];


export default function ContactPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 container py-12 md:py-24">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold font-headline">Contact & Support</h1>
                    <p className="text-muted-foreground mt-2 text-lg">We're here to help. Find answers or get in touch.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 font-headline text-2xl">
                                    <MessageSquare className="h-6 w-6 text-primary" />
                                    Send us a Message
                                </CardTitle>
                                <CardDescription>
                                    Have a question or feedback? Fill out the form below.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input id="name" placeholder="Your Name" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" type="email" placeholder="you@example.com" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="subject">Subject</Label>
                                    <Input id="subject" placeholder="e.g., Feedback on AI suggestions" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="message">Message</Label>
                                    <Textarea id="message" placeholder="Your message..." rows={5} />
                                </div>
                                <Button className="w-full">Submit</Button>
                            </CardContent>
                        </Card>
                        <div className="mt-8 text-center text-muted-foreground">
                            <p className="flex items-center justify-center gap-2">
                                <Mail className="h-4 w-4" />
                                You can also reach us at <a href="mailto:support@travelwise.ai" className="text-primary hover:underline">support@travelwise.ai</a>
                            </p>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold font-headline mb-4">Frequently Asked Questions</h2>
                         <Accordion type="single" collapsible className="w-full">
                            {faqs.map((faq, index) => (
                            <AccordionItem value={`item-${index+1}`} key={index}>
                                <AccordionTrigger className="text-lg text-left">{faq.question}</AccordionTrigger>
                                <AccordionContent className="text-muted-foreground text-base">
                                {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </main>
        </div>
    )
}
