'use client';

import type { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { ShoppingCart } from 'lucide-react';

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart();

  return (
    <Button 
      onClick={() => addToCart(product)} 
      size="lg" 
      className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
    >
      <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
    </Button>
  );
}
