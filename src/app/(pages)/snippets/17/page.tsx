import React, {Suspense} from "react";
import {Container} from "@mui/material";
import ResultBlock from "@/app/_component/CodeResultBlock";
import Loading from "@/app/_component/Loading/Loading";
import {dehydrate, HydrationBoundary, QueryClient, useQueryClient} from "@tanstack/react-query";
import {getProductsApi, ProductResponse} from "@/app/_api/GetProduct";
import DynamicClientComponent from "@/app/(pages)/snippets/17/DynamicClientComponent";
import PrefetchServerComponent from "@/app/(pages)/snippets/17/PrefetchServerComponent";

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
      </Container>
    </div>
  );
};

export default TestPage17;