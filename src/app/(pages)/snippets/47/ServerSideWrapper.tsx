// ServerSideWrapper.tsx (클라이언트 컴포넌트)
'use client';
import dynamic from 'next/dynamic';

const ServerSideComponent = dynamic(() => import('./ServerSideComponent'), {
  ssr: true
});

export default function ServerSideWrapper() {
  return (
    <ServerSideComponent
      products={[]} // 실제 데이터는 서버 사이드에서 주입됨
      loadTime={new Date().toISOString()}
    />
  );
}