'use client';

import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Product, productsQueryKey } from './products';

interface ProductItemProps {
  product: Product;
  disabled?: boolean; // 부모에서 전체 증가 중일 때 버튼 비활성화를 위해 사용(옵션)
}

export default function ProductItem({ product, disabled }: ProductItemProps) {
  const queryClient = useQueryClient();

  // 단일 상품 가격 +$1 (낙관적 업데이트)
  const incrementOne = useMutation({
    mutationFn: async () => {
      await new Promise((r) => setTimeout(r, 250));
      return product.id;
    },
    onMutate: async () => {
      const productId = product.id;
      await queryClient.cancelQueries({ queryKey: productsQueryKey });

      const previous = queryClient.getQueryData<Product[]>(productsQueryKey);

      queryClient.setQueryData<Product[] | undefined>(productsQueryKey, (old) =>
        old?.map((p) => (p.id === productId ? { ...p, price: p.price + 1 } : p))
      );

      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) {
        queryClient.setQueryData(productsQueryKey, ctx.previous);
      }
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: productsQueryKey }),
  });

  // 가격을 "현재와 동일한 값"으로 다시 설정
  // 동일 값으로 setQueryData를 호출하면, 기본 structuralSharing 동작으로 인해
  // 보통은 리렌더링이 발생하지 않습니다(동일 구조는 이전 참조를 재사용).
  const setSamePrice = useMutation({
    mutationFn: async () => {
      // 지연을 살짝 둬서 비동기 흐름이 보이도록만 함(선택)
      await new Promise((r) => setTimeout(r, 150));
      return product.id;
    },
    onMutate: async () => {
      const productId = product.id;
      await queryClient.cancelQueries({ queryKey: productsQueryKey });

      const previous = queryClient.getQueryData<Product[]>(productsQueryKey);

      // 동일 값을 다시 쓰는 업데이트
      queryClient.setQueryData<Product[] | undefined>(productsQueryKey, (old) =>
        old?.map((p) => (p.id === productId ? { ...p, price: p.price } : p))
      );

      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) {
        queryClient.setQueryData(productsQueryKey, ctx.previous);
      }
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: productsQueryKey }),
  });

  return (
    <li
      style={{
        display: 'flex',
        gap: 8,
        alignItems: 'center',
        padding: '6px 0',
        borderBottom: '1px solid #eee',
      }}
    >
      <span style={{ flex: 1 }}>
        {product.title} - ${product.price}
      </span>

      <button
        onClick={() => incrementOne.mutate()}
        disabled={disabled || incrementOne.isPending}
      >
        +$1
      </button>

      <button
        onClick={() => setSamePrice.mutate()}
        disabled={disabled || setSamePrice.isPending}
        title="현재 가격과 동일한 값으로 다시 셋팅"
      >
        동일 값으로 설정
      </button>

      {(incrementOne.isPending || setSamePrice.isPending) && (
        <small style={{ color: '#888' }}>업데이트 중…</small>
      )}
    </li>
  );
}