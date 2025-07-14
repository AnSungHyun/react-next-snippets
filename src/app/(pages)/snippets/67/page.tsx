import React from "react";
import {Container} from "@mui/material";
import ResultBlock from "@/app/_component/CodeResultBlock";
import { getCart, getCartWithCache } from '@/app/_api/mock';

const RequestMemoizationTestPage: React.FC = async () => {
  // const response = await fetch('http://localhost:4000/api/pub/ncp/gb/v1/od/cart/list');
  // if (!response.ok) {
  //   throw new Error('Failed to fetch data');
  // }
  // console.log("response", response.status, response.statusText);
  // const data = await response.json();
  //
  //
  // const response2 = await fetch('http://localhost:4000/api/pub/ncp/gb/v1/od/cart/list');
  // if (!response2.ok) {
  //   throw new Error('Failed to fetch data');
  // }
  // console.log("response2", response2.status, response2.statusText);
  // const data2 = await response2.json();


  // const response = await fetch('http://localhost:4000/api/pub/ncp/gb/v1/od/cart/list');
  // console.log("response", response.json());
  // const response2 = await fetch('http://localhost:4000/api/pub/ncp/gb/v1/od/cart/list');
  // console.log("response2", response2.json());

  const response3 = await getCart();
  const response4 = await getCart();

  // const response3 = await getCartWithCache({
  //   adapter: 'fetch',
  //   fetchOptions: {
  //     cache: 'force-cache',
  //     next: { revalidate: 10 }, // 1시간마다 재검증
  //   },
  // });
  // const response4 = await getCartWithCache({
  //   adapter: 'fetch',
  //   fetchOptions: {
  //     cache: 'force-cache',
  //     next: { revalidate: 10 }, // 1시간마다 재검증
  //   },
  // });

  // const response3 = await getCartWithCache({
  //   adapter: 'fetch',
  //   fetchOptions: {
  //     cache: 'no-cache',
  //   },
  // });
  // const response4 = await getCartWithCache({
  //   adapter: 'fetch',
  //   fetchOptions: {
  //     cache: 'no-cache',
  //   },
  // });

  // const response3 = await getCartWithCache({
  //   adapter: 'fetch',
  // });
  // const response4 = await getCartWithCache({
  //   adapter: 'fetch',
  // });

  // const response3 = await getCartWithCache({
  // });
  // const response4 = await getCartWithCache({
  // });

  return (
    <div>
      <Container>
        <p>
          - Axios RequestMemoiztion Test 예시
        </p>
        <ResultBlock>
          <></>
          {/*<>{JSON.stringify(data)}</>*/}
          {/*<>{JSON.stringify(response.json(), null, 2)}</>*/}
          {/*<>{JSON.stringify(response2.json(), null, 2)}</>*/}
        </ResultBlock>
      </Container>
    </div>
  );
};

export default RequestMemoizationTestPage;