'use client'

import { useEffect } from 'react';

export default function KakaoCallbackPage() {
  useEffect(() => {
    // URL에서 인증 코드 추출
    const code = new URLSearchParams(window.location.search).get('code');

    if (code) {
      // 부모 창이 존재하는 경우 (팝업으로 열린 경우)
      if (window.opener) {
        // 부모 창에 메시지 전달
        window.opener.postMessage(
          {
            type: 'KAKAO_LOGIN_SUCCESS',
            code: code
          },
          '*'  // 또는 실제 도메인을 지정 (예: 'http://localhost:3010')
        );
        // 팝업 창 닫기
        window.close();
      } else {
        // 일반 리다이렉트로 열린 경우의 처리
        // 예: 다른 페이지로 리다이렉트
        // window.location.href = '/dashboard';
      }
    }
  }, []);

  // 로딩 상태를 표시할 수 있는 UI 반환
  return (
    <div>
      <p>처리 중입니다...</p>
    </div>
  );
}