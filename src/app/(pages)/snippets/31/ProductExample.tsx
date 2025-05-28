// app/_component/ProductExample.tsx
'use client'

import React, { useEffect, useState } from "react";
import CodeBlock from "@/app/_component/CodeBlock";
import ResultBlock from "@/app/_component/CodeResultBlock";
import { getProductsApiWithCache, Product } from "@/app/_api/GetProduct";
import { Container } from "@mui/material";
import Loading from '@/app/_component/Loading/Loading';

const fetchExample = `
// 기존 axios 요청
const response1 = await getProductsApiWithParam({ limit: 200 });

// fetch adapter를 사용한 캐시 적용 요청
const response2 = await getProductsApiWithCache({ 
  limit: 200 
}, {
  adapter: 'fetch',
  fetchOptions: { 
    cache: 'force-cache',  // 'no-store' | 'force-cache' | 'only-if-cached' | 'reload'
    next: { revalidate: 3600 }  // 1시간마다 재검증
  }
});`;

const axiosExample = `
// 상품 조회 with param
export const getProductsApiWithParam = (
  params?: ProductParams,
): Promise<ProductResponse> => {
  return commonAxios.get({ url: '/products', params: params });
};

// 상품 조회 ( fetch cache )
export const getProductsApiWithCache = (
  params?: ProductParams,
  axiosConfig?: any,
): Promise<ProductResponse> => {
  return commonAxios.get({
    url: '/products',
    params: params,
    ...axiosConfig,
  });
};
`;

const ProductExample = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const startTime = Date.now();

      const response = await getProductsApiWithCache(
        { limit: 200 },
        {
          adapter: 'fetch',
          fetchOptions: {
            cache: 'force-cache',
            next: { revalidate: 3600 }, // 1시간마다 재검증
          },
        },
      );

      const endTime = Date.now();

      setProducts(response.products);
      console.log(`데이터 로딩 시간: ${endTime - startTime}ms`);

    } catch (err) {
      setError(err instanceof Error ? err.message : '상품을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Container>
      <h3>Next.js Fetch API 캐싱 예제</h3>

      <CodeBlock
        language="typescript"
        value={fetchExample}
      />

      <CodeBlock
        filename={"GetProduct.ts"}
        language="typescript"
        value={axiosExample}
      />

      <ResultBlock>
        {loading ? (
          "로딩 중.."
        ) : error ? (
          `에러: ${error}`
        ) : (
          <div>
            <h4>상품 목록:</h4>
            {products.map(product => (
              <div key={product.id} style={{marginBottom: '10px'}}>
                <strong>{product.title}</strong>
                <p>{product.description}</p>
                <p>가격: ${product.price}</p>
              </div>
            ))}
          </div>
        )}
      </ResultBlock>
    </Container>
  );
};

export default ProductExample;