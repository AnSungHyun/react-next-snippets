// store/cartStore.ts
import {create} from 'zustand';
import { produce } from 'immer';
import axios from 'axios';

export interface CartItem {
  id: number;
  name: string;
  quantity: number;
}

export interface CartStore {
  cart: CartItem[];
  fetchCart: (userId: string) => Promise<void>;
  addToCart: (userId: string, item: CartItem) => Promise<void>;
  removeFromCart: (userId: string, id: number) => Promise<void>;
  updateCart: (userId: string, updatedItem: CartItem) => Promise<void>;
}

// 더미 데이터
const dummyCartItems: CartItem[] = [
  { id: 1, name: "상품 1", quantity: 2 },
  { id: 2, name: "상품 2", quantity: 1 },
  { id: 3, name: "상품 3", quantity: 3 },
];


const useCartStore = create<CartStore>((set) => ({
  cart: [],

  fetchCart: async (userId) => {
    try {
      // const response = await axios.get<CartItem[]>(`/api/cart/${userId}`);
      // set({ cart: response.data });
      set({ cart: dummyCartItems });

    } catch (error) {
      console.error('장바구니 조회 실패:', error);
    }
  },

  addToCart: async (userId, item) => {
    try {
      // await axios.post(`/api/cart/${userId}`, item);
      // set(produce((draft:CartStore) => {
      //   draft.cart.push(item);
      // }));
      set(produce((draft:CartStore) => {
        draft.cart.push(item);
      }));

    } catch (error) {
      console.error('장바구니 추가 실패:', error);
    }
  },

  removeFromCart: async (userId, id) => {
    try {
      // await axios.delete(`/api/cart/${userId}/${id}`);
      // set(produce((draft:CartStore) => {
      //   draft.cart = draft.cart.filter(item => item.id !== id);
      // }));
      set(produce((draft:CartStore) => {
        draft.cart = draft.cart.filter(item => item.id !== id);
      }));

    } catch (error) {
      console.error('장바구니 삭제 실패:', error);
    }
  },

  updateCart: async (userId, updatedItem) => {
    try {
      // await axios.put(`/api/cart/${userId}`, updatedItem);
      // set(produce((draft:CartStore) => {
      //   const index = draft.cart.findIndex(item => item.id === updatedItem.id);
      //   if (index !== -1) {
      //     draft.cart[index] = updatedItem;
      //   }
      // }));
      set(produce((draft:CartStore) => {
        const index = draft.cart.findIndex(item => item.id === updatedItem.id);
        if (index !== -1) {
          draft.cart[index] = updatedItem;
        }
      }));

    } catch (error) {
      console.error('장바구니 업데이트 실패:', error);
    }
  },
}));

export default useCartStore;

