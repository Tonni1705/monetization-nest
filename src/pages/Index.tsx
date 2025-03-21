
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, CreditCard, Users } from 'lucide-react';
import PageTransition from '@/components/ui/PageTransition';
import Container from '@/components/ui/Container';
import MainLayout from '@/components/layout/MainLayout';

const features = [
  {
    icon: <Shield className="h-8 w-8 text-primary" />,
    title: "Secure Connections",
    description: "Build relationships with your audience in a safe, private environment"
  },
  {
    icon: <CreditCard className="h-8 w-8 text-primary" />,
    title: "Simple Payments",
    description: "Get paid directly for your expertise and exclusive content"
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "Verified Members",
    description: "Connect with verified users to ensure quality interactions"
  }
];

const Index = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  return (
    <MainLayout>
      <PageTransition>
        {/* Hero Section */}
        <section className="relative pt-20 pb-20 md:pt-32 md:pb-32 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl animate-pulse-slow" />
          
          <Container className="relative">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-block mb-6 px-3 py-1 bg-primary/10 rounded-full animate-scale-in">
                <span className="text-xs font-medium text-primary">
                  The Future of Creator Monetization
                </span>
              </div>
              
              <h1 className="mb-6 text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight">
                Connect privately.<br />
                <span className="text-primary">Monetize directly.</span>
              </h1>
              
              <p className="mb-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                The minimalist platform for creators who value privacy and direct connections with their audience.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {isLoggedIn ? (
                  <Link
                    to="/dashboard"
                    className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  >
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/signup"
                      className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                    <Link
                      to="/login"
                      className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-secondary text-secondary-foreground font-medium rounded-lg transition-all hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
                    >
                      Log In
                    </Link>
                  </>
                )}
              </div>
            </div>
          </Container>
        </section>
        
        {/* Features Section */}
        <section className="py-20">
          <Container>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                The essentials, done right
              </h2>
              <p className="text-lg text-muted-foreground">
                A minimal platform focused on what truly matters
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col p-6 bg-card rounded-xl hover:shadow-md transition-all duration-300 border border-border/50"
                >
                  <div className="p-3 bg-primary/10 rounded-lg self-start mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-secondary/50">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Ready to take control of your creator journey?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join creators who value privacy, quality connections, and direct monetization.
              </p>
              <Link
                to={isLoggedIn ? "/dashboard" : "/signup"}
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                {isLoggedIn ? "Go to Dashboard" : "Start Creating Today"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </Container>
        </section>
      </PageTransition>
    </MainLayout>
  );
};

export default Index;
