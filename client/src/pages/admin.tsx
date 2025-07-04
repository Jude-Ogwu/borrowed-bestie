import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  MessageSquare, 
  DollarSign, 
  TrendingUp,
  Star,
  Calendar,
  Mail,
  Settings,
  Package
} from "lucide-react";
import type { Listener, Booking, ContactMessage } from "@shared/schema";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("overview");
  const [authenticated, setAuthenticated] = useState(false);
  const [, navigate] = useLocation();

  // Check authentication status when component mounts
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("adminAuthenticated") === "true";
    if (!isAuthenticated) {
      navigate("/admin-login");
      return;
    }
    setAuthenticated(true);
  }, [navigate]);

  const { data: listeners = [] } = useQuery<Listener[]>({
    queryKey: ["/api/listeners"],
    enabled: authenticated, // Only fetch data if authenticated
  });

  const { data: contactMessages = [] } = useQuery<ContactMessage[]>({
    queryKey: ["/api/contact"],
    enabled: authenticated, // Only fetch data if authenticated
  });

  // Mock booking data for demo
  const mockBookings: Booking[] = [
    {
      id: 1,
      userId: null,
      listenerId: 1,
      sessionType: "30",
      sessionDate: new Date(),
      sessionTime: "3:00 PM",
      amount: "25.00",
      status: "confirmed",
      paymentIntentId: "pi_test_123",
      notes: "Feeling anxious about work presentation",
      createdAt: new Date()
    },
    {
      id: 2,
      userId: null,
      listenerId: 2,
      sessionType: "60",
      sessionDate: new Date(),
      sessionTime: "6:00 PM",
      amount: "40.00",
      status: "pending",
      paymentIntentId: null,
      notes: "Need support with relationship issues",
      createdAt: new Date()
    }
  ];

  // Mock digital products for marketplace
  const mockProducts = [
    {
      id: 1,
      name: "Stress Management Guide",
      description: "A comprehensive PDF guide for managing daily stress and anxiety",
      price: "12.99",
      type: "PDF",
      downloads: 128,
      imageUrl: "https://images.unsplash.com/photo-1606103920295-2a77870523a6?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      name: "Mindfulness Meditation Audio",
      description: "30-minute guided meditation audio for relaxation and focus",
      price: "9.99",
      type: "Audio",
      downloads: 85,
      imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=300&h=200&fit=crop"
    },
    {
      id: 3,
      name: "Emotional Resilience Course",
      description: "5-part video course on building emotional resilience",
      price: "29.99",
      type: "Video",
      downloads: 42,
      imageUrl: "https://images.unsplash.com/photo-1541199249251-f713e6145474?w=300&h=200&fit=crop"
    }
  ];

  const totalRevenue = mockBookings.reduce((sum, booking) => sum + parseFloat(booking.amount), 0);
  const productRevenue = mockProducts.reduce((sum, product) => sum + parseFloat(product.price) * product.downloads, 0);
  const completedSessions = mockBookings.filter(b => b.status === "confirmed").length;
  
  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    localStorage.removeItem("adminName");
    navigate("/admin-login");
  };

  // Don't render anything if not authenticated (will redirect in useEffect)
  if (!authenticated) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Admin Dashboard</h1>
          <p className="text-slate-600 dark:text-slate-300">
            Welcome, {localStorage.getItem("adminName") || "Admin"}. Manage listeners, sessions, and platform analytics
          </p>
        </div>
        <Button variant="outline" onClick={handleLogout}>Log Out</Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="listeners">Listeners</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${(totalRevenue + productRevenue).toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">+15% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Listeners</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{listeners.length}</div>
                <p className="text-xs text-muted-foreground">+2 new this week</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sessions Completed</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{completedSessions}</div>
                <p className="text-xs text-muted-foreground">+18% this week</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Digital Products</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockProducts.length}</div>
                <p className="text-xs text-muted-foreground">${productRevenue.toFixed(2)} revenue</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockBookings.slice(0, 3).map((booking) => {
                    const listener = listeners.find(l => l.id === booking.listenerId);
                    return (
                      <div key={booking.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                            <MessageSquare className="text-teal-600" size={16} />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{listener?.name || "Unknown"}</p>
                            <p className="text-xs text-muted-foreground">
                              {booking.sessionType}min session
                            </p>
                          </div>
                        </div>
                        <Badge variant={booking.status === "confirmed" ? "default" : "secondary"}>
                          {booking.status}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>New Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contactMessages.slice(0, 3).map((message) => (
                    <div key={message.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-coral-100 rounded-full flex items-center justify-center">
                          <Mail className="text-coral-600" size={16} />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{message.name}</p>
                          <p className="text-xs text-muted-foreground">{message.subject}</p>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(message.createdAt!).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Rest of tabs content remains the same */}
        <TabsContent value="listeners" className="space-y-6">
          {/* Existing listeners tab content */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Listener Management</h2>
            <Button className="bg-gradient-teal text-white hover:bg-teal-600">
              Add New Listener
            </Button>
          </div>

          <div className="grid gap-6">
            {listeners.map((listener) => (
              <Card key={listener.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img
                        src={listener.imageUrl}
                        alt={listener.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="text-lg font-semibold">{listener.name}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <Star className="text-yellow-400" size={16} fill="currentColor" />
                          <span className="text-sm">{listener.rating} ({listener.reviewCount} reviews)</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {listener.specialties.map((specialty) => (
                            <Badge key={specialty} variant="secondary" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Calendar size={16} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* New Marketplace Tab */}
        <TabsContent value="marketplace" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Digital Marketplace</h2>
            <Button className="bg-gradient-teal text-white hover:bg-teal-600">
              Add New Product
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <div className="aspect-video w-full overflow-hidden">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <Badge>{product.type}</Badge>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-lg">${product.price}</p>
                    <p className="text-sm text-slate-500">{product.downloads} sales</p>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">Edit</Button>
                    <Button size="sm" className="flex-1 bg-gradient-teal text-white hover:bg-teal-600">Analytics</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Rest of the tabs continue as before */}
        <TabsContent value="sessions" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Session Management</h2>
            <div className="flex space-x-2">
              <Input placeholder="Search sessions..." className="w-64" />
              <Button variant="outline">Filter</Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr>
                      <th className="text-left p-4">Session ID</th>
                      <th className="text-left p-4">Listener</th>
                      <th className="text-left p-4">Duration</th>
                      <th className="text-left p-4">Date & Time</th>
                      <th className="text-left p-4">Status</th>
                      <th className="text-left p-4">Amount</th>
                      <th className="text-left p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockBookings.map((booking) => {
                      const listener = listeners.find(l => l.id === booking.listenerId);
                      return (
                        <tr key={booking.id} className="border-b">
                          <td className="p-4">#{booking.id}</td>
                          <td className="p-4">{listener?.name || "Unknown"}</td>
                          <td className="p-4">{booking.sessionType} min</td>
                          <td className="p-4">
                            {new Date(booking.sessionDate).toLocaleDateString()} {booking.sessionTime}
                          </td>
                          <td className="p-4">
                            <Badge variant={booking.status === "confirmed" ? "default" : "secondary"}>
                              {booking.status}
                            </Badge>
                          </td>
                          <td className="p-4">${booking.amount}</td>
                          <td className="p-4">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Contact Messages</h2>
            <Button variant="outline">Mark All as Read</Button>
          </div>

          <div className="grid gap-4">
            {contactMessages.map((message) => (
              <Card key={message.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{message.name}</h3>
                      <p className="text-sm text-muted-foreground">{message.email}</p>
                      <p className="font-medium mt-2">{message.subject}</p>
                      <p className="text-sm mt-1">{message.message}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">
                        {new Date(message.createdAt!).toLocaleDateString()}
                      </p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Reply
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Platform Settings</h2>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Platform Name</label>
                  <Input defaultValue="Borrowed Bestie" />
                </div>
                <div>
                  <label className="text-sm font-medium">Support Email</label>
                  <Input defaultValue="hello@borrowedbestie.com" />
                </div>
                <div>
                  <label className="text-sm font-medium">Session Price (15min)</label>
                  <Input defaultValue="15" type="number" />
                </div>
                <div>
                  <label className="text-sm font-medium">Session Price (30min)</label>
                  <Input defaultValue="25" type="number" />
                </div>
                <div>
                  <label className="text-sm font-medium">Session Price (60min)</label>
                  <Input defaultValue="40" type="number" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Stripe Publishable Key</label>
                  <Input placeholder="pk_..." type="password" />
                </div>
                <div>
                  <label className="text-sm font-medium">Stripe Secret Key</label>
                  <Input placeholder="sk_..." type="password" />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button className="bg-gradient-teal text-white hover:bg-teal-600">
                Save Settings
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}