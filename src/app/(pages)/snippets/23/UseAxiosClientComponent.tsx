'use client'

import React, { useEffect } from "react";
import {
  getErrorProductsApi,
  getProductsApi,
  getProductsApiWithParam,
  ProductParams,
  ProductResponse
} from "@/app/_api/GetProduct";
import {useAxios} from "@/hooks/useAxios";
import Loading from "@/app/_component/Loading/Loading";
import { Divider } from "@mui/material";

const UseAxiosClientComponent: React.FC = () => {
  const {
    data: productResponseError,
    loading: loadingError,
    error: errorError,
    execute: executeError,
    RefetchButton: RefetchButtonError
  } = useAxios<ProductResponse>(() => getErrorProductsApi(), {
    button: {
      // 기본 텍스트
      text: '에러 요청 새로고침',
    }
  });

  const {
    data: productResponse,
    loading: loading,
    error: error,
    execute: execute,
    RefetchButton: RefetchButton,
  } = useAxios<ProductResponse, ProductParams>(
    (params) => getProductsApiWithParam(params),
    {
      button: {
        text: '정상 요청 새로고침',
      },
    },
  );

  // data가 변경될 때마다 후처리 실행
  useEffect(() => {
    if (productResponse) {
      // 데이터 후처리 로직
      console.log('데이터가 업데이트됨:', productResponse);
      // 추가 처리 작업
    }
  }, [productResponse]); // productResponse가 변경될 때마다 실행

  useEffect(() => {
    execute({
      limit: 3,
      delay: 1000,
      sort: 'desc',
    });
    // executeError();
  }, []);


  if (loading) {
    return (
      <div>
        <RefetchButton />
        <RefetchButtonError />
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <RefetchButton />
        <RefetchButtonError />
        {error.toString()}
      </div>
    );
  }

  return (
    <div>
      <h2>I'm UseAxios Client Component</h2>
      <br />
      <RefetchButton />
      <RefetchButtonError />
      <Divider />
      <>useAxios 조회 성공</>
    </div>
  );
};

export default UseAxiosClientComponent;