'use client'

import React from "react";
import {getClientProductsApi, ProductResponse} from "@/app/_api/ClientGetProduct";
import {useQuery} from "@tanstack/react-query";
import Button from "@mui/material/Button";

const UseQueryClientComponent: React.FC = () => {

  const {data: productResponse, status, fetchStatus, } = useQuery<ProductResponse>({
    queryKey: ["products", "server"],
    queryFn: () => getClientProductsApi(),
    staleTime: 3000,
    gcTime: 3000,
  });

  const handleButtonClick = () => {
    console.log("status  : "+status);
    console.log("fetchStatus  : "+fetchStatus);
  };

  return (
    <div>
      <h2>I'm Prop Client Component</h2>
      <Button variant="outlined" onClick={handleButtonClick}>useQuery 상태 확인</Button>
      <br/>
      {JSON.stringify(productResponse, null, 2)}
    </div>
  );
};

export default UseQueryClientComponent;