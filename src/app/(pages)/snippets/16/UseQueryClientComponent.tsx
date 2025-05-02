'use client'

import React from "react";
import {getProductsApi, ProductResponse} from "@/app/_api/GetProduct";
import {useQuery} from "@tanstack/react-query";
import Button from "@mui/material/Button";
import {getProductsApi} from "@/app/_api/GetProduct";

const UseQueryClientComponent: React.FC = () => {

  const {data: productResponse, status, fetchStatus, } = useQuery<ProductResponse>({
    queryKey: ["products", "server"],
    queryFn: () => getProductsApi(),
    staleTime: 6000,
    // gcTime: 6000,
  });

  return (
    <div>
      <h2>I'm Prop Client Component</h2>
      <br/>
      {JSON.stringify(productResponse, null, 2)}
    </div>
  );
};

export default UseQueryClientComponent;