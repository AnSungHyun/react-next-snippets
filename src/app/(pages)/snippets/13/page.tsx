'use client'

import React, {Suspense, useEffect} from "react";
import {Container} from "@mui/material";
import {getClientProductsApi, ProductResponse} from "@/app/_api/ClientGetProduct";
import ResultBlock from "@/app/_component/CodeResultBlock";
import Loading from "@/app/_component/Loading/Loading";
import SuspenseClientComponent from "@/app/(pages)/snippets/13/SuspenseClientComponent";

const TestPage13: React.FC = () => {
  const [data, setData] = React.useState<ProductResponse>();

  useEffect(() => {
    const fetchData = async () => {
      try {

        const responseTime = await new Promise<string>((resolve) =>
          setTimeout(() => resolve('Client 컴포넌트 비동기 데이터 로드 완료!'), 2000)
        );

        const response = await getClientProductsApi();

        setData(response);
      } catch (e) {
        // setError("Failed to fetch products");
      } finally {
        // setLoading(false);
      }
    };

    fetchData().then(r => {});
  }, []);

  return (
    <div>
      <Container>
        <p>
          - Client 컴포넌트에서는 Suspense 를 사용하지 않고 Loading 컴포넌트를 직접 사용하여 구현한다.
        </p>
        <ResultBlock>
          {/*<Suspense fallback={<Loading />}>*/}
          {/*  {JSON.stringify(data, null, 2)}*/}
          {/*</Suspense>*/}

          {data ? JSON.stringify(data, null, 2) : <Loading />}

          {/*<SuspenseClientComponent />*/}
        </ResultBlock>

      </Container>
    </div>
  );
};

export default TestPage13;