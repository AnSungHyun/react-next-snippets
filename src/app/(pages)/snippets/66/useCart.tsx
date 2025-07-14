// hooks/useCart.ts
import useCartStore from './cartStore';
import { CartItem } from './cartTypes'; // CartItem 타입을 별도로 정의할 경우

const useCart = (userId: string) => {
  const { cart, fetchCart, addToCart, removeFromCart, updateCart } = useCartStore();

  const initializeCart = async () => {
    await fetchCart(userId);
  };

  const addItemToCart = async (item: CartItem) => {
    await addToCart(userId, item);
  };

  const deleteItemFromCart = async (id: number) => {
    await removeFromCart(userId, id);
  };

  const updateItemInCart = async (updatedItem: CartItem) => {
    await updateCart(userId, updatedItem);
  };

  return {
    cart,
    initializeCart,
    addItemToCart,
    deleteItemFromCart,
    updateItemInCart,
  };
};

export default useCart;
