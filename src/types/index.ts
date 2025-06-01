export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  imageUrl: string;
  category: string; 
}

export interface CartItem extends Product {
  quantity: number;
}
