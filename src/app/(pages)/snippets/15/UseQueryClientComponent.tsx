'use client'

import React, { useEffect } from 'react';
import {getProductsApi, ProductResponse} from "@/app/_api/GetProduct";
import {useQuery} from "@tanstack/react-query";
import Button from "@mui/material/Button";

const UseQueryClientComponent: React.FC = () => {
  // const [enabled, setEnabled] = React.useState(false);

  const {data: productResponse, status, fetchStatus, } = useQuery<ProductResponse>({
    queryKey: ["products", "server"],
    queryFn: () => getProductsApi(),
    staleTime: 10000,
    // gcTime: 6000,
    // enabled: enabled, // useEffect로 enabled 상태를 true로 변경하여 useQuery 실행
  });

  // useEffect(() => {
  //   setEnabled(true);
  // }, []);

  const handleButtonClick = () => {
    console.log("status  : "+status);
    console.log("fetchStatus  : "+fetchStatus);
  };

  return (
    <div>
      <h2>I'm Prop Client Component</h2>
      <Button  variant="outlined" onClick={handleButtonClick} sx={{ textTransform: 'none' }}>useQuery 상태 확인</Button>
      <br/>
      {JSON.stringify(productResponse, null, 2)}
    </div>
  );
};

export default UseQueryClientComponent;