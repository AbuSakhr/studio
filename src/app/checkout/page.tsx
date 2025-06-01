'use client';

import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";


export default function CheckoutPage() {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const router = useRouter();
  const { toast } = useToast();

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-10">
        <ShoppingBag className="mx-auto h-24 w-24 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-semibold mb-4 font-headline">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-6">Add items to your cart before proceeding to checkout.</p>
        <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
          <Link href="/">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, process payment and save order here
    toast({
      title: "Order Placed!",
      description: "Thank you for your purchase. Your order is being processed.",
    });
    clearCart();
    router.push('/order-confirmation'); // Redirect to an order confirmation page
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center font-headline">Checkout</h1>
      <form onSubmit={handlePlaceOrder}>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline">Shipping Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" required />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john.doe@example.com" required />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="123 Main St" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="Anytown" required />
                  </div>
                  <div>
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" placeholder="12345" required />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline">Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup defaultValue="card" className="space-y-2">
                  <div className="flex items-center space-x-2 p-3 border rounded-md hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center cursor-pointer">
                      <CreditCard className="mr-2 h-5 w-5 text-primary" /> Credit Card
                    </Label>
                  </div>
                  {/* Add more payment options here */}
                </RadioGroup>
                <div className="mt-4 space-y-4">
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="•••• •••• •••• ••••" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input id="expiryDate" placeholder="MM/YY" required />
                    </div>
                    <div>
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="•••" required />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="shadow-lg sticky top-24">
              <CardHeader>
                <CardTitle className="font-headline">Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4">
                  {cartItems.map(item => (
                    <li key={item.id} className="flex justify-between text-sm">
                      <span>{item.name} x {item.quantity}</span>
                      <span>{item.currency} {(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
                <Separator className="my-4" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{cartItems[0]?.currency || 'USD'} {getCartTotal().toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90">
                  Place Order
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
