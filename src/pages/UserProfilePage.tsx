import React from 'react';
import { Link } from 'react-router-dom';

// Custom Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// shadcn/ui Components
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Lucide Icons
import { Package, User, MapPin, CreditCard, PlusCircle, Trash2, Pencil } from 'lucide-react';

// Mock Data
const pastOrders = [
  { id: '#FF1238', date: '2023-10-26', total: 45.50, status: 'Delivered', restaurant: 'The Pizza Place' },
  { id: '#FF1201', date: '2023-10-15', total: 22.75, status: 'Delivered', restaurant: 'Sushi Central' },
  { id: '#FF1198', date: '2023-09-30', total: 31.00, status: 'Cancelled', restaurant: 'Burger Barn' },
];

const savedAddresses = [
    { id: 'addr1', type: 'Home', line1: '123 Main St', city: 'Anytown', zip: '12345', isDefault: true },
    { id: 'addr2', type: 'Work', line1: '456 Business Ave', city: 'Workville', zip: '54321', isDefault: false },
];

const savedPayments = [
    { id: 'pay1', type: 'Visa', last4: '1234', expiry: '12/25' },
    { id: 'pay2', type: 'Mastercard', last4: '5678', expiry: '08/26' },
]

const UserProfilePage = () => {
  console.log('UserProfilePage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 py-8 sm:py-12">
        <div className="container mx-auto max-w-6xl px-4">
          <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">My Account</h1>
            <p className="text-muted-foreground">Manage your orders, personal info, and payment settings.</p>
          </header>

          <Tabs defaultValue="orders" className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto">
              <TabsTrigger value="orders">
                <Package className="w-4 h-4 mr-2" />
                Past Orders
              </TabsTrigger>
              <TabsTrigger value="details">
                <User className="w-4 h-4 mr-2" />
                My Details
              </TabsTrigger>
              <TabsTrigger value="addresses">
                <MapPin className="w-4 h-4 mr-2" />
                Addresses
              </TabsTrigger>
              <TabsTrigger value="payment">
                <CreditCard className="w-4 h-4 mr-2" />
                Payment
              </TabsTrigger>
            </TabsList>

            {/* Past Orders Tab */}
            <TabsContent value="orders" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                  <CardDescription>View your past orders and their status.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden sm:table-cell">Order ID</TableHead>
                        <TableHead>Restaurant</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pastOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="hidden sm:table-cell font-medium">{order.id}</TableCell>
                          <TableCell>{order.restaurant}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>${order.total.toFixed(2)}</TableCell>
                          <TableCell>
                            <Badge variant={order.status === 'Delivered' ? 'default' : 'destructive'}>
                              {order.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm">
                                <Link to="/order-tracking">View</Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* My Details Tab */}
            <TabsContent value="details" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details here.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <Label>Full Name</Label>
                    <p className="text-lg">John Doe</p>
                  </div>
                  <div className="space-y-1">
                    <Label>Email Address</Label>
                    <p className="text-lg">john.doe@example.com</p>
                  </div>
                   <div className="space-y-1">
                    <Label>Phone Number</Label>
                    <p className="text-lg">(123) 456-7890</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Edit Details</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Personal Details</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">Name</Label>
                          <Input id="name" defaultValue="John Doe" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="email" className="text-right">Email</Label>
                          <Input id="email" type="email" defaultValue="john.doe@example.com" className="col-span-3" />
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="phone" className="text-right">Phone</Label>
                          <Input id="phone" type="tel" defaultValue="(123) 456-7890" className="col-span-3" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Save Changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Addresses Tab */}
            <TabsContent value="addresses" className="mt-6">
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Saved Addresses</CardTitle>
                            <CardDescription>Manage your delivery locations.</CardDescription>
                        </div>
                         <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline"><PlusCircle className="mr-2 h-4 w-4"/>Add Address</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader><DialogTitle>Add New Address</DialogTitle></DialogHeader>
                                <div className="space-y-4 py-4">
                                    {/* This would be a form */}
                                    <p>Address form fields would go here.</p>
                                    <Input placeholder="123 Main St" />
                                    <Input placeholder="Anytown" />
                                </div>
                                <DialogFooter><Button>Save Address</Button></DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </CardHeader>
                    <CardContent className="grid gap-4 sm:grid-cols-2">
                        {savedAddresses.map(addr => (
                            <Card key={addr.id} className="p-4 flex justify-between items-start">
                                <div>
                                    <p className="font-semibold">{addr.type} {addr.isDefault && <Badge variant="secondary">Default</Badge>}</p>
                                    <p className="text-muted-foreground">{addr.line1}</p>
                                    <p className="text-muted-foreground">{addr.city}, {addr.zip}</p>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="icon"><Pencil className="h-4 w-4"/></Button>
                                    <Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="h-4 w-4"/></Button>
                                </div>
                            </Card>
                        ))}
                    </CardContent>
                 </Card>
            </TabsContent>

            {/* Payment Tab */}
             <TabsContent value="payment" className="mt-6">
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Payment Methods</CardTitle>
                            <CardDescription>Manage your saved credit and debit cards.</CardDescription>
                        </div>
                        <Button variant="outline"><PlusCircle className="mr-2 h-4 w-4"/>Add Card</Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         {savedPayments.map(card => (
                            <Card key={card.id} className="p-4 flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <CreditCard className="h-8 w-8 text-muted-foreground"/>
                                    <div>
                                        <p className="font-semibold">{card.type} ending in {card.last4}</p>
                                        <p className="text-sm text-muted-foreground">Expires {card.expiry}</p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="h-4 w-4"/></Button>
                            </Card>
                         ))}
                    </CardContent>
                 </Card>
            </TabsContent>

          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserProfilePage;