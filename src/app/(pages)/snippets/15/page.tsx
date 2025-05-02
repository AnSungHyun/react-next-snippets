import React, {Suspense} from "react";
import {Container} from "@mui/material";
import ResultBlock from "@/app/_component/CodeResultBlock";
import Loading from "@/app/_component/Loading/Loading";
import {dehydrate, HydrationBoundary, QueryClient, useQueryClient} from "@tanstack/react-query";
import {getProductsApi, ProductResponse} from "@/app/_api/GetProduct";
import UseQueryClientComponent from "@/app/(pages)/snippets/15/UseQueryClientComponent";

const TestPage15: React.FC = async () => {

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery<ProductResponse>({
    queryKey: ["products", "server"],
    queryFn: () => getProductsApi(),
    staleTime: 3000,
    gcTime: 0
  });

  return (
    <div>
      <Container>
        <p>
          - Server 컴포넌트에서 데이터 prefetch 후 Client 컴포넌트에서 useQuery로 미리 가져온 데이터 사용
        </p>
        <p>
          - prefetch 된 데이터와 client에서 요청한 데이터가 다를 경우, prefetch 된 데이터가 우선적으로 노출되고 client 데이터가 이후 반영됨
        </p>
        <p>
          - data 의 상태가 stale 상태가 되면, client 컴포넌트 상태 값에 따라 리렌더링 되면서 자동으로 최신 데이터를 다시 fetch 함.
        </p>
        <h2>
          ( 이해되지 않는 부분 )
        </h2>
        <p>
          - 최초 1회는 prefetch 된 데이터만 을 사용하고, Client에서 는 API 요청 자체를 하지 않음.
        </p>
        <p>
          - 2회 요청 부터는 prefetch에서도 요청하고 Client에서도 useQuery를 사용하여 API 요청을 하여 2번 요청 하게됨.
        </p>
        <p>
          - 미리 prefetch 된 데이터를 사용하여 SSR 같은 효과를 얻을 수 잇으나, 같은 api 를 2회 요청하게되어 부하를 증가시킬 우려가 있음.
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

export default TestPage15;