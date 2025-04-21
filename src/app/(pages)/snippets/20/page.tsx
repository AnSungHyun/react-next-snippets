import React, {Suspense} from "react";
import {Container} from "@mui/material";
import ResultBlock from "@/app/_component/CodeResultBlock";
import Loading from "@/app/_component/Loading/Loading";
import {QueryClient} from "@tanstack/react-query";
import {getProductsApi, ProductResponse} from "@/app/_api/GetProduct";
import ServerComponent from "./ServerComponent";
import CustomServerErrorBoundary from "./CustomServerErrorBoundary";

const TestPage20: React.FC = async () => {

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
          - Server 컴포넌트 강제로 new Error() 발생 시 ErrorBoundary로 처리
        </p>
        <ResultBlock>
          <CustomServerErrorBoundary>
            <Suspense fallback={<Loading/>}>
              <ServerComponent />
            </Suspense>
          </CustomServerErrorBoundary>
        </ResultBlock>
      </Container>
    </div>
  );
};

export default TestPage20;