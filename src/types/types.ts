export interface Product {
  sections: string[];
  createdAt: Date;
  updatedAt: Date;
  id: string;
  name: string;
  category: string;
  categoryWeb: string;
  status: string;
  costPrice: number;
  iva: number;
  price: number;
  wholesalePrice: number;
  maxPrice: number;
  supplier: string;
  other: string;
  slug: null;
  excerpt: null;
  content: null;
  image: null;
  altImage: null;
  type: null;
  order: number;
  userId: number;
}
