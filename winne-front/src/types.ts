export interface Product {
  id?: string;
  name: string;
  price: number;
  stock: number;
  remainingStock: number;
  images: string[] | File[];
  slug: string;
  colors: { name: string; hex: string }[];
  tags: string[];
  sizes: string[];
  bestSeller?: boolean; 
}
