'use client';

import Link from 'next/link';
import { ShoppingCart, User, PackageOpen } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useEffect, useState } from 'react';

export default function Header() {
  const { getItemCount } = useCart();
  const [itemCount, setItemCount] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      setItemCount(getItemCount());
    }
  }, [getItemCount, isMounted, useCart().cartItems]); // Re-check when cartItems change

  return (
    <header className="bg-card shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary font-headline">
          <div className="flex items-center gap-2">
            <PackageOpen className="h-7 w-7" />
            Digital Emporium
          </div>
        </Link>
        <nav className="flex items-center space-x-4">
          <Button variant="ghost" asChild>
            <Link href="/">Home</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/cart" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Cart</span>
              {isMounted && itemCount > 0 && (
                <Badge variant="destructive" className="absolute -top-2 -right-2 px-1.5 py-0.5 text-xs">
                  {itemCount}
                </Badge>
              )}
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/account">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
