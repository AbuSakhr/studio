'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useCart } from '@/hooks/use-cart';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const dataAiHintMap: { [key: string]: string } = {
    'Software': 'software code',
    'Online Course': 'laptop learning',
    'Games': 'controller joystick',
    'Digital Assets': 'design tool',
    'Music': 'headphones audio',
    'Ebooks': 'book library'
  };
  
  const hint = dataAiHintMap[product.category] || 'digital product';


  return (
    <Card className="overflow-hidden flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
      <Link href={`/products/${product.id}`} className="block">
        <CardHeader className="p-0">
          <div className="aspect-video relative">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              data-ai-hint={hint}
            />
          </div>
        </CardHeader>
      </Link>
      <CardContent className="p-4 flex-grow">
        <Link href={`/products/${product.id}`} className="block">
          <CardTitle className="text-lg font-semibold mb-1 hover:text-primary transition-colors">{product.name}</CardTitle>
        </Link>
        <CardDescription className="text-sm text-muted-foreground line-clamp-3 mb-2">
          {product.description}
        </CardDescription>
        <p className="text-xl font-bold text-primary">
          {product.currency} {product.price.toFixed(2)}
        </p>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <Button onClick={() => addToCart(product)} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
