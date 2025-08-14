// app/prefetch-example/page.tsx
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchProducts, productsQueryKey } from './/products';
import ProductsClient from './products-client';

export default async function PrefetchExamplePage() {
  const queryClient = new QueryClient();

  // 서버에서 미리 쿼리 실행
  await queryClient.prefetchQuery({
    queryKey: productsQueryKey,
    queryFn: fetchProducts,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <ProductsClient />
    </HydrationBoundary>
  );
}