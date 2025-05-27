import React, {Suspense} from "react";
import {Container} from "@mui/material";
import ResultBlock from "@/app/_component/CodeResultBlock";
import Loading from "@/app/_component/Loading/Loading";
import CustomClientErrorBoundary from "./CustomClientErrorBoundary";
import AxiosServerComponent from './AxiosServerComponent';
import CodeBlock from "@/app/_component/CodeBlock";

const TestPage22: React.FC = async () => {

  return (
    <div>
      <Container>
        <p>
          - Server Comp 에서 axios, fetch 오류 발생 시 ErrorBoundary로 처리
        </p>
        <p>
          - resetErrorBoundary 를 사용하여 재실행 가능
        </p>
        <ResultBlock>
          <CustomClientErrorBoundary>
            <Suspense fallback={<Loading/>}>
              <AxiosServerComponent />
            </Suspense>
          </CustomClientErrorBoundary>
        </ResultBlock>
        <CodeBlock filename={"page.tsx"} value={
          "import React, {Suspense} from \"react\";\n" +
          "import {Container} from \"@mui/material\";\n" +
          "import ResultBlock from \"@/app/_component/CodeResultBlock\";\n" +
          "import Loading from \"@/app/_component/Loading/Loading\";\n" +
          "import CustomClientErrorBoundary from \"./CustomClientErrorBoundary\";\n" +
          "import AxiosServerComponent from './AxiosServerComponent';\n" +
          "import CodeBlock from \"@/app/_component/CodeBlock\";\n" +
          "\n" +
          "const TestPage22: React.FC = async () => {\n" +
          "\n" +
          "  return (\n" +
          "    <div>\n" +
          "      <Container>\n" +
          "        <ResultBlock>\n" +
          "          <CustomClientErrorBoundary>\n" +
          "            <Suspense fallback={<Loading/>}>\n" +
          "              <AxiosServerComponent />\n" +
          "            </Suspense>\n" +
          "          </CustomClientErrorBoundary>\n" +
          "        </ResultBlock>\n" +
          "      </Container>\n" +
          "    </div>\n" +
          "  );\n" +
          "};\n" +
          "\n" +
          "export default TestPage22;"
        }/>
        <CodeBlock filename={"AxiosServerComponent.tsx"} value={
          "import React from \"react\";\n" +
          "import axios from \"axios\";\n" +
          "import {getErrorProductsApi} from \"@/app/_api/GetProduct\";\n" +
          "\n" +
          "const AxiosServerComponent: React.FC = async () => {\n" +
          "  try {\n" +
          "    const productResponse = await getErrorProductsApi();\n" +
          "\n" +
          "    return (\n" +
          "      <div>\n" +
          "        <h2>I'm Axios Server Component</h2>\n" +
          "        <br/>\n" +
          "        <>{JSON.stringify(productResponse, null, 2)}</>\n" +
          "      </div>\n" +
          "    );\n" +
          "\n" +
          "  } catch (err) {\n" +
          "    if (axios.isAxiosError(err)) {\n" +
          "      throw new Error(err.message + \" \" + err.config?.url);\n" +
          "    } else {\n" +
          "      throw new Error('알 수 없는 오류가 발생했습니다.');\n" +
          "    }\n" +
          "  }\n" +
          "};\n" +
          "\n" +
          "export default AxiosServerComponent;"
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

export default TestPage22;