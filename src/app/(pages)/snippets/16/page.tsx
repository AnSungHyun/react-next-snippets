import React, {Suspense} from "react";
import {Container} from "@mui/material";
import ResultBlock from "@/app/_component/CodeResultBlock";
import Loading from "@/app/_component/Loading/Loading";
import {dehydrate, HydrationBoundary, QueryClient, useQueryClient} from "@tanstack/react-query";
import {getServerProductsApi, ProductResponse} from "@/app/_api/ServerGetProduct";
import UseQueryClientComponent from "@/app/(pages)/snippets/16/UseQueryClientComponent";

const TestPage16: React.FC = async () => {

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery<ProductResponse>({
    queryKey: ["products", "server"],
    queryFn: () => getServerProductsApi(),
    staleTime: 3000,
    // staleTime: 0,
    gcTime: 0
  });

  console.log("prefetchQuery first request");
  await queryClient.prefetchQuery<ProductResponse>({
    queryKey: ["products", "server"],
    queryFn: () => getServerProductsApi(),
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
      </Container>
    </div>
  );
};

export default TestPage16;