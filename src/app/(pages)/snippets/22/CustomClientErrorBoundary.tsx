'use client'

import {ErrorBoundary, FallbackProps} from "react-error-boundary";
import React, { useEffect} from "react";
import {useClientLogger} from "@/hooks/useClientLogger";

interface CustomErrorBoundaryProps {
  children: React.ReactNode; // 자식 컴포넌트를 받기 위한 prop
}

function ErrorFallback({ error, resetErrorBoundary }:FallbackProps) {

  useEffect(() => {
    useClientLogger("error",error.message)
  }, []);

  return (
    <div>
      <p>에러가 발생했습니다: </p>
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>다시 시도</button>
    </div>
  );
}

export default function CustomClientErrorBoundary({children} : CustomErrorBoundaryProps) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {children}
    </ErrorBoundary>
  );
}