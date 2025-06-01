import Image from 'next/image';
import { products } from '@/data/products';
import type { Product } from '@/types';
import { Button }
from '@/components/ui/button';
import AddToCartButton from '@/components/product/add-to-cart-button';
import RelatedProductsSection from '@/components/product/related-products-section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {notFound} from 'next/navigation';


async function getProductById(id: string): Promise<Product | undefined> {
  // In a real app, fetch this from a database
  return products.find(p => p.id === id);
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);

  if (!product) {
    notFound();
  }
  
  const dataAiHintMap: { [key: string]: string } = {
    'Software': 'software code',
    'Online Course': 'laptop learning',
    'Games': 'controller joystick',
    'Digital Assets': 'design tool',
    'Music': 'headphones audio',
    'Ebooks': 'book library'
  };
  const hint = dataAiHintMap[product.category] || 'digital item';


  return (
    <div className="max-w-4xl mx-auto">
      <Card className="overflow-hidden shadow-xl">
        <div className="grid md:grid-cols-2 gap-0">
          <CardHeader className="p-0">
            <div className="aspect-square relative w-full h-full min-h-[300px] md:min-h-[400px]">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                data-ai-hint={hint}
              />
            </div>
          </CardHeader>
          <div className="p-6 flex flex-col justify-center">
            <CardTitle className="text-3xl font-bold mb-4 font-headline">{product.name}</CardTitle>
            <p className="text-muted-foreground mb-6 text-base">{product.description}</p>
            <p className="text-3xl font-extrabold text-primary mb-6">
              {product.currency} {product.price.toFixed(2)}
            </p>
            <AddToCartButton product={product} />
          </div>
        </div>
      </Card>

      <Separator className="my-12" />

      <RelatedProductsSection currentProductIds={[product.id]} />
    </div>
  );
}

export async function generateStaticParams() {
  return products.map(product => ({
    id: product.id,
  }));
}
