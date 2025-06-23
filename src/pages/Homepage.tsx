import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LocationSearchBar from '@/components/LocationSearchBar';
import RestaurantCard from '@/components/RestaurantCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Utensils } from 'lucide-react';

// Mock data matching the RestaurantCardProps interface
const mockRestaurants = [
  {
    slug: 'the-gourmet-kitchen',
    name: 'The Gourmet Kitchen',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    cuisineTags: ['Italian', 'Pizza', 'Pasta'],
    rating: 4.7,
    deliveryTime: '25-35 min',
  },
  {
    slug: 'sushi-zen',
    name: 'Sushi Zen',
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
    cuisineTags: ['Japanese', 'Sushi', 'Healthy'],
    rating: 4.9,
    deliveryTime: '30-40 min',
  },
  {
    slug: 'taco-fiesta',
    name: 'Taco Fiesta',
    imageUrl: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80',
    cuisineTags: ['Mexican', 'Tacos', 'Burritos'],
    rating: 4.5,
    deliveryTime: '20-30 min',
  },
  {
    slug: 'burger-bliss',
    name: 'Burger Bliss',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=699&q=80',
    cuisineTags: ['American', 'Burgers', 'Fries'],
    rating: 4.6,
    deliveryTime: '15-25 min',
  },
   {
    slug: 'pho-king-good',
    name: 'Pho King Good',
    imageUrl: 'https://images.unsplash.com/photo-1585101647425-00b8a1c970ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
    cuisineTags: ['Vietnamese', 'Noodles'],
    rating: 4.8,
    deliveryTime: '35-45 min',
  },
  {
    slug: 'curry-house',
    name: 'Curry House',
    imageUrl: 'https://images.unsplash.com/photo-1598515214211-89d3c7373b9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
    cuisineTags: ['Indian', 'Spicy', 'Vegan'],
    rating: 4.7,
    deliveryTime: '30-40 min',
  },
];

const Homepage = () => {
  console.log('Homepage loaded');
  const [locationIsSet, setLocationIsSet] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLocationSet = (location: string) => {
    console.log('Location set to:', location);
    setIsLoading(true);
    setLocationIsSet(true);

    // Simulate fetching data after location is set
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const renderRestaurantGrid = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {mockRestaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.slug} {...restaurant} />
      ))}
    </div>
  );

  const renderSkeletons = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="space-y-3">
          <Skeleton className="h-40 w-full rounded-lg" />
          <div className="space-y-2 p-1">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 text-center bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1740&q=80')"}}>
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative container">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
                    Order food to your door
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-white/90">
                    Enter your address and we'll find the best restaurants near you.
                </p>
                <div className="mt-8">
                    <LocationSearchBar onLocationSet={handleLocationSet} />
                </div>
            </div>
        </section>

        {/* Restaurant List Section */}
        <section id="restaurants" className="py-12 md:py-20">
          <div className="container">
            {!locationIsSet ? (
              <div className="text-center py-12">
                <Utensils className="mx-auto h-12 w-12 text-muted-foreground" />
                <h2 className="mt-4 text-2xl font-semibold">Discover restaurants near you</h2>
                <p className="mt-2 text-muted-foreground">Enter your address above to get started.</p>
              </div>
            ) : (
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-6">Restaurants Near You</h2>
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="pizza">Pizza</TabsTrigger>
                    <TabsTrigger value="sushi">Sushi</TabsTrigger>
                    <TabsTrigger value="top-rated">Top Rated</TabsTrigger>
                  </TabsList>
                  <TabsContent value="all">
                    {isLoading ? renderSkeletons() : renderRestaurantGrid()}
                  </TabsContent>
                  <TabsContent value="pizza">
                    {/* In a real app, this would be filtered data */}
                    <p className="text-center text-muted-foreground py-8">Pizza restaurants would be shown here.</p>
                  </TabsContent>
                   <TabsContent value="sushi">
                    <p className="text-center text-muted-foreground py-8">Sushi restaurants would be shown here.</p>
                  </TabsContent>
                   <TabsContent value="top-rated">
                     <p className="text-center text-muted-foreground py-8">Top rated restaurants would be shown here.</p>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Homepage;