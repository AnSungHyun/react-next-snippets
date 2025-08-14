import { create } from 'zustand';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
}

interface ProductStore {
  products: Product[];
  initialized: boolean;
  setProducts: (products: Product[]) => void;
  deleteProduct: (productId: number) => void;
  fetchAndUpdateProducts: () => Promise<void>;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  initialized: false,
  setProducts: (products) => set({ products, initialized: true }),
  deleteProduct: (productId) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== productId),
    })),
  fetchAndUpdateProducts: async () => {
    const res = await fetch('https://dummyjson.com/products?limit=9');
    const data = await res.json();
    set({ products: data.products, initialized: true });
  },
}));