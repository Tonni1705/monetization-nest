
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Settings, LogOut, Home, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import Footer from './Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  
  // Close mobile menu when changing routes
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Auth status - in a real app this would come from your auth context
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const toggleMenu = () => setMenuOpen(!menuOpen);
  
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    window.location.href = '/';
  };
  
  // Don't show navigation on auth pages
  if (isAuthPage) {
    return (
      <div className="min-h-screen animate-fade-in">
        {children}
      </div>
    );
  }

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
            {isLoggedIn ? (
              <>
                <Link to="/dashboard" className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location.pathname === '/dashboard' && "text-primary"
                )}>
                  Dashboard
                </Link>
                <Link to="/settings" className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location.pathname === '/settings' && "text-primary"
                )}>
                  Settings
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center justify-center h-9 px-4 rounded-md bg-secondary text-secondary-foreground text-sm font-medium transition-colors hover:bg-secondary/80"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium transition-colors hover:text-primary">
                  Log in
                </Link>
                <Link to="/signup" className="flex items-center justify-center h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium transition-colors hover:bg-primary/90">
                  Sign up
                </Link>
              </>
            )}
          </div>
          
          <button
            onClick={toggleMenu}
            className="flex md:hidden p-2 rounded-md hover:bg-secondary transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>
      
      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-sm flex flex-col pt-16 animate-fade-in md:hidden">
          <div className="container mx-auto px-4 py-6 flex flex-col space-y-6">
            {isLoggedIn ? (
              <>
                <Link to="/dashboard" className="flex items-center space-x-2 p-3 rounded-lg hover:bg-secondary">
                  <Home className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
                <Link to="/settings" className="flex items-center space-x-2 p-3 rounded-lg hover:bg-secondary">
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-2 p-3 rounded-lg hover:bg-secondary text-left"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Log out</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="flex items-center space-x-2 p-3 rounded-lg hover:bg-secondary">
                  <User className="h-5 w-5" />
                  <span>Log in</span>
                </Link>
                <Link to="/signup" className="flex items-center space-x-2 p-3 rounded-lg bg-primary/10 text-primary hover:bg-primary/20">
                  <Users className="h-5 w-5" />
                  <span>Sign up</span>
                </Link>
              </>
            )}
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
