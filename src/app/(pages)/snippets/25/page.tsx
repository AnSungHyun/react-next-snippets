import React, {Suspense} from "react";
import {Container} from "@mui/material";
import ResultBlock from "@/app/_component/CodeResultBlock";
import Loading from "@/app/_component/Loading/Loading";
import UseInfinityQueryClientComponent from './UseInfinityQueryClientComponent';

const TestPage25: React.FC = () => {

  return (
    <div>
      <Container>
        <p>
          - useInfinityQuery, intersection-observer 를 사용한 무한 스크롤 조회 구현
        </p>
        <p>
          - tanstack query 에서 data에 다음 fetch 데이터를 add 해줌
        </p>
        <p>
          - default로 cache가 적용되어 있어서 페이지 이동, history back 동작 시 캐시 데이터 사용
        </p>
        <p>
          - 캐시데이터 사용으로 history back 시에 scroll 이 유지됨
        </p>
        <p>
          - 의문 : 다른 페이지 방문 후, 재방문 시에도 scroll 및 fetch 데이터가 유지되는데,, 맞나?
        </p>
        <p>
          -     : ex) 5페이지까지 조회한 상태에서 다른 페이지 방문 후 다시 접속하면 5페이지까지 데이터가 남아있음.
        </p>
        <ResultBlock>
          <Suspense fallback={<Loading/>}>
            <UseInfinityQueryClientComponent />
          </Suspense>
        </ResultBlock>
      </Container>
    </div>
  );
};

export default TestPage25;