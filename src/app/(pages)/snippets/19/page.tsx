import React, {Suspense} from "react";
import {Container} from "@mui/material";
import ResultBlock from "@/app/_component/CodeResultBlock";
import Loading from "@/app/_component/Loading/Loading";
import {dehydrate, HydrationBoundary, QueryClient, useQueryClient} from "@tanstack/react-query";
import DynamicClientComponent from "./DynamicClientComponent";
import {getProductsApi, ProductResponse} from "@/app/_api/GetProduct";
import CustomClientErrorBoundary from "@/app/(pages)/snippets/19/CustomClientErrorBoundary";

const TestPage19: React.FC = async () => {

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
          - useQuery 수행 중 오류 발생 시 ErrorBoundary로 처리
        </p>
        <p>
          - ErrorBoundary 에서 useRouter를 통해 다른 페이지로 이동가능 ex) 세션 만료 시 로그인 페이지 이동
        </p>
        <ResultBlock>
          <CustomClientErrorBoundary>
            <Suspense fallback={<Loading/>}>
              <HydrationBoundary state={dehydrate(queryClient)}>
                <DynamicClientComponent />
              </HydrationBoundary>
            </Suspense>
          </CustomClientErrorBoundary>
        </ResultBlock>
      </Container>
    </div>
  );
};

export default TestPage19;