'use client'

import React from "react";
import { useSearchParams } from 'next/navigation';

const KakaoCallbackPage: React.FC = () => {
  const searchParams = useSearchParams();

  const code = searchParams.get('code');         // 인가 코드
  const state = searchParams.get('state');       // 상태 값 (리다이렉트 URL 등을 포함할 수 있음)
  const error = searchParams.get('error');       // 에러 발생 시
  const error_description = searchParams.get('error_description');  // 에러 설명

  // 에러가 있을 경우 에러 메시지 표시
  if (error) {
    return (
      <div>
        <h2>로그인 결과</h2>
        <p>로그인 중 오류가 발생했습니다</p>
        <p>에러: {error}</p>
        <p>설명: {error_description}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>로그인 결과</h2>
      <p>인가 코드: {code || '없음'}</p>
      {state && <p>State 값: {state}</p>}
      {state && <p>디코딩된 State 값: {decodeURIComponent(state)}</p>}
    </div>
  );
};

export default KakaoCallbackPage;