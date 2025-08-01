// app/test/store.ts
import { create } from 'zustand';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  tags: string[];
  reviews: Review[];
}
interface Review {
  rating: number;
  comment: string;
  reviewerName: string;
  reviewerEmail: string;
}

interface ProductStore {
  products: Product[];
  initialized: boolean;
  setProducts: (products: Product[]) => void;
  updateProductTitle: (productId: number, newTitle: string) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  initialized: false,
  setProducts: (products) => set({ products, initialized: true }),
  updateProductTitle: (productId, newTitle) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.id === productId ? { ...product, title: newTitle } : product
      ),
    })),
}));