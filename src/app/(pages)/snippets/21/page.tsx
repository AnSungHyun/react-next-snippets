import React, {Suspense} from "react";
import {Container} from "@mui/material";
import ResultBlock from "@/app/_component/CodeResultBlock";
import Loading from "@/app/_component/Loading/Loading";
import CustomClientErrorBoundary from "./CustomClientErrorBoundary";
import AxiosClientComponent from "./AxiosClientComponent";

const TestPage21: React.FC = async () => {

  return (
    <div>
      <Container>
        <p>
          - Client Comp 에서 axios, fetch 오류 발생 시 ErrorBoundary로 처리
        </p>
        <p>
          - resetErrorBoundary 를 사용하여 재실행 가능
        </p>
        <ResultBlock>
          <CustomClientErrorBoundary>
            <Suspense fallback={<Loading/>}>
              <AxiosClientComponent />
            </Suspense>
          </CustomClientErrorBoundary>
        </ResultBlock>
      </Container>
    </div>
  );
};

export default TestPage21;