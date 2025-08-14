'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchProducts, productsQueryKey, Product } from './products';
import ProductItem from './ProductItem';

export default function ProductsClient() {
  const queryClient = useQueryClient();

  const { data, isLoading, isFetching, error } = useQuery<Product[]>({
    queryKey: productsQueryKey,
    queryFn: fetchProducts,
    staleTime: 10000,
  });

  // 모든 상품 가격 +$1 (낙관적 업데이트)
  const incrementAll = useMutation({
    mutationFn: async () => {
      await new Promise((r) => setTimeout(r, 250));
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: productsQueryKey });
      const previous = queryClient.getQueryData<Product[]>(productsQueryKey);

      queryClient.setQueryData<Product[] | undefined>(productsQueryKey, (old) =>
        old?.map((p) => ({ ...p, price: p.price + 1 }))
      );

      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) {
        queryClient.setQueryData(productsQueryKey, ctx.previous);
      }
    },
    // 서버 동기화가 필요할 경우 주석 해제
    // onSettled: () => queryClient.invalidateQueries({ queryKey: productsQueryKey }),
  });

  if (isLoading) return <div>로딩 중…</div>;
  if (error) return <div>문제가 발생했습니다.</div>;

  return (
    <div>
      <h2>상품 목록</h2>
      {isFetching && <small style={{ color: '#888' }}>동기화 중…</small>}

      <div style={{ margin: '8px 0' }}>
        <button onClick={() => incrementAll.mutate()} disabled={incrementAll.isPending}>
          모든 상품 가격 +$1
        </button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {data?.map((p) => (
          <ProductItem key={p.id} product={p} disabled={incrementAll.isPending} />
        ))}
      </ul>
    </div>
  );
}