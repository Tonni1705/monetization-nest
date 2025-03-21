
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import PageTransition from '@/components/ui/PageTransition';
import Container from '@/components/ui/Container';
import MainLayout from '@/components/layout/MainLayout';

const NotFound = () => {
  return (
    <MainLayout>
      <PageTransition>
        <Container className="flex items-center justify-center min-h-[calc(100vh-16rem)]">
          <div className="text-center max-w-md">
            <div className="relative mb-6 inline-block">
              <div className="text-[120px] font-display font-bold text-primary/10">404</div>
              <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="text-3xl font-display font-bold">Page not found</h1>
              </div>
            </div>
            
            <p className="text-lg text-muted-foreground mb-8">
              The page you're looking for doesn't exist or has been moved.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => window.history.back()}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-secondary text-secondary-foreground font-medium rounded-lg transition-all hover:bg-secondary/80"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </button>
              
              <Link
                to="/"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg transition-all hover:bg-primary/90"
              >
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </div>
          </div>
        </Container>
      </PageTransition>
    </MainLayout>
  );
};

export default NotFound;
