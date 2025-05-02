import React from "react";
import {Container} from "@mui/material";
import {getProductsApi} from "@/app/_api/GetProduct";
import ResultBlock from "@/app/_component/CodeResultBlock";

const TestPage10: React.FC = async () => {
  const fetchData = await getProductsApi();
  const data = JSON.stringify(fetchData, null, 2);
  return (
    <div>
      <Container>
        <p>
          - Server 컴포넌트의 data fetch는 페이지가 한번에 렌더링된다.
        </p>
        <ResultBlock>
          {data}
        </ResultBlock>
      </Container>
    </div>
  );
};

export default TestPage10;