"use client";

import {ErrorBoundary, FallbackProps} from "react-error-boundary";
import {usePathname, useRouter} from "next/navigation";
import React, {ReactNode, useEffect} from "react";

interface CustomErrorBoundaryProps {
  children: React.ReactNode; // 자식 컴포넌트를 받기 위한 prop
}

function ErrorFallback({ error, resetErrorBoundary }:FallbackProps) {
  const router = useRouter();
  console.log("-------------------" + error.response)

  useEffect(() => {
    setTimeout(() => {
      router.push("/login");
    }, 2000);
    
  }, []);

  return (
    <div>
      <p>에러가 발생했습니다: {error.message}</p>
      <p>2 초뒤 로그인 페이지로 이동합니다.</p>
      <button onClick={resetErrorBoundary}>다시 시도</button>
    </div>
  );
}

export default function CustomErrorBoundary({children} : CustomErrorBoundaryProps) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {children}
    </ErrorBoundary>
  );
}