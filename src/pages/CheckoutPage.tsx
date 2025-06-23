import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Custom Layout Components
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Icons
import { CreditCard, Truck } from 'lucide-react';

// Form validation schema
const checkoutFormSchema = z.object({
  address: z.string().min(10, { message: "Please enter a valid street address." }),
  city: z.string().min(2, { message: "Please enter a valid city." }),
  state: z.string().min(2, { message: "Please enter a valid state." }),
  zip: z.string().regex(/^\d{5}(-\d{4})?$/, { message: "Please enter a valid ZIP code." }),
  paymentMethod: z.enum(["card", "paypal", "applepay"], {
    required_error: "You need to select a payment method.",
  }),
  promoCode: z.string().optional(),
});

// Mock data for the order
const cartItems = [
  { id: 1, name: "Margherita Pizza", quantity: 1, price: 14.99 },
  { id: 2, name: "Garlic Breadsticks", quantity: 1, price: 6.50 },
  { id: 3, name: "Caesar Salad", quantity: 2, price: 8.00 },
];

const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
const deliveryFee = 5.00;
const total = subtotal + deliveryFee;

const CheckoutPage = () => {
  console.log('CheckoutPage loaded');
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof checkoutFormSchema>>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      address: "123 Flavor St",
      city: "Tastytown",
      state: "CA",
      zip: "90210",
      paymentMethod: "card",
      promoCode: "",
    },
  });

  function onSubmit(data: z.infer<typeof checkoutFormSchema>) {
    console.log("Order submitted:", data);
    toast.promise(
      new Promise(resolve => setTimeout(resolve, 1500)),
      {
        loading: 'Placing your order...',
        success: () => {
          navigate('/order-tracking'); // Navigate to tracking page on success
          return 'Your order has been placed!';
        },
        error: 'Failed to place order. Please try again.',
      }
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Column: Form Details */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Truck className="h-5 w-5"/> Delivery Details</CardTitle>
                    <CardDescription>Confirm your address for delivery.</CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <div className="sm:col-span-2">
                         <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Street Address</FormLabel>
                              <FormControl>
                                <Input placeholder="123 Main St" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                     </div>
                     <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="Anytown" {...field} />
                          </FormControl>
                           <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <FormControl>
                             <Input placeholder="CA" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="zip"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ZIP Code</FormLabel>
                          <FormControl>
                            <Input placeholder="90210" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2"><CreditCard className="h-5 w-5"/> Payment Method</CardTitle>
                    <CardDescription>Choose how you'd like to pay.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                  <RadioGroupItem value="card" />
                                </FormControl>
                                <FormLabel className="font-normal flex-1">Credit or Debit Card</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                  <RadioGroupItem value="paypal" />
                                </FormControl>
                                <FormLabel className="font-normal flex-1">PayPal</FormLabel>
                              </FormItem>
                               <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                  <RadioGroupItem value="applepay" />
                                </FormControl>
                                <FormLabel className="font-normal flex-1">Apple Pay</FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Right Column: Order Summary */}
              <div className="lg:col-span-1">
                <Card className="lg:sticky lg:top-24">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex justify-between">
                          <span>{item.quantity} x {item.name}</span>
                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <Separator />
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Delivery Fee</span>
                            <span>${deliveryFee.toFixed(2)}</span>
                        </div>
                    </div>
                     <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="promo-code">
                        <AccordionTrigger className="text-sm">Have a promo code?</AccordionTrigger>
                        <AccordionContent>
                           <div className="flex gap-2">
                             <FormField
                                control={form.control}
                                name="promoCode"
                                render={({ field }) => (
                                    <Input placeholder="Enter code" {...field} />
                                )}/>
                            <Button type="button" variant="secondary">Apply</Button>
                           </div>
                        </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full" size="lg">Place Order</Button>
                  </CardFooter>
                </Card>
              </div>
            </form>
          </Form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;