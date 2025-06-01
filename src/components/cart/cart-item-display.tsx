'use client';

import Image from 'next/image';
import type { CartItem } from '@/types';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface CartItemDisplayProps {
  item: CartItem;
}

export default function CartItemDisplay({ item }: CartItemDisplayProps) {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(item.id, newQuantity);
  };

  const dataAiHintMap: { [key: string]: string } = {
    'Software': 'software code',
    'Online Course': 'laptop learning',
    'Games': 'controller joystick',
    'Digital Assets': 'design tool',
    'Music': 'headphones audio',
    'Ebooks': 'book library'
  };
  const hint = dataAiHintMap[item.category] || 'digital item';

  return (
    <div className="flex items-center space-x-4 py-4 border-b">
      <Link href={`/products/${item.id}`} className="flex-shrink-0">
        <div className="w-20 h-20 relative rounded overflow-hidden">
          <Image 
            src={item.imageUrl} 
            alt={item.name} 
            fill 
            sizes="80px"
            className="object-cover"
            data-ai-hint={hint}
          />
        </div>
      </Link>
      <div className="flex-grow">
        <Link href={`/products/${item.id}`} className="hover:text-primary">
          <h3 className="text-lg font-semibold">{item.name}</h3>
        </Link>
        <p className="text-sm text-muted-foreground">{item.currency} {item.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="icon" onClick={() => handleQuantityChange(item.quantity - 1)} disabled={item.quantity <= 1}>
          <Minus className="h-4 w-4" />
        </Button>
        <Input 
          type="number" 
          value={item.quantity} 
          onChange={(e) => handleQuantityChange(parseInt(e.target.value, 10))} 
          className="w-16 text-center h-10"
          min="1"
        />
        <Button variant="outline" size="icon" onClick={() => handleQuantityChange(item.quantity + 1)}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <p className="font-semibold w-24 text-right">{item.currency} {(item.price * item.quantity).toFixed(2)}</p>
      <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)} className="text-destructive hover:text-destructive/80">
        <Trash2 className="h-5 w-5" />
      </Button>
    </div>
  );
}
