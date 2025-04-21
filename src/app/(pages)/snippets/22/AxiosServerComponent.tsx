import React from "react";
import axios from "axios";
import {getErrorProductsApi} from "@/app/_api/GetProduct";

const AxiosServerComponent: React.FC = async () => {
  try {
    const productResponse = await getErrorProductsApi();

    return (
      <div>
        <h2>I'm Axios Server Component</h2>
        <br/>
        <>{JSON.stringify(productResponse, null, 2)}</>
      </div>
    );

  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new Error(err.message + " " + err.config?.url);
    } else {
      throw new Error('알 수 없는 오류가 발생했습니다.');
    }
  }
};

export default AxiosServerComponent;