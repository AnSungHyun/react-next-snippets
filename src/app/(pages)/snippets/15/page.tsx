import React, {Suspense} from "react";
import {Container} from "@mui/material";
import ResultBlock from "@/app/_component/CodeResultBlock";
import Loading from "@/app/_component/Loading/Loading";
import {dehydrate, HydrationBoundary, QueryClient, useQueryClient} from "@tanstack/react-query";
import {getServerProductsApi, ProductResponse} from "@/app/_api/ServerGetProduct";
import UseQueryClientComponent from "@/app/(pages)/snippets/15/UseQueryClientComponent";

const TestPage15: React.FC = async () => {

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery<ProductResponse>({
    queryKey: ["products", "server"],
    queryFn: () => getServerProductsApi(),
    staleTime: 10000,
    gcTime: 10000
  });

  return (
    <div>
      <Container>
        <p>
          - Server 컴포넌트에서 데이터 prefetch 후 Client 컴포넌트에서 useQuery로 미리 가져온 데이터 사용
        </p>
        <p>
          - useQuery를 사용하여 brwoser에 (tanstack query)cache 된 데이터를 사용, 하지만 클라이언트에서도 다시 요청함.
        </p>
        <p>
          - 미리 prefetch 된 데이터를 사용하여 SSR 같은 효과를 얻을 수 잇으나, 같은 api 를 2회 요청하게되어 부하는 증가시킴.
        </p>
        <p>
          - prefetch 된 데이터와 client에서 요청한 데이터가 다를 경우, prefetch 된 데이터가 우선적으로 사용되고 client 데이터가 이후 반영됨
        </p>
        <p>
          ( 이해되지 않는 부분 )
        </p>
        <p>
          - 최초 1회는 prefetch 된 데이터만 을 사용하고, 이후에는 클라이언트에서 요청한 데이터를 사용함. 왜 최초 렌더링과 이후 렌더링에 동작 차이가 보이는 걸까
        </p>
        <p>
          - 원인 1, "서버컴포넌트" 는 페이지를 이동해도 언마운트 되지 않아서 prefetch 가 다시 수행되지 않음.
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