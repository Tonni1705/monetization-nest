
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BarChart, Calendar, Clock, Plus, DollarSign, User, MessageSquare } from 'lucide-react';
import PageTransition from '@/components/ui/PageTransition';
import Container from '@/components/ui/Container';
import MainLayout from '@/components/layout/MainLayout';
import { BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for the dashboard
const mockEarningsData = [
  { name: 'Jan', amount: 400 },
  { name: 'Feb', amount: 300 },
  { name: 'Mar', amount: 600 },
  { name: 'Apr', amount: 800 },
  { name: 'May', amount: 500 },
  { name: 'Jun', amount: 900 },
];

const mockBookings = [
  { id: 1, client: 'Alex Johnson', service: 'Consultation Call', date: '2023-06-15', time: '14:00', status: 'Upcoming' },
  { id: 2, client: 'Sam Taylor', service: 'Private Chat', date: '2023-06-14', time: '10:30', status: 'Completed' },
  { id: 3, client: 'Jordan Smith', service: 'Content Review', date: '2023-06-12', time: '16:00', status: 'Completed' },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isCreator, setIsCreator] = useState(false);
  const [userName, setUserName] = useState('');
  
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
    
    // Get user name
    const name = localStorage.getItem('userName') || 'User';
    setUserName(name);
    
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [navigate]);

  if (isLoading) {
    return (
      <MainLayout>
        <Container className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
          <div className="flex flex-col items-center">
            <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
            <p className="mt-4 text-muted-foreground">Loading your dashboard...</p>
          </div>
        </Container>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <PageTransition>
        <Container className="py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-display font-bold">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {userName}</p>
            </div>
            
            {isCreator && (
              <Link 
                to="/settings"
                className="mt-4 md:mt-0 inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground font-medium rounded-lg transition-all hover:bg-primary/90"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add New Service
              </Link>
            )}
          </div>
          
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-card rounded-xl p-6 border border-border/50 shadow-sm">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  {isCreator ? <DollarSign className="h-6 w-6 text-primary" /> : <Calendar className="h-6 w-6 text-primary" />}
                </div>
                <div>
                  <p className="text-muted-foreground">{isCreator ? "Total Earnings" : "Booked Services"}</p>
                  <p className="text-2xl font-semibold">{isCreator ? "$3,200" : "5"}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 border border-border/50 shadow-sm">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  {isCreator ? <User className="h-6 w-6 text-primary" /> : <Clock className="h-6 w-6 text-primary" />}
                </div>
                <div>
                  <p className="text-muted-foreground">{isCreator ? "Total Clients" : "Upcoming Sessions"}</p>
                  <p className="text-2xl font-semibold">{isCreator ? "24" : "2"}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 border border-border/50 shadow-sm">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  {isCreator ? <MessageSquare className="h-6 w-6 text-primary" /> : <MessageSquare className="h-6 w-6 text-primary" />}
                </div>
                <div>
                  <p className="text-muted-foreground">{isCreator ? "Active Conversations" : "Messages"}</p>
                  <p className="text-2xl font-semibold">{isCreator ? "8" : "3"}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Earnings Chart (Creators only) */}
          {isCreator && (
            <div className="bg-card rounded-xl p-6 border border-border/50 shadow-sm mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Earnings Overview</h2>
                <div className="text-sm text-muted-foreground">Last 6 months</div>
              </div>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ReBarChart data={mockEarningsData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </ReBarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
          
          {/* Bookings Table */}
          <div className="bg-card rounded-xl p-6 border border-border/50 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">{isCreator ? "Recent Bookings" : "Your Bookings"}</h2>
              <Link to="#" className="text-sm text-primary hover:text-primary/80">
                View all
              </Link>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Service</th>
                    {isCreator && <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Client</th>}
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Date</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Time</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockBookings.length > 0 ? (
                    mockBookings.map((booking) => (
                      <tr key={booking.id} className="border-b border-border hover:bg-muted/30">
                        <td className="px-4 py-4 text-sm">{booking.service}</td>
                        {isCreator && <td className="px-4 py-4 text-sm">{booking.client}</td>}
                        <td className="px-4 py-4 text-sm">{booking.date}</td>
                        <td className="px-4 py-4 text-sm">{booking.time}</td>
                        <td className="px-4 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            booking.status === 'Upcoming' 
                              ? 'bg-primary/10 text-primary' 
                              : 'bg-muted text-muted-foreground'
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                        No bookings found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </PageTransition>
    </MainLayout>
  );
};

export default Dashboard;
