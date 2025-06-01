import ProductCard from '@/components/product/product-card';
import { products } from '@/data/products';
import type { Product } from '@/types';

export default function HomePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-center font-headline">Explore Our Digital Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
