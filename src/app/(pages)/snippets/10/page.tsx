import React from "react";
import {Container} from "@mui/material";
import {getServerProductsApi} from "@/app/_api/ServerGetProduct";
import ResultBlock from "@/app/_component/CodeResultBlock";

const TestPage10: React.FC = async () => {
  const fetchData = await getServerProductsApi();
  const data = JSON.stringify(fetchData);
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