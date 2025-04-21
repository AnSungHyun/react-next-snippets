'use client';

import {ErrorBoundary, FallbackProps} from "react-error-boundary";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import {useClientLogger} from "@/hooks/useClientLogger";

interface CustomErrorBoundaryProps {
  children: React.ReactNode; // 자식 컴포넌트를 받기 위한 prop
}

function ErrorFallback({ error, resetErrorBoundary }:FallbackProps) {
  const router = useRouter();
  console.log("-------------------" + error.response)

  useEffect(() => {
    setTimeout(() => {
      router.push("/error");
    }, 2000);
    useClientLogger("error",error.message)
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