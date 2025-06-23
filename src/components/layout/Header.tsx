import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { UtensilsCrossed, MapPin, User, ShoppingCart } from 'lucide-react';

const Header: React.FC = () => {
  console.log('Header loaded');

  // Placeholder for cart items count
  const cartItemCount = 3;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <UtensilsCrossed className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg hidden sm:inline-block">FoodFleet</span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
           <Button variant="ghost" className="flex-shrink-0">
             <MapPin className="h-4 w-4 mr-2" />
             <span className="text-sm font-medium truncate">123 Main St, Anytown...</span>
           </Button>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/user-profile">
              <User className="h-5 w-5" />
              <span className="sr-only">User Profile</span>
            </Link>
          </Button>

          <Button variant="ghost" size="icon" className="relative" asChild>
            <Link to="/checkout">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  {cartItemCount}
                </span>
              )}
              <span className="sr-only">Open Cart</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;