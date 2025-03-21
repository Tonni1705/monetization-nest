
import React from 'react';
import { cn } from '@/lib/utils';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children, className }) => {
  return (
    <div 
      className={cn(
        "animate-slide-in opacity-0",
        className
      )}
      style={{ animationFillMode: 'forwards', animationDelay: '50ms' }}
    >
      {children}
    </div>
  );
};

export default PageTransition;
