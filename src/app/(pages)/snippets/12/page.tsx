import React, { Suspense } from "react";
import {Container} from "@mui/material";
import {getServerProductsApi} from "@/app/_api/ServerGetProduct";
import ResultBlock from "@/app/_component/CodeResultBlock";
import Loading from "@/app/_component/Loading/Loading";
import SuspenseServerComponent from "@/app/(pages)/snippets/12/SuspenseServerComponent";

async function ProductData() {
  // 서버에서 데이터를 가져오는 비동기 함수
  const response = await getServerProductsApi();
  return JSON.stringify(response, null, 2);
}

const TestPage12: React.FC = () => {
  return (
    <div>

      <Container>
        <p>
          - SuspenseServerComponent와 ProductData 2가지 비동기 데이터를 로드하는 예시 코드
        </p>
        <p>
          - SuspenseServerComponent는 2초 소요되는 작업
        </p>
        <p>
          - ProductData 는 0.1초만에 완료되는 작업
        </p>
        <p>
          - 2개의 컴포넌트 모두가 렌더링 될 때 까지 Suspense Loading이 표시됨
        </p>
        <p>
          - 그런데 이렇게 구현하면 Client 컴포넌트와 큰 차이가 없어 보임,
        </p>
        <p>
          - 하지만 Suspense 를 사용함으로써 브라우저를 전체 점유하지 않아 나머지 영역은 hydration 이 진행되어, 이외 영역은 동작이 가능하게됨
        </p>
        <ResultBlock>
          <Suspense fallback={<Loading />}>
            <SuspenseServerComponent />
            <ProductData />
          </Suspense>
        </ResultBlock>
      </Container>

    </div>
  );
};

export default TestPage12;