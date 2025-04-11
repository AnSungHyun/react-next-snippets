import {create} from 'zustand';

export interface Product {
  id: number;
  name: string;
  quantity: number;
}

interface Store {
  items: Product[];
  addItem: (item: Product) => void;
  removeItem: (itemToRemove: Product) => void;
  clearItems: () => void;
}

const useCartStore = create<Store>((set) => ({
  items: JSON.parse(localStorage.getItem('items') as string) || [],

  addItem: (item) => set((state) => {
    const updatedItems = [...state.items, item];
    localStorage.setItem('items', JSON.stringify(updatedItems));
    return { items: updatedItems };
  }),

  removeItem: (itemToRemove) => set((state) => {
    const updatedItems = state.items.filter(item => item.id !== itemToRemove.id);
    localStorage.setItem('items', JSON.stringify(updatedItems));
    return { items: updatedItems };
  }),

  clearItems: () => set(() => {
    localStorage.removeItem('items');
    return { items: [] };
  }),
}));

export default useCartStore;