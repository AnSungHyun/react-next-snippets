import React, {Suspense} from "react";
import {Container} from "@mui/material";
import ResultBlock from "@/app/_component/CodeResultBlock";
import Loading from "@/app/_component/Loading/Loading";
import CustomClientErrorBoundary from "./CustomClientErrorBoundary";
import AxiosClientComponent from './AxiosClientComponent';
import CodeBlock from "@/app/_component/CodeBlock";

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
            <AxiosClientComponent />
          </CustomClientErrorBoundary>
        </ResultBlock>
        <CodeBlock filename={"page.tsx"} value={
          "import React, {Suspense} from \"react\";\n" +
          "import {Container} from \"@mui/material\";\n" +
          "import ResultBlock from \"@/app/_component/CodeResultBlock\";\n" +
          "import Loading from \"@/app/_component/Loading/Loading\";\n" +
          "import CustomClientErrorBoundary from \"./CustomClientErrorBoundary\";\n" +
          "import AxiosClientComponent from './AxiosClientComponent';\n" +
          "import CodeBlock from \"@/app/_component/CodeBlock\";\n" +
          "\n" +
          "const TestPage21: React.FC = async () => {\n" +
          "\n" +
          "  return (\n" +
          "    <div>\n" +
          "      <Container>\n" +
          "        <ResultBlock>\n" +
          "          <CustomClientErrorBoundary>\n" +
          "            <AxiosClientComponent />\n" +
          "          </CustomClientErrorBoundary>\n" +
          "        </ResultBlock>\n" +
          "      </Container>\n" +
          "    </div>\n" +
          "  );\n" +
          "};\n" +
          "\n" +
          "export default TestPage21;"
        }/>
        <CodeBlock filename={"AxiosClientComponent.tsx"} value={
          "'use client'\n" +
          "\n" +
          "import React, {useEffect, useState} from \"react\";\n" +
          "import {getErrorProductsApi, ProductResponse} from \"@/app/_api/GetProduct\";\n" +
          "import axios from \"axios\";\n" +
          "import Loading from \"@/app/_component/Loading/Loading\";\n" +
          "\n" +
          "const AxiosClientComponent: React.FC = () => {\n" +
          "  const [productResponse, setProductResponse] = useState<ProductResponse>();\n" +
          "  // const [data, setData] = useState<any>(null); // 데이터를 저장할 상태\n" +
          "  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태\n" +
          "  const [error, setError] = useState<string | null>(null); // 오류 상태\n" +
          "\n" +
          "  useEffect(() => {\n" +
          "    const fetchData = async () => {\n" +
          "      try {\n" +
          "        setLoading(true); // 로딩 시작\n" +
          "        const response = await getErrorProductsApi(); // API 요청\n" +
          "        setProductResponse(response); // 데이터 설정\n" +
          "      } catch (err) {\n" +
          "        // 오류 처리\n" +
          "        if (axios.isAxiosError(err)) {\n" +
          "          setError(err.message + \" \" + err.config?.url); // Axios 오류 메시지 설정\n" +
          "        } else {\n" +
          "          setError('알 수 없는 오류가 발생했습니다.'); // 일반 오류 처리\n" +
          "        }\n" +
          "      } finally {\n" +
          "        setLoading(false); // 로딩 종료\n" +
          "      }\n" +
          "    };\n" +
          "\n" +
          "    fetchData(); // 데이터 fetching 호출\n" +
          "  }, []); // 컴포넌트 마운트 시 한 번 호출\n" +
          "\n" +
          "  // 로딩 중일 때\n" +
          "  if (loading) {\n" +
          "    return <div><Loading /></div>;\n" +
          "  }\n" +
          "\n" +
          "  // 오류가 발생했을 때\n" +
          "  if(error) {\n" +
          "    throw new Error(error);\n" +
          "    // return <div>오류 발생: {error}</div>;\n" +
          "  }\n" +
          "\n" +
          "  return (\n" +
          "    <div>\n" +
          "      <h2>I'm Axios Client Component</h2>\n" +
          "      <br/>\n" +
          "      <>{JSON.stringify(productResponse, null, 2)}</>\n" +
          "    </div>\n" +
          "  );\n" +
          "};\n" +
          "\n" +
          "export default AxiosClientComponent;"
        }/>
        <CodeBlock filename={"CustomClientErrorBoundary.tsx"} value={
          "export default function CustomErrorBoundary({ children }: CustomErrorBoundaryProps) {\n" +
          "  return (\n" +
          "    <ErrorBoundary\n" +
          "      FallbackComponent={ErrorFallback}\n" +
          "      onReset={() => {\n" +
          "        // 리셋 시 추가적인 정리 작업이 필요한 경우 여기에 작성\n" +
          "      }}\n" +
          "    >\n" +
          "      {children}\n" +
          "    </ErrorBoundary>\n" +
          "  );\n" +
          "}"
        }/>
      </Container>
    </div>
  );
};

export default TestPage21;