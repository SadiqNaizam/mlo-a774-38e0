import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PackageCheck, ChefHat, Bike, CheckCircle2 } from 'lucide-react';
import { cn } from "@/lib/utils";

// This type can be shared with the page component to ensure consistency.
export type OrderStatus = 'placed' | 'kitchen' | 'delivery' | 'delivered';

interface OrderTrackerProps {
  /** The current stage of the order. */
  currentStatus: OrderStatus;
  /** Optional order ID to display in the header. */
  orderId?: string;
  /** Optional estimated delivery time to display. */
  estimatedDeliveryTime?: string;
}

const OrderTracker: React.FC<OrderTrackerProps> = ({ 
  currentStatus, 
  orderId, 
  estimatedDeliveryTime 
}) => {
  console.log('OrderTracker component loaded with status:', currentStatus);

  const stages = [
    { id: 'placed', title: 'Order Placed', Icon: PackageCheck },
    { id: 'kitchen', title: 'In the Kitchen', Icon: ChefHat },
    { id: 'delivery', title: 'Out for Delivery', Icon: Bike },
    { id: 'delivered', title: 'Delivered', Icon: CheckCircle2 },
  ];

  const currentStageIndex = stages.findIndex(stage => stage.id === currentStatus);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Track Your Order</CardTitle>
        <CardDescription>
          {orderId && `Order #${orderId} - `}
          {currentStatus !== 'delivered' && estimatedDeliveryTime 
            ? `Estimated Delivery: ${estimatedDeliveryTime}` 
            : 'Your order journey is shown below.'}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 sm:p-8">
        <div className="flex items-start justify-between" aria-label="Order tracking status">
          {stages.map((stage, index) => {
            const isCompleted = index < currentStageIndex;
            const isActive = index === currentStageIndex;

            return (
              <React.Fragment key={stage.id}>
                {/* Stage Icon and Title */}
                <div className="flex flex-col items-center text-center w-20 sm:w-28 flex-shrink-0">
                  <div
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300",
                      isActive ? "border-primary bg-primary text-primary-foreground shadow-lg scale-110" : "",
                      isCompleted ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/30 bg-muted text-muted-foreground",
                    )}
                    aria-current={isActive ? 'step' : undefined}
                  >
                    <stage.Icon className="h-6 w-6" />
                  </div>
                  <p
                    className={cn(
                      "mt-2 text-xs sm:text-sm font-semibold transition-colors duration-300",
                      isActive || isCompleted ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {stage.title}
                  </p>
                </div>

                {/* Connector Line (not rendered for the last stage) */}
                {index < stages.length - 1 && (
                  <div
                    className={cn(
                      "mt-6 h-1 flex-1 rounded-full transition-colors duration-500",
                      isCompleted ? "bg-primary" : "bg-muted"
                    )}
                    role="separator"
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderTracker;