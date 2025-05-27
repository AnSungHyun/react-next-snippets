import React, {Suspense} from "react";
import {Container} from "@mui/material";
import ResultBlock from "@/app/_component/CodeResultBlock";
import Loading from "@/app/_component/Loading/Loading";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import DynamicClientComponent from "./DynamicClientComponent";
import {getProductsApi, ProductResponse} from "@/app/_api/GetProduct";
import CustomClientErrorBoundary from "./CustomClientErrorBoundary";
import CodeBlock from '@/app/_component/CodeBlock';

const TestPage19: React.FC = async () => {

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery<ProductResponse>({
    queryKey: ["products", "server"],
    queryFn: () => getProductsApi(),
    staleTime: 10000,
    gcTime: 0
  });

  return (
    <div>
      <Container>
        <p>
          - Client Comp 에서 new Error() 발생 시 ErrorBoundary로 처리
        </p>
        <p>
          - ErrorBoundary 에서 useRouter를 통해 다른 페이지로 이동가능 ex) 세션 만료 시 로그인 페이지 이동
        </p>
        <p>
          - React 의 기본 Error Boundary는 class 로 작성해야 함
        </p>
        <p>
          - react-error-boundary 라이브러리를 사용하면 함수형 컴포넌트로 작성 가능
        </p>
        <ResultBlock>
          <CustomClientErrorBoundary>
            <Suspense fallback={<Loading/>}>
              <HydrationBoundary state={dehydrate(queryClient)}>
                <DynamicClientComponent />
              </HydrationBoundary>
            </Suspense>
          </CustomClientErrorBoundary>
        </ResultBlock>
        <CodeBlock filename={"page.tsx"} value={
          "import React, {Suspense} from \"react\";\n" +
          "import {Container} from \"@mui/material\";\n" +
          "import ResultBlock from \"@/app/_component/CodeResultBlock\";\n" +
          "import Loading from \"@/app/_component/Loading/Loading\";\n" +
          "import {dehydrate, HydrationBoundary, QueryClient} from \"@tanstack/react-query\";\n" +
          "import DynamicClientComponent from \"./DynamicClientComponent\";\n" +
          "import {getProductsApi, ProductResponse} from \"@/app/_api/GetProduct\";\n" +
          "import CustomClientErrorBoundary from \"./CustomClientErrorBoundary\";\n" +
          "\n" +
          "const TestPage19: React.FC = async () => {\n" +
          "\n" +
          "  const queryClient = new QueryClient();\n" +
          "  await queryClient.prefetchQuery<ProductResponse>({\n" +
          "    queryKey: [\"products\", \"server\"],\n" +
          "    queryFn: () => getProductsApi(),\n" +
          "    staleTime: 10000,\n" +
          "    gcTime: 0\n" +
          "  });\n" +
          "\n" +
          "  return (\n" +
          "    <div>\n" +
          "      <Container>\n" +
          "        <p>\n" +
          "        <ResultBlock>\n" +
          "          <CustomClientErrorBoundary>\n" +
          "            <Suspense fallback={<Loading/>}>\n" +
          "              <HydrationBoundary state={dehydrate(queryClient)}>\n" +
          "                <DynamicClientComponent />\n" +
          "              </HydrationBoundary>\n" +
          "            </Suspense>\n" +
          "          </CustomClientErrorBoundary>\n" +
          "        </ResultBlock>\n" +
          "      </Container>\n" +
          "    </div>\n" +
          "  );\n" +
          "};\n" +
          "\n" +
          "export default TestPage19;"
        }/>
        <CodeBlock filename={"UseQueryClientComponent.tsx"} value={
          "'use client'\n" +
          "\n" +
          "import React, {useEffect} from \"react\";\n" +
          "import {useQuery} from \"@tanstack/react-query\";\n" +
          "import {getProductsApi, ProductResponse} from \"@/app/_api/GetProduct\";\n" +
          "\n" +
          "const UseQueryClientComponent: React.FC = () => {\n" +
          "\n" +
          "  const {data: productResponse, error, isError, status, fetchStatus, } = useQuery<ProductResponse>({\n" +
          "    queryKey: [\"products\", \"server\"],\n" +
          "    queryFn: () => getProductsApi(),\n" +
          "    staleTime: 10000,\n" +
          "  });\n" +
          "\n" +
          "  if (isError) {\n" +
          "    // 에러가 발생하면 ErrorBoundary가 처리하므로 여기서는 null을 반환\n" +
          "    throw error;\n" +
          "  }\n" +
          "\n" +
          "  throw new Error(\"Error occurred in UseQueryClientComponent\");\n" +
          "\n" +
          "  return (\n" +
          "    <div>\n" +
          "      <h2>I'm UseQuery Client Component</h2>\n" +
          "      <br/>\n" +
          "      <>{JSON.stringify(productResponse, null, 2)}</>\n" +
          "    </div>\n" +
          "  );\n" +
          "};\n" +
          "\n" +
          "export default UseQueryClientComponent;"
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

export default TestPage19;