'use client'

import React, {useEffect} from "react";
import {useQuery} from "@tanstack/react-query";
import {getProductsApi, ProductResponse} from "@/app/_api/GetProduct";

const UseQueryClientComponent: React.FC = () => {

  const {data: productResponse, status, fetchStatus, } = useQuery<ProductResponse>({
    queryKey: ["products", "server"],
    queryFn: () => getProductsApi(),
    staleTime: 10000,
  });

  return (
    <div>
      <h2>I'm UseQuery Client Component</h2>
      <br/>
      <>{JSON.stringify(productResponse, null, 2)}</>
    </div>
  );
};

export default UseQueryClientComponent;