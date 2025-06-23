import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import OrderTracker, { OrderStatus } from '@/components/OrderTracker';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Phone, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const OrderTrackingPage = () => {
  console.log('OrderTrackingPage loaded');

  const [status, setStatus] = useState<OrderStatus>('placed');
  const [progress, setProgress] = useState(10);

  const orderStages: { status: OrderStatus; progress: number; delay: number }[] = [
    { status: 'placed', progress: 10, delay: 0 },
    { status: 'kitchen', progress: 40, delay: 5000 },
    { status: 'delivery', progress: 75, delay: 8000 },
    { status: 'delivered', progress: 100, delay: 10000 },
  ];

  useEffect(() => {
    const timeouts = orderStages.map((stage, index) => {
        if(index === 0) return null;
        return setTimeout(() => {
            setStatus(stage.status);
            setProgress(stage.progress);
        }, stage.delay);
    });

    // Cleanup timeouts on component unmount
    return () => {
      timeouts.forEach(timeoutId => {
        if(timeoutId) clearTimeout(timeoutId);
      });
    };
  }, []);

  const orderDetails = {
    id: "FD123-456XYZ",
    restaurantName: "Pizza Palace",
    estimatedDelivery: "8:45 PM - 9:00 PM",
    items: [
      { name: "1x Pepperoni Passion", price: 15.99 },
      { name: "1x Garlic Bread with Cheese", price: 5.49 },
      { name: "2x Diet Coke", price: 3.00 },
    ],
    total: 24.48,
    deliveryAddress: "123 Main St, Anytown, USA 12345"
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content: Tracker and Map */}
          <div className="lg:col-span-2 space-y-8">
            <OrderTracker
              currentStatus={status}
              orderId={orderDetails.id}
              estimatedDeliveryTime={orderDetails.estimatedDelivery}
            />

            {/* Progress Bar for smaller screens or extra detail */}
            <Card>
              <CardHeader>
                <CardTitle>Overall Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={progress} className="w-full" />
                <p className="text-sm text-muted-foreground mt-2">
                  {status === 'delivered' ? 'Your order has arrived. Enjoy!' : `Your order is on its way.`}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Driver Location</CardTitle>
                <CardDescription>Live map will be available once the driver is nearby.</CardDescription>
              </CardHeader>
              <CardContent className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                 <img 
                    src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=2500&auto=format&fit=crop" 
                    alt="Map placeholder showing a street map" 
                    className="w-full h-full object-cover rounded-md"
                  />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar: Order Details and Support */}
          <div className="lg:col-span-1 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>From {orderDetails.restaurantName}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {orderDetails.items.map(item => (
                    <li key={item.name} className="flex justify-between">
                      <span>{item.name}</span>
                      <span className="font-medium">${item.price.toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
                <Separator className="my-4" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${orderDetails.total.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                  <CardTitle>Need Help?</CardTitle>
                  <CardDescription>Contact support if you have an issue.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Phone className="h-4 w-4" /> Call Restaurant
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <MessageSquare className="h-4 w-4" /> Chat with Support
                </Button>
                <Button variant="default" className="w-full" asChild>
                    <Link to="/">Back to Homepage</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderTrackingPage;