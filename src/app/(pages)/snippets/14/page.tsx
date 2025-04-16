import React, {Suspense} from "react";
import {Container} from "@mui/material";
import ResultBlock from "@/app/_component/CodeResultBlock";
import Loading from "@/app/_component/Loading/Loading";
import PropServerComponent from "@/app/(pages)/snippets/14/PropServerComponent";

const TestPage14: React.FC = async () => {

  return (
    <div>
      <Container>
        <p>
          - Server 컴포넌트에서 데이터 fetch 후 Client 컴포넌트로 prop 데이터를 전달하여 렌더링
        </p>
        <p>
          - Client 컴포넌트도 SSR 처럼 구현 가능
        </p>
        <p>
          - Suspense fallback 기능으로 Loading 처리 가능
        </p>
        <ResultBlock>
          <Suspense fallback={<Loading />}>
            <PropServerComponent />
          </Suspense>
        </ResultBlock>
      </Container>
    </div>
  );
};

export default TestPage14;