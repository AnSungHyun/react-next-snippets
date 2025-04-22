import React, {Suspense} from "react";
import {Container} from "@mui/material";
import ResultBlock from "@/app/_component/CodeResultBlock";
import Loading from "@/app/_component/Loading/Loading";
import UseAxiosClientComponent from "@/app/(pages)/snippets/23/UseAxiosClientComponent";

const TestPage23: React.FC = async () => {

  return (
    <div>
      <Container>
        <p>
          - Server Comp 에서 axios, fetch 오류 발생 시 ErrorBoundary로 처리
        </p>
        <p>
          - resetErrorBoundary 를 사용하여 재실행 가능
        </p>
        <ResultBlock>
          <Suspense fallback={<Loading/>}>
            <UseAxiosClientComponent />
          </Suspense>
        </ResultBlock>
      </Container>
    </div>
  );
};

export default TestPage23;