export interface Product {
  _id: string;
  name: string;
  price: number;
  sizes: string[];
  colors: { name: string; hexCode: string; image: string }[];
  tags: string[];
  slug: string;
  bestSeller: boolean;
  stock: number;
  remainingStock: number;
  images: string[];
}
