import React, {Suspense} from "react";
import {Container} from "@mui/material";
import ResultBlock from "@/app/_component/CodeResultBlock";
import Loading from "@/app/_component/Loading/Loading";
import UseAxiosClientComponent from "@/app/(pages)/snippets/23/UseAxiosClientComponent";

const TestPage23: React.FC = () => {

  return (
    <div>
      <Container>
        <p>
          - useAxios 를 구현 및 사용하여 중복되는 loading, error 관련 코드를 줄일 수 있음.
        </p>
        <p>
          - execute 를 통해 동적으로 실행 가능.
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