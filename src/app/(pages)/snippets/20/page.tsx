import React, {Suspense} from "react";
import {Container} from "@mui/material";
import ResultBlock from "@/app/_component/CodeResultBlock";
import Loading from "@/app/_component/Loading/Loading";
import {QueryClient} from "@tanstack/react-query";
import {getProductsApi, ProductResponse} from "@/app/_api/GetProduct";
import ServerComponent from "./ServerComponent";
import CustomServerErrorBoundary from "./CustomServerErrorBoundary";
import CodeBlock from '@/app/_component/CodeBlock';

const TestPage20: React.FC = async () => {

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
          - Server 컴포넌트 강제로 new Error() 발생 시 ErrorBoundary로 처리
        </p>
        <ResultBlock>
          <CustomServerErrorBoundary>
            <Suspense fallback={<Loading/>}>
              <ServerComponent />
            </Suspense>
          </CustomServerErrorBoundary>
        </ResultBlock>
        <CodeBlock filename={"page.tsx"} value={
          "import React, {Suspense} from \"react\";\n" +
          "import {Container} from \"@mui/material\";\n" +
          "import ResultBlock from \"@/app/_component/CodeResultBlock\";\n" +
          "import Loading from \"@/app/_component/Loading/Loading\";\n" +
          "import {QueryClient} from \"@tanstack/react-query\";\n" +
          "import {getProductsApi, ProductResponse} from \"@/app/_api/GetProduct\";\n" +
          "import ServerComponent from \"./ServerComponent\";\n" +
          "import CustomServerErrorBoundary from \"./CustomServerErrorBoundary\";\n" +
          "import CodeBlock from '@/app/_component/CodeBlock';\n" +
          "\n" +
          "const TestPage20: React.FC = async () => {\n" +
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
          "        <ResultBlock>\n" +
          "          <CustomServerErrorBoundary>\n" +
          "            <Suspense fallback={<Loading/>}>\n" +
          "              <ServerComponent />\n" +
          "            </Suspense>\n" +
          "          </CustomServerErrorBoundary>\n" +
          "        </ResultBlock>\n" +
          "      </Container>\n" +
          "    </div>\n" +
          "  );\n" +
          "};\n" +
          "\n" +
          "export default TestPage20;"
        }/>
        <CodeBlock filename={"ServerComponent.tsx"} value={
          "import React from \"react\";\n" +
          "\n" +
          "const ServerComponent: React.FC = () => {\n" +
          "\n" +
          "  const API_URL = process.env.BACKEND_API_URL;\n" +
          "  throw new Error(\"Error occurred in ServerComponent\");\n" +
          "  // return (\n" +
          "  //   <div style={{ border: \"1px solid blue\" }}>\n" +
          "  //     <h1>\n" +
          "  //       I'm Server Component\n" +
          "  //       BACKEND_API_URL: {API_URL}\n" +
          "  //     </h1>\n" +
          "  //   </div>\n" +
          "  // );\n" +
          "};\n" +
          "\n" +
          "export default ServerComponent;"
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

export default TestPage20;