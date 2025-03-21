
import React, { useRef, useEffect } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import PageTransition from '@/components/ui/PageTransition';
import Container from '@/components/ui/Container';
import MainLayout from '@/components/layout/MainLayout';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const features = [
  {
    title: "Private Communications",
    description: "End-to-end encrypted messaging with your audience"
  },
  {
    title: "Direct Monetization",
    description: "Set your own rates and receive payments instantly"
  },
  {
    title: "Seamless Integration",
    description: "Works directly through Telegram - no additional apps needed"
  },
  {
    title: "Low Commission",
    description: "Only 10% fee - among the lowest in the industry"
  }
];

const benefits = [
  "Full control over your content and pricing",
  "Direct connection with your audience",
  "No algorithm to beat - 100% reach",
  "Instant payments with multiple payout options",
  "Built-in privacy and security features"
];

const testimonials = [
  {
    name: "Sophie K.",
    role: "Digital Artist",
    content: "Telegram Private has transformed how I monetize my art. The direct connection with my fans and the low commission rate has doubled my monthly income.",
    avatar: "https://i.pravatar.cc/150?img=1"
  },
  {
    name: "Mark J.",
    role: "Finance Advisor",
    content: "After years on mainstream platforms, the privacy and direct monetization Telegram Private offers is a game-changer. My clients love the secure communication.",
    avatar: "https://i.pravatar.cc/150?img=2"
  },
  {
    name: "Elena R.",
    role: "Fitness Coach",
    content: "The simplicity is what I love most. I can focus on creating content and coaching rather than fighting algorithms. My income is more stable than ever.",
    avatar: "https://i.pravatar.cc/150?img=3"
  }
];

const faqs = [
  {
    question: "How do I start monetizing my content on Telegram Private?",
    answer: "Getting started is simple. Just connect your Telegram account through our bot, set up your creator profile, and define your services. Once approved, you can start accepting bookings immediately."
  },
  {
    question: "What is the commission fee structure?",
    answer: "Telegram Private takes a flat 10% commission on all transactions, which is among the lowest in the industry. This ensures creators keep more of what they earn."
  },
  {
    question: "How and when do I get paid?",
    answer: "Payments are processed every Monday for the previous week's earnings. You can choose to receive funds via bank transfer, crypto, or other supported payment methods in your settings."
  },
  {
    question: "Is my content and communication private?",
    answer: "Absolutely. We prioritize privacy and security. All communications and content shared between you and your audience remain entirely private and encrypted."
  },
  {
    question: "How does the referral program work?",
    answer: "When you refer another creator, you earn 5% of their earnings for the first 3 months. There's no limit to how many creators you can refer, making it a great passive income opportunity."
  }
];

const Index = () => {
  const openTelegramBot = () => {
    window.open('https://t.me/TelegramPrivateBot', '_blank');
  };
  
  const openTelegramChannel = () => {
    window.open('https://t.me/TelegramPrivateChannel', '_blank');
  };
  
  const featuresRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll features carousel
  useEffect(() => {
    const interval = setInterval(() => {
      if (featuresRef.current) {
        const scrollAmount = featuresRef.current.scrollLeft + 300;
        if (scrollAmount >= featuresRef.current.scrollWidth) {
          featuresRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          featuresRef.current.scrollTo({ left: scrollAmount, behavior: 'smooth' });
        }
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <MainLayout>
      <PageTransition>
        {/* Hero Section */}
        <section className="relative pt-20 pb-20 md:pt-32 md:pb-32 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl animate-pulse-slow" />
          
          <Container className="relative">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="mb-6 text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight">
                Monetize Your Expertise on Telegram.
                <span className="text-primary block mt-2">Privately & Directly.</span>
              </h1>
              
              <p className="mb-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                The minimalist platform for creators who value privacy and direct connections with their audience. No middlemen, no algorithms.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={openTelegramBot}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  Start Earning on Telegram
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          </Container>
        </section>
        
        {/* Benefits Section */}
        <section className="py-20 bg-secondary/50">
          <Container>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Why Join Telegram Private?
              </h2>
              <p className="text-lg text-muted-foreground">
                The essentials that matter for serious creators
              </p>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <div className="mr-3 mt-1 bg-primary/10 p-1 rounded-full">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-20">
          <Container>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Creator Success Stories
              </h2>
              <p className="text-lg text-muted-foreground">
                Hear from creators who've grown their business with us
              </p>
            </div>
            
            <Carousel className="w-full max-w-5xl mx-auto">
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <Card className="border border-border/50 h-full">
                      <CardContent className="p-6 flex flex-col h-full">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                            <img 
                              src={testimonial.avatar} 
                              alt={testimonial.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">{testimonial.name}</h3>
                            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                          </div>
                        </div>
                        <p className="text-sm flex-grow">{testimonial.content}</p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="hidden md:flex justify-center mt-8">
                <CarouselPrevious className="relative static mr-2 translate-y-0" />
                <CarouselNext className="relative static translate-y-0" />
              </div>
            </Carousel>
          </Container>
        </section>
        
        {/* FAQ Section */}
        <section className="py-20 bg-secondary/30">
          <Container>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-muted-foreground">
                Quick answers to common questions
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto mb-10">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            
            <div className="text-center">
              <a 
                href="/faq"
                className="inline-flex items-center justify-center text-primary hover:text-primary/80 transition-colors"
              >
                View Full Knowledgebase
                <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </div>
          </Container>
        </section>
        
        {/* Features Carousel */}
        <section className="py-20">
          <Container>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Core Features
              </h2>
              <p className="text-lg text-muted-foreground">
                Designed for privacy, simplicity and monetization
              </p>
            </div>
            
            <div 
              ref={featuresRef} 
              className="flex gap-6 overflow-x-auto pb-6 snap-x scrollbar-hide -mx-4 px-4"
            >
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="min-w-[280px] snap-start p-6 bg-card rounded-xl hover:shadow-md transition-all duration-300 border border-border/50 flex-shrink-0"
                >
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
        
        {/* Referral Program Section */}
        <section id="referral" className="py-20 bg-secondary/50">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Referral Program
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Earn 5% of referred creator earnings for 3 months. There's no limit to how many creators you can refer.
              </p>
              <button
                onClick={openTelegramBot}
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Refer & Earn
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </Container>
        </section>
        
        {/* Final CTA Section */}
        <section className="py-20">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Ready to take control of your creator journey?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join creators who value privacy, quality connections, and direct monetization.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={openTelegramBot}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  Start Earning on Telegram
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
                <button
                  onClick={openTelegramChannel}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-secondary text-secondary-foreground font-medium rounded-lg transition-all hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
                >
                  Join Our Telegram Channel
                </button>
              </div>
            </div>
          </Container>
        </section>
      </PageTransition>
    </MainLayout>
  );
};

export default Index;
