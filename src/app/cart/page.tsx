'use client';

import { useCart } from '@/hooks/use-cart';
import CartItemDisplay from '@/components/cart/cart-item-display';
import RelatedProductsSection from '@/components/product/related-products-section';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const { cartItems, getCartTotal, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-10">
        <ShoppingBag className="mx-auto h-24 w-24 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-semibold mb-4 font-headline">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-6">Looks like you haven't added anything to your cart yet.</p>
        <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
          <Link href="/">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <h1 className="text-3xl font-bold mb-6 font-headline">Your Shopping Cart</h1>
        <Card className="shadow-lg">
          <CardContent className="p-0">
            {cartItems.map(item => (
              <CartItemDisplay key={item.id} item={item} />
            ))}
          </CardContent>
        </Card>
        <div className="mt-6 flex justify-end">
          <Button variant="outline" onClick={clearCart} className="text-destructive border-destructive hover:bg-destructive/10">
            Clear Cart
          </Button>
        </div>
      </div>
      <div className="lg:col-span-1">
        <Card className="shadow-lg sticky top-24">
          <CardHeader>
            <CardTitle className="text-2xl font-headline">Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>USD {getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>FREE</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total</span>
                <span>USD {getCartTotal().toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild size="lg" className="w-full bg-primary hover:bg-primary/90">
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
      <div className="lg:col-span-3 mt-12">
         <RelatedProductsSection currentProductIds={cartItems.map(item => item.id)} />
      </div>
    </div>
  );
}
