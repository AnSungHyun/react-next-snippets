'use client'

import React from "react";
import {ProductResponse} from "@/app/_api/GetProduct";

interface PropClientComponentProps {
  productResponse: ProductResponse;
}

const PropClientComponent: React.FC<PropClientComponentProps> = ({productResponse}) => {
  return (<div><h2>I'm Prop Client Component</h2>{JSON.stringify(productResponse, null, 2)}</div>);
};

export default PropClientComponent;