
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageTransition from '@/components/ui/PageTransition';
import Container from '@/components/ui/Container';
import MainLayout from '@/components/layout/MainLayout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

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

const FAQ = () => {
  const openTelegramBot = () => {
    window.open('https://t.me/TelegramPrivateBot', '_blank');
  };

  return (
    <MainLayout>
      <PageTransition>
        <section className="py-20">
          <Container>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
                Frequently Asked Questions
              </h1>
              <p className="text-lg text-muted-foreground">
                Everything you need to know about Telegram Private
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto mb-16">
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
              <h2 className="text-2xl font-display font-bold mb-6">
                Have more questions?
              </h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={openTelegramBot}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  Contact Support
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          </Container>
        </section>
      </PageTransition>
    </MainLayout>
  );
};

export default FAQ;
