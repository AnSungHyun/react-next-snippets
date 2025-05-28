'use client';

import React, { useEffect, useState } from 'react';
import {
  getProductsApiWithParam,
  ProductParams,
  ProductResponse,
  Product,
  postProductsApi,
  ProductAddRequest, ProductAddResponse, putProductsApi,
} from '@/app/_api/GetProduct';
import Loading from '@/app/_component/Loading/Loading';
import { Button, Divider, TextField } from '@mui/material';
import ProductList from '@/app/_component/ProductList';
import { useInView } from 'react-intersection-observer';
import { InfiniteData, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';


interface ProductRequestParams {
  limit: number;
  delay: number;
  sort: 'asc' | 'desc';
  skip?: number;
}

// Zod 스키마 정의
const productSchema = z.object({
  id: z.coerce.number(),
  title: z.string().min(1, '상품명을 입력하세요'),
  description: z.string().min(1, '상품 설명을 입력하세요'),
  price: z.number().min(0, '가격은 0 이상이어야 합니다')
                    .multipleOf(0.01, '가격은 소수점 2자리까지만 입력 가능합니다'),
  discountPercentage: z.number(),
  rating: z.number(),
  category: z.string(),
  brand: z.string(),
  stock: z.number(),
  availabilityStatus: z.string(),
  thumbnail: z.string(),
  images: z.array(z.string())
});

type ProductFormData = z.infer<typeof productSchema>;


const UseQueryClientComponent: React.FC = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { register, handleSubmit, watch, formState: { errors } } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      id: 1,
      title: "상품 이름 수정",
      description: "상품 설명입니다",
      price: 59.99,
      discountPercentage: 10.28,
      rating: 3.78,
      category: "electronics",
      brand: "테스트 브랜드",
      stock: 100,
      availabilityStatus: "In Stock",
      thumbnail: "https://cdn.dummyjson.com/products/images/sports-accessories/American%20Football/1.png",
      images: [
        "https://cdn.dummyjson.com/products/images/sports-accessories/American%20Football/1.png",
        "https://cdn.dummyjson.com/products/images/sports-accessories/American%20Football/1.png"
      ]
    }
  });

  const onSubmit = (data: ProductFormData) => {
    updateProductMutation.mutate(data);
  };

  // 상품 수정를 위한 mutation 정의
  const updateProductMutation = useMutation({
    mutationFn: async (product: ProductAddRequest) => {
      const { id, ...productWithoutId } = product;

      // 2초 지연 추가
      await new Promise(resolve => setTimeout(resolve, 2000));

      const response: Product = await putProductsApi(id!, productWithoutId);
      return response;
    },
    onMutate: async (newProduct: ProductAddRequest) => {
      await queryClient.cancelQueries({
        queryKey: ['products', { limit: reqParam.limit, sort: reqParam.sort }]
      });

      const previousProducts = queryClient.getQueryData<InfiniteData<ProductResponse>>(
        ['products', { limit: reqParam.limit, sort: reqParam.sort }]
      );

      // Optimistic update 적용 (즉시 UI 반영)
      queryClient.setQueryData(
        ['products', { limit: reqParam.limit, sort: reqParam.sort }],
        (old: InfiniteData<ProductResponse> | undefined) => {
          if (!old?.pages) return old;

          const optimisticProduct = {
            ...newProduct,
            availabilityStatus: "In Stock"
          };

          const newPages = old.pages.map(page => ({
            ...page,
            products: page.products.map(product =>
              product.id === newProduct.id ? optimisticProduct : product
            )
          }));

          return {
            ...old,
            pages: newPages
          };
        }
      );

      return { previousProducts };
    },
    onError: (err, newProduct, context) => {
      if (context?.previousProducts) {
        queryClient.setQueryData(
          ['products', { limit: reqParam.limit, sort: reqParam.sort }],
          context.previousProducts
        );
      }
      console.error("Mutation Error:", err);
    },
    onSettled: (data, error, variables) => {
      console.log('Mutation이 완료됨:', {
        data,
        error,
        variables
      });
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

  // 수정된 데이터가 캐시에 남아있을 수 있기 때문에 캐시 초기화
  React.useEffect(() => {
    console.log("useEffect: 초기 로딩");
    // queryClient.invalidateQueries({
    //   queryKey: ['products', { limit: reqParam.limit, sort: reqParam.sort }],
    // })

    queryClient.resetQueries({
      queryKey: ['products', { limit: reqParam.limit, sort: reqParam.sort }],
    });

  }, []);

  // 모든 제품을 하나의 배열로 합치기
  const products = data?.pages.flatMap(page => page.products) ?? [];

  return (
    <div>
      {/* 상품 추가 폼 */}
      <div style={{ marginBottom: '20px' }}>
        <h3>상품명, 가격, 설명 수정</h3>
        <form onSubmit={handleSubmit(onSubmit)}>

        <TextField
          label="상품ID"
          type="number"
          {...register('id')}
          error={!!errors.id}
          helperText={errors.id?.message}

          style={{ marginRight: '10px' }}
        />
        <TextField
          label="상품명"
          {...register('title')}
          style={{ marginRight: '10px' }}
        />
        <TextField
          label="가격"
          inputProps={{
            step: "0.01",  // 소수점 2자리까지 입력 가능하도록 설정
            min: "0"       // 최소값 설정
          }}
          type="number"
          {...register('price', { valueAsNumber: true })}
          style={{ marginRight: '10px' }}
        />
        <TextField
          label="설명"
          {...register('description')}
          style={{ marginRight: '10px' }}
        />
        <Button
          variant="contained"
          type="submit"
          loading={updateProductMutation.isPending}

          // onClick={handleAddProduct}
          disabled={updateProductMutation.isPending}
        >
          상품 수정
        </Button>
        </form>
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