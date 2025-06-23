import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import { toast } from 'sonner';

interface LocationSearchBarProps {
  onLocationSet: (location: string) => void;
}

const LocationSearchBar: React.FC<LocationSearchBarProps> = ({ onLocationSet }) => {
  const [inputValue, setInputValue] = useState('');

  console.log('LocationSearchBar loaded');

  const handleGeolocation = () => {
    console.log('Attempting to get user geolocation...');
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser.');
      return;
    }

    toast.info('Fetching your location...');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // In a real app, you would reverse-geocode these coordinates.
        // For this mock, we'll just use a placeholder string.
        const locationString = `Current Location (${latitude.toFixed(2)}, ${longitude.toFixed(2)})`;
        toast.success('Location found!');
        setInputValue(locationString);
        onLocationSet(locationString);
      },
      () => {
        toast.error('Unable to retrieve your location. Please grant permission or enter your address manually.');
      }
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onLocationSet(inputValue.trim());
      toast.success(`Searching for restaurants near: ${inputValue.trim()}`);
    } else {
      toast.warning('Please enter an address.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
      <div className="relative flex items-center">
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter your delivery address..."
          className="h-12 pl-4 pr-12 text-md rounded-full shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label="Delivery address"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={handleGeolocation}
          className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full text-muted-foreground hover:text-primary"
          aria-label="Use current location"
        >
          <MapPin className="h-5 w-5" />
        </Button>
      </div>
    </form>
  );
};

export default LocationSearchBar;