// components/NavigationInfo.tsx
'use client';

import { usePathname, useSearchParams } from 'next/navigation';

export default function NavigationInfo() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <div>
      <h2>현재 경로 정보</h2>
      <p>현재 경로: {pathname}</p>
      <p>카테고리: {searchParams.get('category')}</p>
      <p>정렬 기준: {searchParams.get('sort')}</p>
    </div>
  );
}