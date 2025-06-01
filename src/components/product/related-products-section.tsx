'use client';

import { useEffect, useState } from 'react';
import { getRelatedProducts, type RelatedProductsOutput } from '@/ai/flows/related-products';
import { products as allProductsData } from '@/data/products'; // Assuming this is your full product list
import type { Product } from '@/types';
import ProductCard from './product-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

interface RelatedProductsSectionProps {
  currentProductIds: string[]; // IDs of products in cart or on detail page
}

export default function RelatedProductsSection({ currentProductIds }: RelatedProductsSectionProps) {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (currentProductIds.length === 0) {
        setRelatedProducts([]); // Clear related products if cart is empty or no current product
        return;
    }

    const fetchRelated = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Get names of current products
        const currentProductNames = currentProductIds
          .map(id => allProductsData.find(p => p.id === id)?.name)
          .filter((name): name is string => !!name);

        if (currentProductNames.length === 0) {
          setRelatedProducts([]);
          setIsLoading(false);
          return;
        }

        const result: RelatedProductsOutput = await getRelatedProducts({ cartItems: currentProductNames });
        
        // Map AI suggested product names back to full product objects
        const suggestedProducts = result.relatedProducts
          .map(name => allProductsData.find(p => p.name.toLowerCase() === name.toLowerCase()))
          .filter((p): p is Product => !!p) // Ensure product exists
          .filter(p => !currentProductIds.includes(p.id)) // Exclude products already in cart/viewed
          .slice(0, 4); // Limit to 4 suggestions

        setRelatedProducts(suggestedProducts);
      } catch (err) {
        console.error("Failed to fetch related products:", err);
        setError("Could not load recommendations at this time.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRelated();
  }, [currentProductIds]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-2">Loading recommendations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (relatedProducts.length === 0 && !isLoading) {
    return null; // Don't show the section if there are no related products and not loading
  }

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6 font-headline">You Might Also Like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {relatedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
