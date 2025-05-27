'use client'

import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useClientLogger } from "@/hooks/useClientLogger";

interface CustomErrorBoundaryProps {
  children: React.ReactNode;
}

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const router = useRouter();
  const [retryCount, setRetryCount] = useState(0);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    resetErrorBoundary();
  };

  return (
    <div style={{
      padding: '20px',
      color: 'white',
      backgroundColor: '#ff5252',
      borderRadius: '8px',
      textAlign: 'center'
    }}>
      <h3>컴포넌트 로딩 중 오류가 발생했습니다</h3>
      <p style={{ fontFamily: 'monospace' }}>
        {error.message || '알 수 없는 에러가 발생했습니다.'}
      </p>
      <button
        onClick={handleRetry}
        style={{
          padding: '8px 16px',
          backgroundColor: 'white',
          color: '#ff5252',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '10px'
        }}
      >
        다시 시도
      </button>
    </div>
  );
}

export default function CustomErrorBoundary({ children }: CustomErrorBoundaryProps) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // 리셋 시 추가적인 정리 작업이 필요한 경우 여기에 작성
      }}
    >
      {children}
    </ErrorBoundary>
  );
}