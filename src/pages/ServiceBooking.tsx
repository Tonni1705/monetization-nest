
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, CreditCard, Check, X, AlertCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import PageTransition from '@/components/ui/PageTransition';
import Container from '@/components/ui/Container';
import MainLayout from '@/components/layout/MainLayout';

// Mock service data
const mockServices = [
  {
    id: '1',
    title: 'Strategy Consultation',
    description: 'One-on-one consultation to develop a custom marketing strategy for your business',
    duration: '60 min',
    price: 120,
    creator: {
      name: 'Alex Smith',
      profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    }
  },
  {
    id: '2',
    title: 'SEO Audit & Recommendations',
    description: 'Comprehensive analysis of your website SEO with actionable recommendations',
    duration: '45 min',
    price: 95,
    creator: {
      name: 'Alex Smith',
      profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    }
  },
];

// Mock available time slots
const mockTimeSlots = [
  { date: '2023-06-20', slots: ['10:00', '12:00', '15:00', '17:00'] },
  { date: '2023-06-21', slots: ['09:00', '11:00', '14:00', '16:00'] },
  { date: '2023-06-22', slots: ['10:00', '13:00', '16:00', '18:00'] },
];

const STEPS = {
  SELECT_DATE: 0,
  PAYMENT: 1,
  CONFIRMATION: 2,
};

const ServiceBooking = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const [service, setService] = useState<typeof mockServices[0] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(STEPS.SELECT_DATE);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!loggedIn) {
      navigate('/login', { state: { returnTo: `/book/${serviceId}` } });
      return;
    }
    
    // In a real app, fetch service details from API
    const fetchService = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Find service by ID
        const foundService = mockServices.find(s => s.id === serviceId);
        if (foundService) {
          setService(foundService);
        } else {
          toast.error('Service not found');
          navigate('/dashboard');
        }
      } catch (error) {
        toast.error('Failed to load service details');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchService();
  }, [serviceId, navigate]);

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedTime(null); // Reset time when date changes
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleContinue = () => {
    if (currentStep === STEPS.SELECT_DATE) {
      if (!selectedDate || !selectedTime) {
        toast.error('Please select both date and time');
        return;
      }
      setCurrentStep(STEPS.PAYMENT);
    } else if (currentStep === STEPS.PAYMENT) {
      if (!isAgeVerified) {
        toast.error('Please verify your age to continue');
        return;
      }
      processPayment();
    }
  };

  const processPayment = async () => {
    setPaymentLoading(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success!
      setCurrentStep(STEPS.CONFIRMATION);
      setBookingComplete(true);
      toast.success('Booking confirmed!');
    } catch (error) {
      toast.error('Payment processing failed');
    } finally {
      setPaymentLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case STEPS.SELECT_DATE:
        return (
          <div className="animate-fade-in">
            <h2 className="text-xl font-semibold mb-6">Select Date & Time</h2>
            
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3">Choose a date</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {mockTimeSlots.map((slot) => (
                  <button
                    key={slot.date}
                    className={`p-4 rounded-lg border ${
                      selectedDate === slot.date
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/30'
                    } transition-all`}
                    onClick={() => handleDateSelect(slot.date)}
                  >
                    <span className="block font-medium">
                      {new Date(slot.date).toLocaleDateString('en-US', { weekday: 'short' })}
                    </span>
                    <span className="block mt-1 text-sm text-muted-foreground">
                      {new Date(slot.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            
            {selectedDate && (
              <div className="mb-6 animate-fade-in">
                <h3 className="text-sm font-medium mb-3">Choose a time</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {mockTimeSlots
                    .find(slot => slot.date === selectedDate)
                    ?.slots.map((time) => (
                      <button
                        key={time}
                        className={`p-3 rounded-lg border ${
                          selectedTime === time
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/30'
                        } transition-all`}
                        onClick={() => handleTimeSelect(time)}
                      >
                        <span className="block font-medium">{time}</span>
                      </button>
                    ))}
                </div>
              </div>
            )}
          </div>
        );
        
      case STEPS.PAYMENT:
        return (
          <div className="animate-fade-in">
            <h2 className="text-xl font-semibold mb-6">Payment Details</h2>
            
            <div className="bg-muted/30 p-4 rounded-lg mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Date</span>
                <span className="font-medium">
                  {new Date(selectedDate!).toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Time</span>
                <span className="font-medium">{selectedTime}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Duration</span>
                <span className="font-medium">{service?.duration}</span>
              </div>
              <div className="border-t border-border mt-3 pt-3 flex justify-between">
                <span className="font-medium">Total</span>
                <span className="font-semibold">${service?.price}</span>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3">Card Information</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="cardNumber" className="sr-only">Card Number</label>
                  <input
                    id="cardNumber"
                    type="text"
                    placeholder="Card Number"
                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiration" className="sr-only">Expiration Date</label>
                    <input
                      id="expiration"
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div>
                    <label htmlFor="cvc" className="sr-only">CVC</label>
                    <input
                      id="cvc"
                      type="text"
                      placeholder="CVC"
                      className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={isAgeVerified}
                  onChange={() => setIsAgeVerified(!isAgeVerified)}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded border ${isAgeVerified ? 'bg-primary border-primary text-primary-foreground' : 'border-input'} flex items-center justify-center mr-2`}>
                  {isAgeVerified && <Check className="h-4 w-4" />}
                </div>
                <span className="text-sm">I confirm that I am over 18 years of age</span>
              </label>
            </div>
          </div>
        );
        
      case STEPS.CONFIRMATION:
        return (
          <div className="text-center py-8 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <Check className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Booking Confirmed!</h2>
            <p className="text-muted-foreground mb-6">
              Your session with {service?.creator.name} has been scheduled for{' '}
              {new Date(selectedDate!).toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })}{' '}
              at {selectedTime}.
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              You'll receive a confirmation email with all the details.
            </p>
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
            >
              Go to Dashboard
            </Link>
          </div>
        );
    }
  };

  if (isLoading) {
    return (
      <MainLayout>
        <Container className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
          <div className="flex flex-col items-center">
            <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
            <p className="mt-4 text-muted-foreground">Loading service details...</p>
          </div>
        </Container>
      </MainLayout>
    );
  }

  if (!service) {
    return (
      <MainLayout>
        <Container className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Service not found</h1>
            <p className="text-muted-foreground mb-6">The service you're looking for doesn't exist or has been removed.</p>
            <Link to="/dashboard" className="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground font-medium rounded-lg">
              Return to Dashboard
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
          {/* Back button */}
          {currentStep !== STEPS.CONFIRMATION && (
            <button
              onClick={() => currentStep === STEPS.SELECT_DATE ? navigate(-1) : setCurrentStep(currentStep - 1)}
              className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-6"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {currentStep === STEPS.SELECT_DATE ? 'Back to service' : 'Back to schedule'}
            </button>
          )}
          
          {/* Service Info */}
          {currentStep !== STEPS.CONFIRMATION && (
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={service.creator.profileImage} 
                  alt={service.creator.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-xl font-semibold">{service.title}</h2>
                  <p className="text-sm text-muted-foreground">with {service.creator.name}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {service.duration}
                </div>
                <div className="flex items-center">
                  <CreditCard className="h-4 w-4 mr-1" />
                  ${service.price}
                </div>
              </div>
            </div>
          )}
          
          {/* Step Progress */}
          {currentStep !== STEPS.CONFIRMATION && (
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep >= STEPS.SELECT_DATE ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    {currentStep > STEPS.SELECT_DATE ? <Check className="h-4 w-4" /> : '1'}
                  </div>
                  <div className={`h-1 w-12 mx-2 ${
                    currentStep > STEPS.SELECT_DATE ? 'bg-primary' : 'bg-muted'
                  }`} />
                </div>
                
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep >= STEPS.PAYMENT ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    {currentStep > STEPS.PAYMENT ? <Check className="h-4 w-4" /> : '2'}
                  </div>
                  <div className={`h-1 w-12 mx-2 ${
                    currentStep > STEPS.PAYMENT ? 'bg-primary' : 'bg-muted'
                  }`} />
                </div>
                
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep >= STEPS.CONFIRMATION ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    3
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between mt-2 text-xs">
                <span className={currentStep >= STEPS.SELECT_DATE ? 'text-foreground font-medium' : 'text-muted-foreground'}>Schedule</span>
                <span className={currentStep >= STEPS.PAYMENT ? 'text-foreground font-medium' : 'text-muted-foreground'}>Payment</span>
                <span className={currentStep >= STEPS.CONFIRMATION ? 'text-foreground font-medium' : 'text-muted-foreground'}>Confirmation</span>
              </div>
            </div>
          )}
          
          {/* Step Content */}
          <div className="bg-card p-6 rounded-xl border border-border/50 shadow-sm">
            {renderStepContent()}
          </div>
          
          {/* Footer Actions */}
          {currentStep !== STEPS.CONFIRMATION && (
            <div className="mt-8 flex justify-end">
              <button
                onClick={handleContinue}
                disabled={
                  (currentStep === STEPS.SELECT_DATE && (!selectedDate || !selectedTime)) ||
                  paymentLoading
                }
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:pointer-events-none"
              >
                {paymentLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  currentStep === STEPS.PAYMENT ? 'Confirm Payment' : 'Continue'
                )}
              </button>
            </div>
          )}
        </Container>
      </PageTransition>
    </MainLayout>
  );
};

export default ServiceBooking;
