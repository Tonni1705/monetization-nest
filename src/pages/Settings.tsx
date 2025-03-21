
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, CreditCard, AlertTriangle, Save, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import PageTransition from '@/components/ui/PageTransition';
import Container from '@/components/ui/Container';
import MainLayout from '@/components/layout/MainLayout';

type SettingsTab = 'profile' | 'security' | 'payments';

const Settings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isCreator, setIsCreator] = useState(false);
  
  // Profile form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState('');
  
  // Service form state for creators
  const [services, setServices] = useState<Array<{
    id: string;
    title: string;
    description: string;
    duration: string;
    price: number;
  }>>([]);
  
  // Security form state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Payment form state
  const [paymentMethod, setPaymentMethod] = useState('');
  const [accountHolder, setAccountHolder] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!loggedIn) {
      navigate('/login');
      return;
    }
    
    // Get user type
    const userType = localStorage.getItem('userType') || 'user';
    setIsCreator(userType === 'creator');
    
    // Simulate fetching user data
    const fetchUserData = async () => {
      try {
        // Simulate API request
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        setName(localStorage.getItem('userName') || 'User');
        setEmail('user@example.com');
        setBio('Passionate about technology and creativity.');
        setProfileImage('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80');
        
        if (userType === 'creator') {
          setServices([
            {
              id: '1',
              title: 'Strategy Consultation',
              description: 'One-on-one consultation to develop a custom marketing strategy for your business',
              duration: '60 min',
              price: 120,
            }
          ]);
        }
        
        // Payment method
        setPaymentMethod('bank');
        setAccountHolder('John Doe');
        setAccountNumber('••••••••1234');
      } catch (error) {
        toast.error('Failed to load user data');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, [navigate]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, this would be an API call to update profile
      localStorage.setItem('userName', name);
      
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveSecurity = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      // Simple validation
      if (newPassword !== confirmPassword) {
        toast.error('Passwords do not match');
        setIsSaving(false);
        return;
      }
      
      if (newPassword.length < 6) {
        toast.error('Password must be at least 6 characters');
        setIsSaving(false);
        return;
      }
      
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Reset form
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      
      toast.success('Password changed successfully');
    } catch (error) {
      toast.error('Failed to update password');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSavePayments = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Payment information updated');
    } catch (error) {
      toast.error('Failed to update payment information');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddService = () => {
    setServices([
      ...services,
      {
        id: Date.now().toString(),
        title: '',
        description: '',
        duration: '30 min',
        price: 0,
      }
    ]);
  };

  const handleUpdateService = (id: string, field: string, value: string | number) => {
    setServices(services.map(service => 
      service.id === id ? { ...service, [field]: value } : service
    ));
  };

  const handleRemoveService = (id: string) => {
    setServices(services.filter(service => service.id !== id));
  };

  if (isLoading) {
    return (
      <MainLayout>
        <Container className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
          <div className="flex flex-col items-center">
            <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
            <p className="mt-4 text-muted-foreground">Loading settings...</p>
          </div>
        </Container>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <PageTransition>
        <Container className="py-8">
          <h1 className="text-3xl font-display font-bold mb-8">Settings</h1>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="md:w-64 shrink-0">
              <div className="space-y-1">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center p-3 rounded-lg text-left ${
                    activeTab === 'profile' 
                      ? 'bg-primary/10 text-primary' 
                      : 'hover:bg-secondary text-foreground'
                  }`}
                >
                  <User className="h-5 w-5 mr-3" />
                  <span>Profile</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('security')}
                  className={`w-full flex items-center p-3 rounded-lg text-left ${
                    activeTab === 'security' 
                      ? 'bg-primary/10 text-primary' 
                      : 'hover:bg-secondary text-foreground'
                  }`}
                >
                  <Lock className="h-5 w-5 mr-3" />
                  <span>Security</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('payments')}
                  className={`w-full flex items-center p-3 rounded-lg text-left ${
                    activeTab === 'payments' 
                      ? 'bg-primary/10 text-primary' 
                      : 'hover:bg-secondary text-foreground'
                  }`}
                >
                  <CreditCard className="h-5 w-5 mr-3" />
                  <span>{isCreator ? 'Payments & Payouts' : 'Payment Methods'}</span>
                </button>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="flex-1">
              <div className="bg-card p-6 rounded-xl border border-border/50 shadow-sm">
                {/* Profile Settings */}
                {activeTab === 'profile' && (
                  <form onSubmit={handleSaveProfile} className="space-y-6">
                    <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
                    
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                      <div className="relative">
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-background shadow-md">
                          <img 
                            src={profileImage || 'https://via.placeholder.com/150'} 
                            alt="Profile" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-1.5 rounded-full"
                          onClick={() => toast.info('Photo upload feature coming soon')}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil">
                            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                            <path d="m15 5 4 4"/>
                          </svg>
                        </button>
                      </div>
                      
                      <div className="flex-1 w-full space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium">
                              Full Name
                            </label>
                            <input
                              id="name"
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
                              placeholder="Your name"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">
                              Email
                            </label>
                            <input
                              id="email"
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
                              placeholder="your@email.com"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="bio" className="text-sm font-medium">
                            Bio
                          </label>
                          <textarea
                            id="bio"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            rows={4}
                            className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
                            placeholder="Tell others about yourself"
                          />
                          <p className="text-xs text-muted-foreground">
                            Briefly describe yourself, your expertise, or what you offer.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Creator Services (only for creators) */}
                    {isCreator && (
                      <div className="pt-6 mt-6 border-t border-border">
                        <div className="flex items-center justify-between mb-4">
                          <h2 className="text-xl font-semibold">Your Services</h2>
                          <button
                            type="button"
                            onClick={handleAddService}
                            className="inline-flex items-center justify-center h-8 px-3 text-sm bg-primary/10 text-primary font-medium rounded-md hover:bg-primary/20"
                          >
                            Add Service
                          </button>
                        </div>
                        
                        <div className="space-y-6">
                          {services.map((service, index) => (
                            <div key={service.id} className="p-4 border border-border rounded-lg bg-background/50">
                              <div className="flex justify-between mb-4">
                                <h3 className="font-medium">Service #{index + 1}</h3>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveService(service.id)}
                                  className="text-sm text-destructive hover:text-destructive/80"
                                >
                                  Remove
                                </button>
                              </div>
                              
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <label htmlFor={`service-title-${service.id}`} className="text-sm font-medium">
                                    Title
                                  </label>
                                  <input
                                    id={`service-title-${service.id}`}
                                    type="text"
                                    value={service.title}
                                    onChange={(e) => handleUpdateService(service.id, 'title', e.target.value)}
                                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
                                    placeholder="e.g. 1-on-1 Consultation"
                                  />
                                </div>
                                
                                <div className="space-y-2">
                                  <label htmlFor={`service-description-${service.id}`} className="text-sm font-medium">
                                    Description
                                  </label>
                                  <textarea
                                    id={`service-description-${service.id}`}
                                    value={service.description}
                                    onChange={(e) => handleUpdateService(service.id, 'description', e.target.value)}
                                    rows={2}
                                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
                                    placeholder="Describe what you offer in this service"
                                  />
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <label htmlFor={`service-duration-${service.id}`} className="text-sm font-medium">
                                      Duration
                                    </label>
                                    <select
                                      id={`service-duration-${service.id}`}
                                      value={service.duration}
                                      onChange={(e) => handleUpdateService(service.id, 'duration', e.target.value)}
                                      className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
                                    >
                                      <option value="15 min">15 minutes</option>
                                      <option value="30 min">30 minutes</option>
                                      <option value="45 min">45 minutes</option>
                                      <option value="60 min">60 minutes</option>
                                      <option value="90 min">90 minutes</option>
                                      <option value="120 min">120 minutes</option>
                                    </select>
                                  </div>
                                  
                                  <div className="space-y-2">
                                    <label htmlFor={`service-price-${service.id}`} className="text-sm font-medium">
                                      Price ($)
                                    </label>
                                    <input
                                      id={`service-price-${service.id}`}
                                      type="number"
                                      min="0"
                                      step="0.01"
                                      value={service.price}
                                      onChange={(e) => handleUpdateService(service.id, 'price', parseFloat(e.target.value) || 0)}
                                      className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
                                      placeholder="0.00"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                          
                          {services.length === 0 && (
                            <div className="text-center py-6 text-muted-foreground">
                              <p>You haven't added any services yet.</p>
                              <button
                                type="button"
                                onClick={handleAddService}
                                className="mt-2 text-primary hover:text-primary/80"
                              >
                                Add your first service
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={isSaving}
                        className="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:pointer-events-none"
                      >
                        {isSaving ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Save Changes
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
                
                {/* Security Settings */}
                {activeTab === 'security' && (
                  <form onSubmit={handleSaveSecurity} className="space-y-6">
                    <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="current-password" className="text-sm font-medium">
                          Current Password
                        </label>
                        <input
                          id="current-password"
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
                          placeholder="••••••••"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="new-password" className="text-sm font-medium">
                          New Password
                        </label>
                        <input
                          id="new-password"
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
                          placeholder="••••••••"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="confirm-password" className="text-sm font-medium">
                          Confirm New Password
                        </label>
                        <input
                          id="confirm-password"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
                          placeholder="••••••••"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="pt-4 mt-4 border-t border-border">
                      <h3 className="text-md font-medium mb-4">Two-Factor Authentication</h3>
                      
                      <div className="flex items-start space-x-4">
                        <div className="p-2 bg-muted/30 rounded-full">
                          <Lock className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium">Two-factor authentication is not enabled yet.</p>
                          <p className="text-sm text-muted-foreground mb-3">
                            Add an extra layer of security to your account by enabling two-factor authentication.
                          </p>
                          <button
                            type="button"
                            onClick={() => toast.info('2FA setup coming soon')}
                            className="text-sm text-primary hover:text-primary/80"
                          >
                            Enable 2FA
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={isSaving}
                        className="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:pointer-events-none"
                      >
                        {isSaving ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Update Password
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
                
                {/* Payment Settings */}
                {activeTab === 'payments' && (
                  <form onSubmit={handleSavePayments} className="space-y-6">
                    <h2 className="text-xl font-semibold mb-4">
                      {isCreator ? 'Payments & Payouts' : 'Payment Methods'}
                    </h2>
                    
                    {isCreator ? (
                      <>
                        <div className="space-y-4">
                          <p className="text-muted-foreground">
                            Connect your bank account to receive payouts from your services.
                          </p>
                          
                          <div className="flex items-center space-x-3">
                            <input
                              id="bank-transfer"
                              type="radio"
                              checked={paymentMethod === 'bank'}
                              onChange={() => setPaymentMethod('bank')}
                              className="h-4 w-4 text-primary"
                            />
                            <label htmlFor="bank-transfer" className="text-sm font-medium">
                              Bank Transfer
                            </label>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <input
                              id="paypal"
                              type="radio"
                              checked={paymentMethod === 'paypal'}
                              onChange={() => setPaymentMethod('paypal')}
                              className="h-4 w-4 text-primary"
                            />
                            <label htmlFor="paypal" className="text-sm font-medium">
                              PayPal
                            </label>
                          </div>
                          
                          {paymentMethod === 'bank' && (
                            <div className="pt-4 pl-7 space-y-4">
                              <div className="space-y-2">
                                <label htmlFor="account-holder" className="text-sm font-medium">
                                  Account Holder Name
                                </label>
                                <input
                                  id="account-holder"
                                  type="text"
                                  value={accountHolder}
                                  onChange={(e) => setAccountHolder(e.target.value)}
                                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
                                  placeholder="Full name on account"
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <label htmlFor="account-number" className="text-sm font-medium">
                                  Account Number
                                </label>
                                <input
                                  id="account-number"
                                  type="text"
                                  value={accountNumber}
                                  onChange={(e) => setAccountNumber(e.target.value)}
                                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
                                  placeholder="Your account number"
                                />
                              </div>
                            </div>
                          )}
                          
                          {paymentMethod === 'paypal' && (
                            <div className="pt-4 pl-7 space-y-4">
                              <div className="space-y-2">
                                <label htmlFor="paypal-email" className="text-sm font-medium">
                                  PayPal Email
                                </label>
                                <input
                                  id="paypal-email"
                                  type="email"
                                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
                                  placeholder="your@email.com"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div className="bg-muted/30 p-4 rounded-lg mt-6">
                          <div className="flex items-start space-x-3">
                            <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                            <div className="text-sm">
                              <p className="font-medium">Payout Information</p>
                              <p className="text-muted-foreground">
                                Payouts are processed every Monday. There is a minimum payout threshold of $20.
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="space-y-4">
                          <p className="text-muted-foreground">
                            Add a payment method to book services with creators.
                          </p>
                          
                          <div className="pt-4 space-y-4">
                            <div className="p-4 border border-border rounded-lg bg-background/50 flex justify-between items-center">
                              <div className="flex items-center">
                                <div className="p-2 bg-muted/30 rounded-md mr-3">
                                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                                </div>
                                <div>
                                  <p className="font-medium">Credit Card</p>
                                  <p className="text-sm text-muted-foreground">
                                    Visa ending in 4242
                                  </p>
                                </div>
                              </div>
                              <button
                                type="button"
                                className="text-sm text-primary hover:text-primary/80"
                              >
                                Edit
                              </button>
                            </div>
                            
                            <button
                              type="button"
                              onClick={() => toast.info('Payment method management coming soon')}
                              className="inline-flex items-center text-sm text-primary hover:text-primary/80"
                            >
                              + Add another payment method
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                    
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={isSaving}
                        className="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:pointer-events-none"
                      >
                        {isSaving ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Save Changes
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </Container>
      </PageTransition>
    </MainLayout>
  );
};

export default Settings;
