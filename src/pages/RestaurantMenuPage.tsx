import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MenuItemCard from '@/components/MenuItemCard';

// shadcn/ui Components
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger, SheetFooter } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';

// Lucide Icons
import { Star, Clock, ShoppingCart } from 'lucide-react';

// Placeholder Data
const restaurantData = {
  name: 'The Golden Spoon',
  imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop',
  rating: 4.5,
  reviewCount: 350,
  cuisine: 'Italian',
  address: '456 Oak Avenue, Flavor Town',
  openingHours: '11:00 AM - 10:00 PM',
};

const menuItems = [
  { id: '1', name: 'Margherita Pizza', description: 'Classic pizza with fresh mozzarella, tomatoes, and basil.', price: 14.99, imageUrl: 'https://images.unsplash.com/photo-1594007654729-407ab85525af?q=80&w=2070&auto=format&fit=crop', category: 'Main Courses', hasCustomizations: false },
  { id: '2', name: 'Spaghetti Carbonara', description: 'A creamy pasta dish with pancetta, egg, and parmesan cheese.', price: 18.50, imageUrl: 'https://images.unsplash.com/photo-1608796335039-f4fcac879a95?q=80&w=1974&auto=format&fit=crop', category: 'Main Courses', hasCustomizations: true },
  { id: '3', name: 'Bruschetta', description: 'Toasted bread with tomatoes, garlic, olive oil, and basil.', price: 8.00, imageUrl: 'https://images.unsplash.com/photo-1505253716362-afb749408480?q=80&w=2070&auto=format&fit=crop', category: 'Appetizers', hasCustomizations: false },
  { id: '4', name: 'Caesar Salad', description: 'Crisp romaine lettuce with Caesar dressing, croutons, and parmesan.', price: 10.25, imageUrl: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=2070&auto=format&fit=crop', category: 'Appetizers', hasCustomizations: true },
  { id: '5', name: 'Tiramisu', description: 'A coffee-flavoured Italian dessert.', price: 9.50, imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=2070&auto=format&fit=crop', category: 'Desserts', hasCustomizations: false },
  { id: '6', name: 'Sparkling Water', description: '750ml bottle of imported sparkling water.', price: 4.00, imageUrl: 'https://images.unsplash.com/photo-1629094239843-69a4c8e74a87?q=80&w=1964&auto=format&fit=crop', category: 'Drinks', hasCustomizations: false },
];

const menuCategories = ['Appetizers', 'Main Courses', 'Desserts', 'Drinks'];

// Mock cart state for the sheet example
const sampleCart = [
    { name: "Margherita Pizza", quantity: 1, price: 14.99 },
    { name: "Caesar Salad", quantity: 2, price: 10.25 },
];

const RestaurantMenuPage = () => {
  console.log('RestaurantMenuPage loaded');

  const categorizedMenu = useMemo(() => {
    return menuCategories.map(category => ({
      category,
      items: menuItems.filter(item => item.category === category),
    }));
  }, []);

  const cartSubtotal = sampleCart.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartItemCount = sampleCart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container py-6 md:py-8">
        
        {/* Breadcrumb Navigation */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{restaurantData.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        {/* Restaurant Header Section */}
        <section className="flex flex-col md:flex-row items-start gap-6 md:gap-8 mb-8">
            <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-background ring-2 ring-primary">
                <AvatarImage src={restaurantData.imageUrl} alt={restaurantData.name} className="object-cover" />
                <AvatarFallback>{restaurantData.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
                <Badge variant="secondary" className="mb-2">{restaurantData.cuisine}</Badge>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{restaurantData.name}</h1>
                <div className="flex items-center gap-4 text-muted-foreground mt-2 text-sm">
                    <div className="flex items-center gap-1.5">
                        <Star className="h-4 w-4 text-yellow-500" fill="currentColor" />
                        <span className="font-medium text-foreground">{restaurantData.rating}</span>
                        <span>({restaurantData.reviewCount} reviews)</span>
                    </div>
                    <Separator orientation="vertical" className="h-4" />
                    <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4" />
                        <span>{restaurantData.openingHours}</span>
                    </div>
                </div>
                <p className="text-muted-foreground mt-1 text-sm">{restaurantData.address}</p>
            </div>
        </section>

        <Separator className="my-8" />

        {/* Menu Section */}
        <section>
          {categorizedMenu.map(({ category, items }) => (
            items.length > 0 && (
              <div key={category} id={category.toLowerCase().replace(' ', '-')} className="mb-10 scroll-mt-24">
                <h2 className="text-2xl font-bold tracking-tight mb-6">{category}</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {items.map(item => (
                    <MenuItemCard key={item.id} {...item} />
                  ))}
                </div>
              </div>
            )
          ))}
        </section>
      </main>

      {/* Cart Sheet and Trigger Button */}
      <Sheet>
        <SheetTrigger asChild>
          <Button className="fixed bottom-6 right-6 h-14 w-auto px-5 rounded-full shadow-lg z-40 text-base">
            <ShoppingCart className="mr-2 h-5 w-5" />
            View Cart ({cartItemCount})
          </Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col">
            <SheetHeader>
                <SheetTitle>Your Order</SheetTitle>
                <SheetDescription>Review items in your cart before checking out.</SheetDescription>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto -mx-6 px-6">
                {sampleCart.length > 0 ? (
                    <ul className="divide-y divide-border">
                        {sampleCart.map(item => (
                            <li key={item.name} className="flex justify-between items-center py-4">
                                <div>
                                    <p className="font-semibold">{item.name}</p>
                                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                </div>
                                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center">
                        <ShoppingCart className="h-16 w-16 text-muted-foreground/50 mb-4" />
                        <p className="font-semibold">Your cart is empty</p>
                        <p className="text-sm text-muted-foreground">Add items from the menu to get started.</p>
                    </div>
                )}
            </div>
            {sampleCart.length > 0 && (
                <SheetFooter className="mt-auto pt-4 border-t">
                    <div className="w-full space-y-4">
                        <div className="flex justify-between font-bold text-lg">
                            <span>Subtotal</span>
                            <span>${cartSubtotal.toFixed(2)}</span>
                        </div>
                        <Button size="lg" className="w-full" asChild>
                            <Link to="/checkout">Go to Checkout</Link>
                        </Button>
                    </div>
                </SheetFooter>
            )}
        </SheetContent>
      </Sheet>
      
      <Footer />
    </div>
  );
};

export default RestaurantMenuPage;