'use client'

import React from "react";
import {getClientProductsApi, ProductResponse} from "@/app/_api/ClientGetProduct";
import {useQuery} from "@tanstack/react-query";
import Button from "@mui/material/Button";
import {getServerProductsApi} from "@/app/_api/ServerGetProduct";

const UseQueryClientComponent: React.FC = () => {

  const {data: productResponse, status, fetchStatus, } = useQuery<ProductResponse>({
    queryKey: ["products", "server"],
    queryFn: () => getClientProductsApi(),
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