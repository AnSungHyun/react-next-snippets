import React, {Suspense} from "react";
import {Container} from "@mui/material";
import ResultBlock from "@/app/_component/CodeResultBlock";
import Loading from "@/app/_component/Loading/Loading";
import UseAxiosClientComponent from "./UseAxiosClientComponent";

const TestPage24: React.FC = () => {

  return (
    <div>
      <Container>
        <p>
          - useAxios, intersection-observer 를 사용한 무한 스크롤 조회 구현
        </p>
        <p>
          - product[] 라는 배열 상태 값이 데이터를 add 하여 추가 조회되는 상품들이 렌더링됨
        </p>
        <p>
          - product 상태 값이 바뀜에 따라 1번 부터 조회된 곳 까지 모든 상품이 리렌더링 되는 문제가 있음
        </p>
        <p>
          - productList 컴포넌트 내의 productCard 컴포넌트를 React.memo 사용하여 리렌더링 최소화
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

export default TestPage24;