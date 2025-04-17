import React from "react";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {getServerProductsApi, ProductResponse} from "@/app/_api/ServerGetProduct";

const PrefetchServerComponent: React.FC = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery<ProductResponse>({
    queryKey: ["products", "server"],
    queryFn: () => getServerProductsApi(),
    staleTime: 3000,
    // staleTime: 0,
    gcTime: 0
  });
  console.log("PrefetchServerComponent - queryClient", queryClient);

  const myData = queryClient.getQueryData(["products", "server"]);
  return (
    <div>
      <h2>
        Server 컴포넌트
      </h2>
      <HydrationBoundary state={dehydrate(queryClient)}>
      </HydrationBoundary>
      {JSON.stringify(myData, null, 2)}
    </div>
  );
};

export default PrefetchServerComponent;