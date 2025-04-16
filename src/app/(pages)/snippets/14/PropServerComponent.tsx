import React from "react";
import {ProductResponse} from "@/app/_api/ClientGetProduct";
import PropClientComponent from "@/app/(pages)/snippets/14/PropClientComponent";
import {getServerProductsApi} from "@/app/_api/ServerGetProduct";

async function fetchProductData() {
  const responseTime = await new Promise<string>((resolve) =>
    setTimeout(() => resolve('Client 컴포넌트 비동기 데이터 로드 완료!'), 2000)
  );
  // 서버에서 데이터를 가져오는 비동기 함수
  const response:ProductResponse = await getServerProductsApi();
  return response;
}

const PropServerComponent: React.FC = async () => {
  const productDataPromise = await fetchProductData(); // Promise를 해결하여 데이터를 가져옴

  return (
    <div>
      <h1>I'm Prop Server Component</h1>
      <PropClientComponent productResponse={productDataPromise}></PropClientComponent>
    </div>
  );
};

export default PropServerComponent;