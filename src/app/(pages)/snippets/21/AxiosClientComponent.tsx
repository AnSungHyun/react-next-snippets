'use client'

import React, {useEffect, useState} from "react";
import {getErrorProductsApi, ProductResponse} from "@/app/_api/GetProduct";
import axios from "axios";
import Loading from "@/app/_component/Loading/Loading";

const AxiosClientComponent: React.FC = () => {
  const [productResponse, setProductResponse] = useState<ProductResponse>();
  // const [data, setData] = useState<any>(null); // 데이터를 저장할 상태
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 오류 상태

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // 로딩 시작
        const response = await getErrorProductsApi(); // API 요청
        setProductResponse(response); // 데이터 설정
      } catch (err) {
        // 오류 처리
        if (axios.isAxiosError(err)) {
          setError(err.message + " " + err.config?.url); // Axios 오류 메시지 설정
        } else {
          setError('알 수 없는 오류가 발생했습니다.'); // 일반 오류 처리
        }
      } finally {
        setLoading(false); // 로딩 종료
      }
    };

    fetchData(); // 데이터 fetching 호출
  }, []); // 컴포넌트 마운트 시 한 번 호출

  // 로딩 중일 때
  if (loading) {
    return <div><Loading /></div>;
  }

  // 오류가 발생했을 때
  if(error) {
    throw new Error(error);
    // return <div>오류 발생: {error}</div>;
  }

  return (
    <div>
      <h2>I'm Axios Client Component</h2>
      <br/>
      <>{JSON.stringify(productResponse, null, 2)}</>
    </div>
  );
};

export default AxiosClientComponent;