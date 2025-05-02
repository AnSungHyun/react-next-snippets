'use client'

import React, {use, useEffect} from "react";
import {Container} from "@mui/material";
import {getProductsApi, ProductResponse} from "@/app/_api/GetProduct";
import ResultBlock from "@/app/_component/CodeResultBlock";

const TestPage11: React.FC = () => {
  const [data, setData] = React.useState<ProductResponse>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProductsApi();
        // const response = await getProductsApi();
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
          - Client 컴포넌트의 data fetch는 페이지가 렌더링된 이후 데이터를 요청 후 가져온다.
        </p>
        <p>
          - Server 컴포넌트의 data fetch와 다르게 깜빡이며 데이터가 이후 렌더링 되는 모습이 보인다.
        </p>
        <ResultBlock>
          {JSON.stringify(data, null, 2)}
        </ResultBlock>
      </Container>
    </div>
  );
};

export default TestPage11;