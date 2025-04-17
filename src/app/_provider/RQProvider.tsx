"use client";

import React, {useState} from "react";
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

type Props = {
  children: React.ReactNode;
};

function RQProvider({children}: Props) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {  // react-query 전역 설정
        queries: {
          refetchOnWindowFocus: false, // ture 탭 이동 시 재요청, false 탭이동으로 돌아와서 재요청 X
          retryOnMount: true, // 마운트 할때 실패한 쿼리 재요청 여부
          refetchOnReconnect: false, // 네트워크 재연결 시 다시 요청 여부
          retry: false, // 재시도 여부
          // staleTime: 10 * 1000,
          // gcTime: 10000 // gcTime 은 데이터가 inactive 상태가 되면, 그이후 5분(default) 후 에 삭제됨
        },
      },
    })
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={process.env.NEXT_PUBLIC_MODE === 'local' }/>
    </QueryClientProvider>
  );
}

export default RQProvider;