
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Clock, DollarSign, Calendar, MessageSquare, Share2, Shield } from 'lucide-react';
import { toast } from 'sonner';
import PageTransition from '@/components/ui/PageTransition';
import Container from '@/components/ui/Container';
import MainLayout from '@/components/layout/MainLayout';

// Mock creator profile data
const mockCreatorProfile = {
  username: 'alexsmith',
  name: 'Alex Smith',
  title: 'Digital Marketing Consultant',
  bio: 'Helping businesses grow their online presence with proven marketing strategies. I specialize in SEO, content marketing, and social media management.',
  location: 'San Francisco, CA',
  profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
  verified: true,
  rating: 4.9,
  reviewCount: 127,
  services: [
    {
      id: 1,
      title: 'Strategy Consultation',
      description: 'One-on-one consultation to develop a custom marketing strategy for your business',
      duration: '60 min',
      price: 120,
    },
    {
      id: 2,
      title: 'SEO Audit & Recommendations',
      description: 'Comprehensive analysis of your website SEO with actionable recommendations',
      duration: '45 min',
      price: 95,
    },
    {
      id: 3,
      title: 'Content Calendar Planning',
      description: 'Create a 3-month content calendar tailored to your business goals',
      duration: '90 min',
      price: 150,
    },
  ],
};

const CreatorProfile = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<typeof mockCreatorProfile | null>(null);

  useEffect(() => {
    // In a real app, we would fetch the creator profile by username
    const fetchProfile = async () => {
      try {
        // Simulate API request
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // For demo purposes, we'll just use the mock data
        if (username === mockCreatorProfile.username) {
          setProfile(mockCreatorProfile);
        } else {
          // If username doesn't match our mock data, we'd normally show a 404
          // But for the demo, let's just use the mock data
          setProfile({
            ...mockCreatorProfile,
            username: username || 'unknown',
            name: username?.charAt(0).toUpperCase() + username?.slice(1) || 'Unknown Creator',
          });
        }
      } catch (error) {
        toast.error('Failed to load creator profile');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  const handleShare = () => {
    // In a real app, this would copy the profile URL to clipboard
    navigator.clipboard.writeText(window.location.href)
      .then(() => toast.success('Profile link copied to clipboard'))
      .catch(() => toast.error('Failed to copy link'));
  };

  if (isLoading) {
    return (
      <MainLayout>
        <Container className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
          <div className="flex flex-col items-center">
            <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
            <p className="mt-4 text-muted-foreground">Loading profile...</p>
          </div>
        </Container>
      </MainLayout>
    );
  }

  if (!profile) {
    return (
      <MainLayout>
        <Container className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Creator not found</h1>
            <p className="text-muted-foreground mb-6">The creator you're looking for doesn't exist or has been removed.</p>
            <Link to="/" className="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground font-medium rounded-lg">
              Return to Home
            </Link>
          </div>
        </Container>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <PageTransition>
        <Container className="py-8">
          {/* Creator Header */}
          <div className="mb-8 flex flex-col md:flex-row gap-8 items-start">
            <div className="relative">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-background shadow-md">
                <img 
                  src={profile.profileImage} 
                  alt={profile.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              {profile.verified && (
                <div className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-1 rounded-full">
                  <Shield className="h-4 w-4" />
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-display font-bold">{profile.name}</h1>
                  <p className="text-xl text-muted-foreground">{profile.title}</p>
                  <div className="flex items-center mt-2">
                    <span className="text-sm bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                      ★ {profile.rating}
                    </span>
                    <span className="mx-2 text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">{profile.reviewCount} reviews</span>
                    <span className="mx-2 text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">{profile.location}</span>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={handleShare}
                    className="inline-flex items-center justify-center p-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                    aria-label="Share profile"
                  >
                    <Share2 className="h-5 w-5" />
                  </button>
                  <Link
                    to="#"
                    className="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Message
                  </Link>
                </div>
              </div>
              
              <p className="mt-4 text-foreground max-w-3xl">{profile.bio}</p>
            </div>
          </div>
          
          {/* Services List */}
          <div className="mb-8">
            <h2 className="text-2xl font-display font-bold mb-6">Available Services</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {profile.services.map((service) => (
                <div 
                  key={service.id}
                  className="bg-card rounded-xl p-6 border border-border/50 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex justify-between mb-3">
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                    <div className="flex items-center text-lg font-medium">
                      <DollarSign className="h-4 w-4 text-muted-foreground mr-1" />
                      {service.price}
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  
                  <div className="flex items-center text-sm text-muted-foreground mb-5">
                    <Clock className="h-4 w-4 mr-1" />
                    {service.duration}
                  </div>
                  
                  <Link
                    to={`/book/${service.id}`}
                    className="w-full inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Book Now
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </PageTransition>
    </MainLayout>
  );
};

export default CreatorProfile;
