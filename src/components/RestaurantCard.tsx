import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock } from "lucide-react";
import { Link } from 'react-router-dom';

interface RestaurantCardProps {
  slug: string;
  name: string;
  imageUrl: string;
  cuisineTags: string[];
  rating: number;
  deliveryTime: string; // e.g., "25-35 min"
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  slug,
  name,
  imageUrl,
  cuisineTags,
  rating,
  deliveryTime,
}) => {
  console.log(`RestaurantCard loaded for: ${name}`);

  // Note: The route is currently static as per App.tsx. 
  // A future implementation might use the slug: `/restaurant/${slug}`
  const restaurantLink = "/restaurant-menu";

  return (
    <Link to={restaurantLink} className="group block w-full outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg">
      <Card className="w-full overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-lg group-hover:-translate-y-1">
        <div className="relative">
          <img
            src={imageUrl || 'https://via.placeholder.com/400x200?text=Restaurant'}
            alt={`Image of ${name}`}
            className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <CardContent className="p-4 space-y-3">
          <h3 className="text-xl font-bold tracking-tight truncate">{name}</h3>
          
          <div className="flex flex-wrap gap-2">
            {cuisineTags.map((tag) => (
              <Badge key={tag} variant="secondary" className="font-normal">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground pt-2 border-t mt-3">
            <div className="flex items-center gap-1.5">
              <Star className="h-4 w-4 text-yellow-500" fill="currentColor" />
              <span className="font-medium text-foreground">{rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              <span>{deliveryTime}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RestaurantCard;