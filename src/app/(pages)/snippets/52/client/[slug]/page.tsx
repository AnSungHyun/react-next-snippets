// components/NavigationInfo.tsx
'use client';

import { useParams, usePathname, useSearchParams } from 'next/navigation';

export default function NavigationInfo() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = useParams();

  return (
    <div>
      <h2>현재 경로 정보</h2>
      <p>현재 경로: {pathname}</p>
      <p>Path Param: {JSON.stringify(params)}</p>
      <p>카테고리: {searchParams.get('category')}</p>
      <p>정렬 기준: {searchParams.get('sort')}</p>
    </div>
  );
}