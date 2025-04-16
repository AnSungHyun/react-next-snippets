'use client'

import React from "react";
import {ProductResponse} from "@/app/_api/ClientGetProduct";
import {useQuery} from "@tanstack/react-query";
import {getServerProductsApi} from "@/app/_api/ServerGetProduct";

const UseQueryClientComponent: React.FC = () => {
  // const {data: productResponse, isLoading} = queryClient.getQueryData<CateCrumb>(["category", "breadcrumb", categoryCode]);

  const {data: productResponse} = useQuery<ProductResponse>({
    queryKey: ["products", "server"],
    queryFn: () => getServerProductsApi(),
    staleTime: 3000,
    gcTime: 3000,
  });

  return (
    <div>
      <h2>I'm Prop Client Component</h2>
      {JSON.stringify(productResponse, null, 2)}
    </div>
  );
};

export default UseQueryClientComponent;