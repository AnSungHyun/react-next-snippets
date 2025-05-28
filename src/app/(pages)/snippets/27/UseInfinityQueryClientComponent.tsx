'use client';

import React, { useState } from 'react';
import {
  getProductsApiWithParam,
  ProductParams,
  ProductResponse,
  Product,
  postProductsApi,
  ProductAddRequest, ProductAddResponse, getProductsApiOne,
} from '@/app/_api/GetProduct';
import Loading from '@/app/_component/Loading/Loading';
import { Button, Divider, TextField } from '@mui/material';
import ProductList from '@/app/_component/ProductList';
import { useInView } from 'react-intersection-observer';
import { InfiniteData, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { produce } from 'immer';

interface ProductRequestParams {
  limit: number;
  delay: number;
  sort: 'asc' | 'desc';
  skip?: number;
}

const UseQueryClientComponent: React.FC = () => {
  const queryClient = useQueryClient();

  const router = useRouter();
  const [newProduct, setNewProduct] = useState<ProductAddRequest>({
    "title": "새로운 상품",
    "description": "상품 설명입니다",
    "price": 59.99,
    "discountPercentage": 10.28,
    "rating": 3.78,
    "category": "electronics",
    "brand": "테스트 브랜드",
    "stock": 100,
    "availabilityStatus": "In Stock",
    "thumbnail": "https://cdn.dummyjson.com/products/images/sports-accessories/American%20Football/1.png",
    "images": [
      "https://cdn.dummyjson.com/products/images/sports-accessories/American%20Football/1.png",
      "https://cdn.dummyjson.com/products/images/sports-accessories/American%20Football/1.png"
    ]
  });

  const handleAddProduct = () => {
    addProductMutation.mutate(newProduct);
  };

  // 상품 추가를 위한 mutation 정의
  const addProductMutation = useMutation({
    mutationFn: async (product: ProductAddRequest) => {
      // API 호출 구현 필요
      console.log("mutationFn: ");
      const response:Product = await postProductsApi(product);
      console.log(response);
      return response;
    },
    onSuccess: (addedProduct:Product) => {
      try {
        // immer 사용하지 않은 예시
        // queryClient.setQueryData(
        //   ['products', { limit: reqParam.limit, sort: reqParam.sort }],
        //   (oldData: InfiniteData<ProductResponse>) => {
        //     if (!oldData?.pages?.[0]?.products) return oldData;
        //
        //     addedProduct.id = new Date().getTime();
        //     addedProduct.availabilityStatus = "In Stock";
        //
        //     return {
        //       ...oldData,
        //       pages: [
        //         {
        //           ...oldData.pages[0],
        //           products: [addedProduct, ...oldData.pages[0].products]
        //         },
        //         ...oldData.pages.slice(1)
        //       ]
        //     };
        //   }
        // );
        // immer 사용한 예시
        queryClient.setQueryData(
          ['products', { limit: reqParam.limit, sort: reqParam.sort }],
          (oldData: InfiniteData<ProductResponse>) => {
            return produce(oldData, draft => {
              if (!draft?.pages?.[0]?.products) return;

              // 새 상품 데이터 설정
              addedProduct.id = new Date().getTime();
              addedProduct.availabilityStatus = "In Stock";

              // 첫 페이지의 상품 목록 앞에 새 상품 추가
              draft.pages[0].products.unshift(addedProduct);
            });
          }
        );
      } catch (error) {
        console.error('캐시 업데이트 중 오류:', error);
      }
    },
    onError: (error) => {
      console.error("Mutation Error:", error); // 에러 확인
    }
  });

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
      {/* 상품 추가 폼 */}
      <div style={{ marginBottom: '20px' }}>
        <h3>신규 상품 추가</h3>
        <TextField
          label="상품명"
          value={newProduct.title}
          onChange={(e) => setNewProduct(prev => ({ ...prev, title: e.target.value }))}
          style={{ marginRight: '10px' }}
        />
        <TextField
          label="가격"
          type="number"
          value={newProduct.price}
          onChange={(e) => setNewProduct(prev => ({ ...prev, price: Number(e.target.value) }))}
          style={{ marginRight: '10px' }}
        />
        <TextField
          label="설명"
          value={newProduct.description}
          onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
          style={{ marginRight: '10px' }}
        />
        <Button
          variant="contained"
          onClick={handleAddProduct}
          disabled={addProductMutation.isPending}
        >
          상품 추가
        </Button>
        {addProductMutation.isPending && <Loading />}
      </div>

      <Divider />

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