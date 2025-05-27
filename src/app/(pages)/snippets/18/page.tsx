import React, {Suspense} from "react";
import {Container} from "@mui/material";
import ResultBlock from "@/app/_component/CodeResultBlock";
import Loading from "@/app/_component/Loading/Loading";
import {dehydrate, HydrationBoundary, QueryClient, useQueryClient} from "@tanstack/react-query";
import {getProductsApi, ProductResponse} from "@/app/_api/GetProduct";
import DynamicClientComponent from '@/app/(pages)/snippets/18/DynamicClientComponent';
import CodeBlock from "@/app/_component/CodeBlock";

const TestPage18: React.FC = async () => {

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
          - prefetchQuery 사용 시 다른 페이지 다녀온 후 useQuery의 불필요한 요청이 자꾸 발생하는 문제 때문에 해결방법을 찾아봄
        </p>
        <p>
          - useQuery 를 사용하는 Client 컴포넌트를 즉시 렌더링 하는 것이 아닌, 버튼을 클릭할 때 렌더링 하도록 하였더니 구현 가능
        </p>
        <p>
          - 이후 에는 다른 페이지를 다녀와도 prefetch로 수행한 결과를 useQuery로 가져와서 사용 하는것 을 확인할 수 있음.
        </p>
        <p>
          - staleTime 10초가 지난 후에는 버튼을 닫앗다 열어서 클릭하면 리페치 함
        </p>
        <p>
          - 이 예시는 버튼으로 불필요한 요청의 발생을 줄였으나, 일반적인 경우 useEffect를 사용하여 컴포넌트가 마운트 될 때 useQuery를 호출하도록 구현
        </p>
        <p>
          - "15번" 예시에서 이해가 가지 않던 부분에 대한 문제 해결.
        </p>
        <ResultBlock>
          <Suspense fallback={<Loading/>}>
            <HydrationBoundary state={dehydrate(queryClient)}>
              <DynamicClientComponent />
            </HydrationBoundary>
          </Suspense>
        </ResultBlock>
        <CodeBlock filename={"page.tsx"} value={
          "import React, {Suspense} from \"react\";\n" +
          "import {Container} from \"@mui/material\";\n" +
          "import ResultBlock from \"@/app/_component/CodeResultBlock\";\n" +
          "import Loading from \"@/app/_component/Loading/Loading\";\n" +
          "import {dehydrate, HydrationBoundary, QueryClient, useQueryClient} from \"@tanstack/react-query\";\n" +
          "import {getProductsApi, ProductResponse} from \"@/app/_api/GetProduct\";\n" +
          "import DynamicClientComponent from '@/app/(pages)/snippets/18/DynamicClientComponent';\n" +
          "import CodeBlock from \"@/app/_component/CodeBlock\";\n" +
          "\n" +
          "const TestPage18: React.FC = async () => {\n" +
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
          "          <Suspense fallback={<Loading/>}>\n" +
          "            <HydrationBoundary state={dehydrate(queryClient)}>\n" +
          "              <DynamicClientComponent />\n" +
          "            </HydrationBoundary>\n" +
          "          </Suspense>\n" +
          "        </ResultBlock>\n" +
          "      </Container>\n" +
          "    </div>\n" +
          "  );\n" +
          "};\n" +
          "\n" +
          "export default TestPage18;"
        }/>
        <CodeBlock filename={"DynamicClientComponent.tsx"} value={
          "'use client'\n" +
          "\n" +
          "import React, {useEffect} from \"react\";\n" +
          "import Button from \"@mui/material/Button\";\n" +
          "import UseQueryClientComponent from \"@/app/(pages)/snippets/18/UseQueryClientComponent\";\n" +
          "\n" +
          "const DynamicClientComponent: React.FC = () => {\n" +
          "  const [buttonTwo, setButtonTwo] = React.useState(false);\n" +
          "\n" +
          "\n" +
          "  const handleButtonTwoClick = () => {\n" +
          "    setButtonTwo(!buttonTwo);\n" +
          "  }\n" +
          "\n" +
          "  // 동적 렌더링을 바로 렌더링 하고 싶은 경우 하단 코드 주석 해제\n" +
          "  // useEffect(() => {\n" +
          "  //   setButtonTwo(!buttonTwo);\n" +
          "  // }, []);\n" +
          "\n" +
          "  return (\n" +
          "    <div>\n" +
          "      <h2>I'm Dynamic Client Component</h2>\n" +
          "      <Button variant=\"outlined\" onClick={handleButtonTwoClick}>클라이언트 컴포넌트</Button>\n" +
          "      <br/>\n" +
          "      {buttonTwo && <div><UseQueryClientComponent /></div>}\n" +
          "    </div>\n" +
          "  );\n" +
          "};\n" +
          "\n" +
          "export default DynamicClientComponent;"
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
          "  const {data: productResponse, status, fetchStatus, } = useQuery<ProductResponse>({\n" +
          "    queryKey: [\"products\", \"server\"],\n" +
          "    queryFn: () => getProductsApi(),\n" +
          "    staleTime: 10000,\n" +
          "  });\n" +
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
      </Container>
    </div>
  );
};

export default TestPage18;