import React, {Suspense} from "react";
import {Container} from "@mui/material";
import ResultBlock from "@/app/_component/CodeResultBlock";
import Loading from "@/app/_component/Loading/Loading";
import {dehydrate, HydrationBoundary, QueryClient, useQueryClient} from "@tanstack/react-query";
import {getProductsApi, ProductResponse} from "@/app/_api/GetProduct";
import UseQueryClientComponent from '@/app/(pages)/snippets/16/UseQueryClientComponent';
import CodeBlock from "@/app/_component/CodeBlock";

const TestPage16: React.FC = async () => {

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery<ProductResponse>({
    queryKey: ["products", "server"],
    queryFn: () => getProductsApi(),
    staleTime: 3000,
    // staleTime: 0,
    gcTime: 0
  });

  console.log("prefetchQuery first request");
  await queryClient.prefetchQuery<ProductResponse>({
    queryKey: ["products", "server"],
    queryFn: () => getProductsApi(),
    staleTime: 3000,
    // staleTime: 0,
    gcTime: 0
  });
  console.log("prefetchQuery second request");

  return (
    <div>
      <Container>
        <p>
          - prefetchQuery의 staleTime을 3000으로 연속 2번 호출 시 1번째만 실제 API를 호출한다.
        </p>
        <p>
          - prefetchQuery의 staleTime을 0으로 설정하면 연속 2번 호출시 1번째, 2번째 모두 실제 API 를 호출한다.
        </p>
        <ResultBlock>
          <Suspense fallback={<Loading/>}>
            <HydrationBoundary state={dehydrate(queryClient)}>
              <UseQueryClientComponent />
            </HydrationBoundary>
          </Suspense>
        </ResultBlock>
        <CodeBlock value={
          "import React, {Suspense} from \"react\";\n" +
          "import {Container} from \"@mui/material\";\n" +
          "import ResultBlock from \"@/app/_component/CodeResultBlock\";\n" +
          "import Loading from \"@/app/_component/Loading/Loading\";\n" +
          "import {dehydrate, HydrationBoundary, QueryClient, useQueryClient} from \"@tanstack/react-query\";\n" +
          "import {getProductsApi, ProductResponse} from \"@/app/_api/GetProduct\";\n" +
          "import UseQueryClientComponent from \"@/app/(pages)/snippets/16/UseQueryClientComponent\";\n" +
          "\n" +
          "const TestPage16: React.FC = async () => {\n" +
          "\n" +
          "  const queryClient = new QueryClient();\n" +
          "  await queryClient.prefetchQuery<ProductResponse>({\n" +
          "    queryKey: [\"products\", \"server\"],\n" +
          "    queryFn: () => getProductsApi(),\n" +
          "    staleTime: 3000,\n" +
          "    // staleTime: 0,\n" +
          "    gcTime: 0\n" +
          "  });\n" +
          "\n" +
          "  console.log(\"prefetchQuery first request\");\n" +
          "  await queryClient.prefetchQuery<ProductResponse>({\n" +
          "    queryKey: [\"products\", \"server\"],\n" +
          "    queryFn: () => getProductsApi(),\n" +
          "    staleTime: 3000,\n" +
          "    // staleTime: 0,\n" +
          "    gcTime: 0\n" +
          "  });\n" +
          "  console.log(\"prefetchQuery second request\");\n" +
          "\n" +
          "  return (\n" +
          "    <div>\n" +
          "      <Container>\n" +
          "        <p>\n" +
          "          - prefetchQuery의 staleTime을 3000으로 연속 2번 호출 시 1번째만 실제 API를 호출한다.\n" +
          "        </p>\n" +
          "        <p>\n" +
          "          - prefetchQuery의 staleTime을 0으로 설정하면 연속 2번 호출시 1번째, 2번째 모두 실제 API 를 호출한다.\n" +
          "        </p>\n" +
          "        <ResultBlock>\n" +
          "          <Suspense fallback={<Loading/>}>\n" +
          "            <HydrationBoundary state={dehydrate(queryClient)}>\n" +
          "              <UseQueryClientComponent />\n" +
          "            </HydrationBoundary>\n" +
          "          </Suspense>\n" +
          "        </ResultBlock>\n" +
          "      </Container>\n" +
          "    </div>\n" +
          "  );\n" +
          "};\n" +
          "\n" +
          "export default TestPage16;"
        } />
      </Container>
    </div>
  );
};

export default TestPage16;