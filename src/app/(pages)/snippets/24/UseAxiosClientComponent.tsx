'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  getProductsApiWithParam,
  ProductParams,
  ProductResponse,
  Product

} from '@/app/_api/GetProduct';
import { useAxios } from '@/hooks/useAxios';
import Loading from '@/app/_component/Loading/Loading';
import { Divider } from '@mui/material';
import ProductList from '@/app/_component/ProductList';
import { useInView } from 'react-intersection-observer';


interface ProductRequestParams {
  limit: number;
  delay: number;
  sort: 'asc' | 'desc';
  skip?: number;
}

const UseAxiosClientComponent: React.FC = () => {
  const {
    data: productResponse,
    loading: loading,
    error: error,
    execute: execute,
  } = useAxios<ProductResponse, ProductParams>((params) =>
    getProductsApiWithParam(params),
  );

  // 페이징 관련 상태
  const [products, setProducts] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(-1);

  // 스크롤 관련 상태
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

  // data가 변경될 때마다 후처리 실행
  // 데이터 업데이트 처리
  useEffect(() => {
    if (productResponse) {
      // 새로운 제품들을 기존 제품 목록에 추가
      setProducts((prevProducts) => [
        ...prevProducts,
        ...productResponse.products,
      ]);

      // 더 불러올 데이터가 있는지 확인
      setHasMore(
        productResponse.total > (reqParam.skip || 0) + productResponse.products.length
      );
    }
  }, [productResponse]);


  // 초기 데이터 로드
  // useEffect(() => {
  //   execute(reqParam);
  // }, []);

  // 스크롤 감지 시 추가 데이터 로드
  useEffect(() => {
    if (inView && hasMore && !loading) {
      const nextPage = page + 1;
      const newSkip = nextPage * reqParam.limit;
      setPage(nextPage);

      execute({
        ...reqParam,
        skip: newSkip,
      });
    }
  }, [inView]);


  return (
    <div>
      <Divider />
      {products.length} 개 상품 조회
      <ProductList products={products} />

      <div ref={ref} style={{ height: '20px', margin: '20px 0' }}>
        {loading && <Loading />}
      </div>

      {error && <>{error.toString()}</>}

      {!hasMore && (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          더 이상 불러올 상품이 없습니다.
        </div>
      )}
    </div>
  );
};

export default UseAxiosClientComponent;
