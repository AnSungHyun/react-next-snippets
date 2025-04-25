'use client'

import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import ResultBlock from "@/app/_component/CodeResultBlock";

const TestPage25: React.FC = () => {
  const [navigationType, setNavigationType] = useState<string>("");

  useEffect(() => {
    // navigation type 확인
    const checkNavigationType = () => {
      // 페이지 로드 시점의 performance 정보 확인
      if (typeof window !== 'undefined') {
        // 마지막 navigation 이벤트 확인
        const navigationEntries = performance.getEntriesByType('navigation');

        if (navigationEntries.length > 0) {
          const navigation = navigationEntries[0] as PerformanceNavigationTiming;

          switch (navigation.type) {
            case "reload":
              setNavigationType("페이지 새로고침으로 접속했습니다.");
              break;
            case "back_forward":
              setNavigationType("브라우저 뒤로가기/앞으로가기로 접속했습니다.");
              break;
            case "navigate":
              setNavigationType("직접 링크로 접속했습니다.");
              break;
            default:
              setNavigationType("알 수 없는 방식으로 접속했습니다.");
          }
        }
      }
    };

    // popstate 이벤트 리스너 추가 (뒤로가기/앞으로가기 감지)
    const handlePopState = () => {
      setNavigationType("브라우저 뒤로가기/앞으로가기로 접속했습니다.");
    };

    window.addEventListener('popstate', handlePopState);
    checkNavigationType();

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <div>
      <Container>
        <h1>페이지 접속 방식 테스트</h1>
        <ResultBlock>
          <div style={{ padding: "20px" }}>
            <h3>현재 페이지 접속 방식:</h3>
            <p style={{ fontSize: "18px", color: "#2196f3" }}>
              {navigationType || "접속 방식을 확인중입니다..."}
            </p>
            <div style={{ marginTop: "20px" }}>
              <p>테스트 방법:</p>
              <ul>
                <li>새로고침(F5)을 눌러보세요</li>
                <li>다른 페이지로 갔다가 뒤로가기를 해보세요</li>
                <li>주소를 직접 입력하거나 링크를 클릭해보세요</li>
              </ul>
            </div>
          </div>
        </ResultBlock>
      </Container>
    </div>
  );
};

export default TestPage25;