import React, { Suspense } from "react";
import {Container} from "@mui/material";
import {getProductsApi} from "@/app/_api/GetProduct";
import ResultBlock from "@/app/_component/CodeResultBlock";
import Loading from "@/app/_component/Loading/Loading";
import SuspenseServerComponent from '@/app/(pages)/snippets/12/SuspenseServerComponent';
import CodeBlock from "@/app/_component/CodeBlock";

async function ProductData() {
  // 서버에서 데이터를 가져오는 비동기 함수
  const response = await getProductsApi();
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
        <p>
          - 이 예시에서, Suspense 영역을 주석 처리 후 페이지 렌더링의 차이를 확인할 수 있음.
        </p>
        <ResultBlock>
          <Suspense fallback={<Loading />}>
            <SuspenseServerComponent />
            <ProductData />
          </Suspense>
        </ResultBlock>
        <CodeBlock filename={"page.tsx"} value={
          "import React, { Suspense } from \"react\";\n" +
          "import {Container} from \"@mui/material\";\n" +
          "import {getProductsApi} from \"@/app/_api/GetProduct\";\n" +
          "import ResultBlock from \"@/app/_component/CodeResultBlock\";\n" +
          "import Loading from \"@/app/_component/Loading/Loading\";\n" +
          "import SuspenseServerComponent from \"@/app/(pages)/snippets/12/SuspenseServerComponent\";\n" +
          "\n" +
          "async function ProductData() {\n" +
          "  // 서버에서 데이터를 가져오는 비동기 함수\n" +
          "  const response = await getProductsApi();\n" +
          "  return JSON.stringify(response, null, 2);\n" +
          "}\n" +
          "\n" +
          "const TestPage12: React.FC = () => {\n" +
          "  return (\n" +
          "    <div>\n" +
          "\n" +
          "      <Container>\n" +
          "        <ResultBlock>\n" +
          "          <Suspense fallback={<Loading />}>\n" +
          "            <SuspenseServerComponent />\n" +
          "            <ProductData />\n" +
          "          </Suspense>\n" +
          "        </ResultBlock>\n" +
          "      </Container>\n" +
          "    </div>\n" +
          "  );\n" +
          "};\n" +
          "\n" +
          "export default TestPage12;"
        } />
        <CodeBlock filename={"SuspenseServerComponent.tsx"} value={
          "import React from \"react\";\n" +
          "\n" +
          "const fetchData = async () => {\n" +
          "  // 2초 후에 데이터 반환\n" +
          "  return new Promise<string>((resolve) =>\n" +
          "    setTimeout(() => resolve(\"Server 컴포넌트 비동기 데이터 로드 완료!\"), 2000),\n" +
          "  );\n" +
          "};\n" +
          "\n" +
          "// 비동기적으로 데이터를 가져오는 컴포넌트\n" +
          "const SuspenseServerComponent = async () => {\n" +
          "  const data = await fetchData(); // 서버에서 데이터 가져오기\n" +
          "\n" +
          "  return (\n" +
          "    <div>\n" +
          "      {data}\n" +
          "    </div>\n" +
          "  );\n" +
          "};\n" +
          "\n" +
          "export default SuspenseServerComponent;\n"
        } />
      </Container>
    </div>
  );
};

export default TestPage12;