
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ExternalLink, Users, MessageCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import Footer from './Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  
  // Close mobile menu when changing routes
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  
  const openTelegramBot = () => {
    window.open('https://t.me/TelegramPrivateBot', '_blank');
  };
  
  return (
    <div className="min-h-screen flex flex-col animate-fade-in">
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-primary/10 p-2 rounded-full transition-all duration-500 group-hover:bg-primary/20">
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                TP
              </div>
            </div>
            <h1 className="text-lg font-display font-semibold tracking-tight">
              Telegram Private
            </h1>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <button 
              onClick={openTelegramBot}
              className="flex items-center justify-center h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium transition-colors hover:bg-primary/90"
            >
              Connect
              <ExternalLink className="ml-2 h-4 w-4" />
            </button>
          </div>
          
          <button
            onClick={toggleMenu}
            className="p-2 rounded-md hover:bg-secondary transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>
      
      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-sm flex flex-col pt-16 animate-fade-in">
          <div className="container mx-auto px-4 py-6 flex flex-col space-y-6">
            <Link to="/faq" className="flex items-center space-x-2 p-3 rounded-lg hover:bg-secondary">
              <Info className="h-5 w-5" />
              <span>Knowledgebase</span>
            </Link>
            <a href="#" className="flex items-center space-x-2 p-3 rounded-lg hover:bg-secondary">
              <Users className="h-5 w-5" />
              <span>Vacancies</span>
            </a>
            <a href="#referral" className="flex items-center space-x-2 p-3 rounded-lg hover:bg-secondary">
              <Users className="h-5 w-5" />
              <span>Referral Program</span>
            </a>
            <button 
              onClick={openTelegramBot}
              className="flex items-center space-x-2 p-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <ExternalLink className="h-5 w-5" />
              <span>Connect</span>
            </button>
            <a 
              href="https://t.me/TelegramPrivateChannel" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 p-3 rounded-lg hover:bg-secondary"
            >
              <MessageCircle className="h-5 w-5" />
              <span>Join Our Telegram Channel</span>
            </a>
          </div>
        </div>
      )}
      
      <main className="flex-1 pt-16 pb-8">
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default MainLayout;
