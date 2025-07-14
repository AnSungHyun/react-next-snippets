'use client';

import React, { useEffect } from 'react';
import useCart from './useCart';
import { CartItem } from './cartTypes'; // CartItem 타입을 별도로 정의할 경우

interface CartComponentProps {
  userId: string;
}

const CartComponent: React.FC<CartComponentProps> = ({ userId }) => {
  const { cart, initializeCart, addItemToCart, deleteItemFromCart, updateItemInCart } = useCart(userId);

  useEffect(() => {
    // cart가 비어있을 때만 fetchCart 호출
    if (cart.length === 0) {
      initializeCart();
    }
  }, []);

  // useEffect(() => {
  //   initializeCart();
  // }, []);

  const handleAddItem = () => {
    const newItem: CartItem = { id: Date.now(), name: 'New Item', quantity: 1 };
    addItemToCart(newItem);
  };

  const handleDeleteItem = (id: number) => {
    deleteItemFromCart(id);
  };

  const handleUpdateItem = (id: number) => {
    const updatedItem: CartItem = { id, name: 'Updated Item', quantity: 2 };
    updateItemInCart(updatedItem);
  };

  return (
    <div>
      <h2>장바구니</h2>
      <button onClick={handleAddItem}>장바구니에 추가</button>
      <ul>
        {cart.map(item => (
          <li key={item.id}>
            {item.name} (수량: {item.quantity})
            <button onClick={() => handleDeleteItem(item.id)}>삭제</button>
            <button onClick={() => handleUpdateItem(item.id)}>업데이트</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartComponent;
