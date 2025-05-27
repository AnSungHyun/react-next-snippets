import React, {Suspense} from "react";
import {Container} from "@mui/material";
import ResultBlock from "@/app/_component/CodeResultBlock";
import Loading from "@/app/_component/Loading/Loading";
import {dehydrate, HydrationBoundary, QueryClient, useQueryClient} from "@tanstack/react-query";
import {getProductsApi, ProductResponse} from "@/app/_api/GetProduct";
import DynamicClientComponent from "@/app/(pages)/snippets/17/DynamicClientComponent";
import PrefetchServerComponent from '@/app/(pages)/snippets/17/PrefetchServerComponent';
import CodeBlock from "@/app/_component/CodeBlock";

const TestPage17: React.FC = async () => {

  // const queryClient = new QueryClient();

  // 이 영역을 주석 해제 하여 다시 확인
  // await queryClient.prefetchQuery<ProductResponse>({
  //   queryKey: ["products", "server"],
  //   queryFn: () => getProductsApi(),
  //   staleTime: 0,
  //   gcTime: 0
  // });

  return (
    <div>
      <Container>
        <p>
          - HydrationBoundary 를 명시하지 않더라도 useQuery로 캐시 데이터 접근 가능
        </p>
        <p>
          - PrefetchServerComponent 가 SSR 되고 미리 prefetch 하였지만, "클라이언트 컴포넌트" 클릭 시 useQuery 에서 캐시데이터를 가져옴.
        </p>
        <p>
          - 또한, 이전 useQuery 테스트에서는 최초 1회만 prefetch 데이터를 사용했으나, 이번에는 Link로 페이지를 이동해도 prefetch 된 데이터를 사용함.
        </p>
        <p>
          - 이 예시코느는 처음에는 "서버컴포넌트" , "클라이언트컴포넌트" 순서대로 눌러보고, 새로고침 후 반대 순서대로 눌러보면 확인 가능
        </p>
        <ResultBlock>
          <Suspense fallback={<Loading/>}>
            {/*<HydrationBoundary state={dehydrate(queryClient)}>*/}
              <DynamicClientComponent>
                <div><PrefetchServerComponent /></div>
              </DynamicClientComponent>
            {/*</HydrationBoundary>*/}
          </Suspense>
        </ResultBlock>
        <CodeBlock filename={"page.tsx"} value={
          "import React, {Suspense} from \"react\";\n" +
          "import {Container} from \"@mui/material\";\n" +
          "import ResultBlock from \"@/app/_component/CodeResultBlock\";\n" +
          "import DynamicClientComponent from \"@/app/(pages)/snippets/17/DynamicClientComponent\";\n" +
          "import PrefetchServerComponent from '@/app/(pages)/snippets/17/PrefetchServerComponent';\n" +
          "\n" +
          "const TestPage17: React.FC = async () => {\n" +
          "\n" +
          "  return (\n" +
          "    <div>\n" +
          "      <Container>\n" +
          "        <ResultBlock>\n" +
          "          <Suspense fallback={<Loading/>}>\n" +
          "            <DynamicClientComponent>\n" +
          "              <PrefetchServerComponent />\n" +
          "            </DynamicClientComponent>\n" +
          "          </Suspense>\n" +
          "        </ResultBlock>\n" +
          "      </Container>\n" +
          "    </div>\n" +
          "  );\n" +
          "};\n" +
          "\n" +
          "export default TestPage17;"
        }/>
        <CodeBlock filename={"DynamicClientComponent.tsx"} value={
          "'use client'\n" +
          "\n" +
          "import React from \"react\";\n" +
          "import Button from \"@mui/material/Button\";\n" +
          "import UseQueryClientComponent from \"@/app/(pages)/snippets/17/UseQueryClientComponent\";\n" +
          "\n" +
          "interface Props {\n" +
          "  children: React.ReactNode;\n" +
          "}\n" +
          "\n" +
          "const DynamicClientComponent: React.FC<Props> = ({children}) => {\n" +
          "  const [buttonOne, setButtonOne] = React.useState(false);\n" +
          "  const [buttonTwo, setButtonTwo] = React.useState(false);\n" +
          "\n" +
          "  const handleButtonOneClick = () => {\n" +
          "    setButtonOne(!buttonOne);\n" +
          "  }\n" +
          "\n" +
          "  const handleButtonTwoClick = () => {\n" +
          "    setButtonTwo(!buttonTwo);\n" +
          "  }\n" +
          "\n" +
          "  return (\n" +
          "    <div>\n" +
          "      <h2>I'm Dynamic Client Component</h2>\n" +
          "      <Button variant=\"outlined\" onClick={handleButtonOneClick}>서버 컴포넌트</Button>\n" +
          "      <Button variant=\"outlined\" onClick={handleButtonTwoClick}>클라이언트 컴포넌트</Button>\n" +
          "      <br/>\n" +
          "      {buttonOne && <div>{children}</div>} {/*이곳에 PrefetchServerComponent 가 렌더링 됩니다.*/}\n" +
          "      {buttonTwo && <div><UseQueryClientComponent /></div>}\n" +
          "    </div>\n" +
          "  );\n" +
          "};\n" +
          "\n" +
          "export default DynamicClientComponent;"
        }/>
        <CodeBlock filename={"PrefetchServerComponent.tsx"} value={
          "import React from \"react\";\n" +
          "import {dehydrate, HydrationBoundary, QueryClient} from \"@tanstack/react-query\";\n" +
          "import {getProductsApi, ProductResponse} from \"@/app/_api/GetProduct\";\n" +
          "import UseQueryClientComponent from '@/app/(pages)/snippets/16/UseQueryClientComponent';\n" +
          "\n" +
          "const PrefetchServerComponent: React.FC = async () => {\n" +
          "  const queryClient = new QueryClient();\n" +
          "  await queryClient.prefetchQuery<ProductResponse>({\n" +
          "    queryKey: [\"products\", \"server\"],\n" +
          "    queryFn: () => getProductsApi(),\n" +
          "    staleTime: 3000,\n" +
          "    // staleTime: 0,\n" +
          "    gcTime: 0\n" +
          "  });\n" +
          "  console.log(\"PrefetchServerComponent - queryClient\", queryClient);\n" +
          "\n" +
          "  const myData = queryClient.getQueryData([\"products\", \"server\"]);\n" +
          "  return (\n" +
          "    <div>\n" +
          "      <h2>\n" +
          "        Server 컴포넌트\n" +
          "      </h2>\n" +
          "      <HydrationBoundary state={dehydrate(queryClient)}>\n" +
          "        {/*<UseQueryClientComponent />*/}\n" +
          "      </HydrationBoundary>\n" +
          "      {JSON.stringify(myData, null, 2)}\n" +
          "    </div>\n" +
          "  );\n" +
          "};\n" +
          "\n" +
          "export default PrefetchServerComponent;"
        }/>
        <CodeBlock filename={"UseQueryClientComponent.tsx"} value={
          "'use client'\n" +
          "\n" +
          "import React from \"react\";\n" +
          "import {getProductsApi, ProductResponse} from \"@/app/_api/GetProduct\";\n" +
          "import {useQuery} from \"@tanstack/react-query\";\n" +
          "\n" +
          "const UseQueryClientComponent: React.FC = () => {\n" +
          "\n" +
          "  const {data: productResponse, status, fetchStatus, } = useQuery<ProductResponse>({\n" +
          "    queryKey: [\"products\", \"server\"],\n" +
          "    queryFn: () => getProductsApi(),\n" +
          "    staleTime: 3000,\n" +
          "    // gcTime: 1000,\n" +
          "    // gcTime: 6000,\n" +
          "  });\n" +
          "\n" +
          "  return (\n" +
          "    <div>\n" +
          "      <h2>I'm UseQuery Client Component</h2>\n" +
          "      <br/>\n" +
          "      {JSON.stringify(productResponse, null, 2)}\n" +
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

export default TestPage17;