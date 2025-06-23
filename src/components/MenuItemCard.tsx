import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Minus } from 'lucide-react';
import { toast } from 'sonner';

interface MenuItemCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  hasCustomizations?: boolean;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({
  id,
  name,
  description,
  price,
  imageUrl,
  hasCustomizations = false,
}) => {
  const [quantity, setQuantity] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(`MenuItemCard loaded for: ${name}`);

  // In a real app, these handlers would dispatch to a global cart state.
  const handleIncrease = () => {
    if (hasCustomizations && quantity === 0) {
      setIsModalOpen(true);
      return;
    }
    
    if (quantity === 0) {
      toast.success(`${name} added to your order.`);
    }
    setQuantity(prev => prev + 1);
  };

  const handleDecrease = () => {
    if (quantity === 1) {
      toast.info(`${name} removed from your order.`);
    }
    setQuantity(prev => (prev > 0 ? prev - 1 : 0));
  };
  
  const handleAddFromModal = () => {
    // Logic to add item with selected customizations
    toast.success(`${name} (customized) added to your order.`);
    setQuantity(1); // Set quantity to 1 as a visual feedback
    setIsModalOpen(false); // Close modal
  };

  return (
    <Card className="w-full flex p-4 gap-4 transition-shadow hover:shadow-md">
      <div className="flex-1 flex flex-col">
        {/* Text content */}
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{description}</p>
          <p className="text-md font-bold mt-2">${price.toFixed(2)}</p>
        </div>

        {/* Spacer to push actions to the bottom */}
        <div className="flex-grow" />

        {/* Action buttons */}
        <div className="flex items-center gap-4 mt-4">
          {quantity === 0 ? (
            <Button onClick={handleIncrease} variant="outline" className="w-full sm:w-auto">
              {hasCustomizations ? "Customize & Add" : "Add"}
            </Button>
          ) : (
            <div className="flex items-center gap-2 rounded-lg border p-1">
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleDecrease}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="font-bold text-md w-6 text-center">{quantity}</span>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleIncrease}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          )}
          {quantity > 0 && hasCustomizations && (
             <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(true)}>Edit</Button>
          )}
        </div>
      </div>

      {/* Image */}
      <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0">
        <img
          src={imageUrl || 'https://via.placeholder.com/150'}
          alt={name}
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      {/* Customization Modal */}
      {hasCustomizations && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent>
            <DialogHeader>
                <DialogTitle>Customize {name}</DialogTitle>
                <DialogDescription>
                Make selections below. Additional charges may apply.
                </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
                <p className="text-sm text-muted-foreground">Customization options form (e.g., radio buttons, checkboxes) would go here.</p>
            </div>
            <DialogFooter>
                <Button onClick={handleAddFromModal} className="w-full">
                Add to Order
                </Button>
            </DialogFooter>
            </DialogContent>
        </Dialog>
      )}
    </Card>
  );
};

export default MenuItemCard;