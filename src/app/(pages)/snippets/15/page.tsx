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
    staleTime: 3000,
    gcTime: 3000
  });

  return (
    <div>
      <Container>
        <p>
          - Server 컴포넌트에서 데이터 prefetch 후 Client 컴포넌트에서 useQuery로 미리 가져온 데이터 사용
        </p>
        <p>
          - useQuery를 사용하여 brwoser에 cache 된 데이터를 사용
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