import React, {Suspense} from "react";
import {Container} from "@mui/material";
import ResultBlock from "@/app/_component/CodeResultBlock";
import Loading from "@/app/_component/Loading/Loading";
import {dehydrate, HydrationBoundary, QueryClient, useQueryClient} from "@tanstack/react-query";
import {getServerProductsApi, ProductResponse} from "@/app/_api/ServerGetProduct";
import DynamicClientComponent from "@/app/(pages)/snippets/18/DynamicClientComponent";

const TestPage18: React.FC = async () => {

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery<ProductResponse>({
    queryKey: ["products", "server"],
    queryFn: () => getServerProductsApi(),
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
          - 물론 staleTime 10초가 지난 후에는 버튼을 닫앗다 열어서 클릭하면 리페치 함
        </p>
        <ResultBlock>
          <Suspense fallback={<Loading/>}>
            <HydrationBoundary state={dehydrate(queryClient)}>
              <DynamicClientComponent />
            </HydrationBoundary>
          </Suspense>
        </ResultBlock>
      </Container>
    </div>
  );
};

export default TestPage18;