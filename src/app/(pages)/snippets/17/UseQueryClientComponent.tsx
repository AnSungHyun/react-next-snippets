'use client'

import React from "react";
import {getProductsApi, ProductResponse} from "@/app/_api/GetProduct";
import {useQuery} from "@tanstack/react-query";

const UseQueryClientComponent: React.FC = () => {

  const {data: productResponse, status, fetchStatus, } = useQuery<ProductResponse>({
    queryKey: ["products", "server"],
    queryFn: () => getProductsApi(),
    staleTime: 3000,
    // gcTime: 1000,
    // gcTime: 6000,
  });

  return (
    <div>
      <h2>I'm UseQuery Client Component</h2>
      <br/>
      {JSON.stringify(productResponse, null, 2)}
    </div>
  );
};

export default UseQueryClientComponent;