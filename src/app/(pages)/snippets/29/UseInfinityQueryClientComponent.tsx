'use client';

import React, { useEffect, useState } from 'react';
import {
  getProductsApiWithParam,
  ProductParams,
  ProductResponse,
  Product,
  postProductsApi,
  ProductAddRequest, ProductAddResponse, putProductsApi, deleteProductsApi,
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
    deleteProductMutation.mutate(data);
  };

  // 별도의 핸들러 함수 생성
  const handleDelete = (product: ProductAddRequest) => {
    deleteProductMutation.mutate(product);
  };

  // 상품 삭제를 위한 mutation 정의
  const deleteProductMutation = useMutation({
    mutationFn: async (product: ProductAddRequest) => {
      // API 호출 구현 필요
      const { id, ...productWithoutId } = product;
      console.log("mutationFn: ");

      const response:Product = await deleteProductsApi(id!, productWithoutId);
      console.log(response);
      return response;
    },
    onSuccess: (deletedProduct:Product) => {
      console.log("onSuccess: ", deletedProduct);
      try {
        queryClient.setQueryData(
          ['products', { limit: reqParam.limit, sort: reqParam.sort }],
          (oldData: InfiniteData<ProductResponse>
          ) => {
            if (!oldData?.pages) {
              return oldData;
            }

            deletedProduct.availabilityStatus = "In Stock";
            const newPages = oldData.pages.map(page => ({
              ...page,
              products: page.products.filter(product => product.id !== deletedProduct.id)

            }));

            // 빈 페이지 제거 (선택사항)
            const filteredPages = newPages.filter(page => page.products.length > 0);


            return {
              ...oldData,
              pages: newPages
            };

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
    threshold: 1,
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
  
  console.log("products: 렌더링");

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
        <Button
          variant="contained"
          type="submit"

          // onClick={handleAddProduct}
          disabled={deleteProductMutation.isPending}
        >
          상품 삭제
        </Button>
        {deleteProductMutation.isPending && <Loading />}
        </form>
      </div>

      <Divider />

      <Divider />
      {products.length} 개 상품 조회
      <ProductList products={products} onDelete={handleDelete} />

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