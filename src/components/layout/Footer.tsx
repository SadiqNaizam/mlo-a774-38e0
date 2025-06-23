import React from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed } from 'lucide-react';

const Footer: React.FC = () => {
  console.log('Footer loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted text-muted-foreground border-t">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
                 <UtensilsCrossed className="h-5 w-5 text-primary" />
                 <span className="text-sm font-semibold text-foreground">FoodFleet</span>
            </div>
            <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm">
              <Link to="/about" className="hover:text-primary transition-colors">About Us</Link>
              <Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link>
              <Link to="/support" className="hover:text-primary transition-colors">Contact Support</Link>
              <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
              <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            </nav>
        </div>
        <div className="mt-8 pt-6 border-t border-border/50 text-center text-sm">
            <p>&copy; {currentYear} FoodFleet. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;