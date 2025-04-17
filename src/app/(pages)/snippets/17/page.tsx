import React, {Suspense} from "react";
import {Container} from "@mui/material";
import ResultBlock from "@/app/_component/CodeResultBlock";
import Loading from "@/app/_component/Loading/Loading";
import {dehydrate, HydrationBoundary, QueryClient, useQueryClient} from "@tanstack/react-query";
import {getServerProductsApi, ProductResponse} from "@/app/_api/ServerGetProduct";
import DynamicClientComponent from "@/app/(pages)/snippets/17/DynamicClientComponent";
import PrefetchServerComponent from "@/app/(pages)/snippets/17/PrefetchServerComponent";

const TestPage17: React.FC = async () => {

  const queryClient = new QueryClient();

  // 이 영역을 주석 해제 하여 다시 확인
  await queryClient.prefetchQuery<ProductResponse>({
    queryKey: ["products", "server"],
    queryFn: () => getServerProductsApi(),
    staleTime: 3000,
    gcTime: 0
  });

  return (
    <div>
      <Container>
        <p>
          - 중첩 HydrationBoundary 외부, 내부가 분리되어 key 가 같더라도 useQuery로 접근 불가
        </p>
        <p>
          - PrefetchServerComponent 가 SSR 되고 미리 prefetch 하였지만, "클라이언트 컴포넌트" 클릭 시 useQuery 에서 api 요청 작업이 수행된다.
        </p>
        <p>
          - page.tsx 의 prefetchQuery 주석을 풀어서 다시 요청해보면 "클라이언트 컴포넌트" 클릭 시 fetch 된 데이터를 가져오는 것을 확인 가능.
        </p>
        <p>
          - 또한, 이전 useQuery 테스트에서는 최초 1회만 prefetch 데이터를 사용했으나, 이번에는 Link로 페이지를 이동해도 prefetch 된 데이터를 사용함.
        </p>
        <ResultBlock>
          <Suspense fallback={<Loading/>}>
            <HydrationBoundary state={dehydrate(queryClient)}>
              <DynamicClientComponent>
                <div><PrefetchServerComponent /></div>
              </DynamicClientComponent>
            </HydrationBoundary>
          </Suspense>
        </ResultBlock>
      </Container>
    </div>
  );
};

export default TestPage17;