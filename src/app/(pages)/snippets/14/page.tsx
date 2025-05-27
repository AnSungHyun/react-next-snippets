import React, {Suspense} from "react";
import {Container} from "@mui/material";
import ResultBlock from "@/app/_component/CodeResultBlock";
import Loading from "@/app/_component/Loading/Loading";
import PropServerComponent from "@/app/(pages)/snippets/14/PropServerComponent";
import CodeBlock from '@/app/_component/CodeBlock';

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
        <CodeBlock value={
          "import React, {Suspense} from \"react\";\n" +
          "import {Container} from \"@mui/material\";\n" +
          "import ResultBlock from \"@/app/_component/CodeResultBlock\";\n" +
          "import Loading from \"@/app/_component/Loading/Loading\";\n" +
          "import PropServerComponent from \"@/app/(pages)/snippets/14/PropServerComponent\";\n" +
          "import CodeBlock from '@/app/_component/CodeBlock';\n" +
          "\n" +
          "const TestPage14: React.FC = async () => {\n" +
          "\n" +
          "  return (\n" +
          "    <div>\n" +
          "      <Container>\n" +
          "        <ResultBlock>\n" +
          "          <Suspense fallback={<Loading />}>\n" +
          "            <PropServerComponent />\n" +
          "          </Suspense>\n" +
          "        </ResultBlock>\n" +
          "      </Container>\n" +
          "    </div>\n" +
          "  );\n" +
          "};\n" +
          "\n" +
          "export default TestPage14;"
        } />
        <CodeBlock filename={"PropServerComponent.tsx"} value={
          "import React from \"react\";\n" +
          "import {getProductsApi, ProductResponse} from \"@/app/_api/GetProduct\";\n" +
          "import PropClientComponent from \"@/app/(pages)/snippets/14/PropClientComponent\";\n" +
          "\n" +
          "async function fetchProductData() {\n" +
          "  const responseTime = await new Promise<string>((resolve) =>\n" +
          "    setTimeout(() => resolve('Client 컴포넌트 비동기 데이터 로드 완료!'), 0)\n" +
          "  );\n" +
          "  // 서버에서 데이터를 가져오는 비동기 함수\n" +
          "  const response:ProductResponse = await getProductsApi();\n" +
          "  return response;\n" +
          "}\n" +
          "\n" +
          "const PropServerComponent: React.FC = async () => {\n" +
          "  const productDataPromise = await fetchProductData(); // Promise를 해결하여 데이터를 가져옴\n" +
          "\n" +
          "  return (\n" +
          "    <div>\n" +
          "      <h1>I'm Prop Server Component</h1>\n" +
          "      <PropClientComponent productResponse={productDataPromise}></PropClientComponent>\n" +
          "    </div>\n" +
          "  );\n" +
          "};\n" +
          "\n" +
          "export default PropServerComponent;"
        }/>
        <CodeBlock filename={"PropClientComponent.tsx"} value={
          "'use client'\n" +
          "\n" +
          "import React from \"react\";\n" +
          "import {ProductResponse} from \"@/app/_api/GetProduct\";\n" +
          "\n" +
          "interface PropClientComponentProps {\n" +
          "  productResponse: ProductResponse;\n" +
          "}\n" +
          "\n" +
          "const PropClientComponent: React.FC<PropClientComponentProps> = ({productResponse}) => {\n" +
          "  return (<div><h2>I'm Prop Client Component</h2>{JSON.stringify(productResponse, null, 2)}</div>);\n" +
          "};\n" +
          "\n" +
          "export default PropClientComponent;"
        }/>
      </Container>
    </div>
  );
};

export default TestPage14;