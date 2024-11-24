export interface Product {
  _id: string;
  name: string;
  price: number;
  sizes: string[];
  colors: { name: string; hexCode: string }[];
  tags: string[];
  images: string[];
  slug: string;
  bestSeller: boolean;
  stock: number;
  remainingStock: number;
}

export interface FilterState {
  priceMin: string;
  priceMax: string;
  size: string[];
  tags: string[];
  color: string[];
  priceRange?: string[];
}

export interface Message {
  _id: string;
  name: string;
  email: string;
  message: string;
  adminReply: string;
  createdAt: string;
}
