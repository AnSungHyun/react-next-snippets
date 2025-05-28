'use client';

import React, { useState } from 'react';
import {
  getProductsApiWithParam,
  ProductParams,
  ProductResponse,
  Product
} from '@/app/_api/GetProduct';
import Loading from '@/app/_component/Loading/Loading';
import { Button, Divider } from '@mui/material';
import ProductList from '@/app/_component/ProductList';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

interface ProductRequestParams {
  limit: number;
  delay: number;
  sort: 'asc' | 'desc';
  skip?: number;
}

const UseQueryClientComponent: React.FC = () => {
  const router = useRouter();

  const { ref, inView } = useInView({
    threshold: 0.1,
  });
  // 초기 값
  const [reqParam, setReqParam] = useState<ProductRequestParams>({
    limit: 3,
    delay: 1000,
    sort: 'desc',
    skip: 0,
  });

  const {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ['products', { limit: reqParam.limit, sort: reqParam.sort } ],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await getProductsApiWithParam({
        ...reqParam,
        skip: pageParam * reqParam.limit,
      });
      return response;
    },
    getNextPageParam: (lastPage, allPages) => {
      const currentCount = allPages.reduce(
        (total, page) => total + page.products.length,
        0,
      );
      return lastPage.total > currentCount ? allPages.length : undefined;
    },
    initialPageParam: 0,
    staleTime: 10000,
  });

  // 스크롤 감지 시 추가 데이터 로드
  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);
  // }, [inView, hasNextPage, isFetchingNextPage]);

  // 모든 제품을 하나의 배열로 합치기
  const products = data?.pages.flatMap(page => page.products) ?? [];

  return (
    <div>
      <Divider />
      {products.length} 개 상품 조회
      <ProductList products={products} />

      <div ref={ref} style={{ height: '20px', margin: '20px 0' }}>
        {(isLoading || isFetchingNextPage) && <Loading />}
      </div>

      {isError && <>{error.toString()}</>}

      {!hasNextPage && (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          더 이상 불러올 상품이 없습니다.
        </div>
      )}
    </div>
  );
};

export default UseQueryClientComponent;