'use client'

import React, {use, useEffect} from "react";
import {Container} from "@mui/material";
import {getClientProductsApi, ProductResponse} from "@/app/_api/ClientGetProduct";
import ResultBlock from "@/app/_component/CodeResultBlock";

const TestPage11: React.FC = () => {
  const [data, setData] = React.useState<ProductResponse>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getClientProductsApi();
        setData(response);
      } catch (e) {
        // setError("Failed to fetch products");
      } finally {
        // setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Container>
        <p>
          - Client 컴포넌트의 data fetch는 페이지가 렌더링된 이후 데이터를 요청 후 가져온다.
        </p>
        <ResultBlock>
          {JSON.stringify(data)}
        </ResultBlock>

      </Container>
    </div>
  );
};

export default TestPage11;