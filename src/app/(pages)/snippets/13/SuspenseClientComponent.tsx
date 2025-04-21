'use client'

import Loading from "@/app/_component/Loading/Loading";
import React from "react";
import {getClientProductsApi, ProductResponse} from "@/app/_api/ClientGetProduct";

// 비동기적으로 데이터를 가져오는 컴포넌트
const SuspenseClientComponent = () => {
  const [data, setData] = React.useState<string | null>(null);
  const [productData, setProductData] = React.useState<ProductResponse>();

  React.useEffect(() => {
    const fetchData = async () => {
      // 2초 후에 데이터 반환
      const response = await new Promise<string>((resolve) =>
        setTimeout(() => resolve('Client 컴포넌트 비동기 데이터 로드 완료!'), 2000)
      );
      setData(response);

      const productResponse = await getClientProductsApi();
      setProductData(productResponse);
    };

    fetchData();
  }, []);

  // return <div>{data ? data : <Loading />}</div>;
  return <div>{data ? data : <Loading />}</div>;
};

export default SuspenseClientComponent;