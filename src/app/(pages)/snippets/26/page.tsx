'use client'

import React from "react";
import { Container } from "@mui/material";
import ResultBlock from "@/app/_component/CodeResultBlock";
import { NavigationGuard, NavigationGuardProvider, useNavigationGuard } from 'next-navigation-guard';

const TestPage26: React.FC = () => {
  // 페이지 이동 가드 설정
  useNavigationGuard({
    enabled: true,
    confirm: () =>
      window.confirm('You have unsaved changes that will be lost.'),
  });


  return (
    <div>

      <Container>
        <h1>라우터 가드 테스트</h1>
        <ResultBlock>
          <div style={{ padding: "20px" }}>
            <h3>페이지 이탈 방지 가능한 동작</h3>
            <ul>
              <li>브라우저 뒤로가기/앞으로가기 ( 가능 )</li>
              <li>페이지 새로고침 ( 가능 )</li>
              <li>브라우저 탭/창 닫기 ( 가능, browser 기본 메세지 )</li>
              <li>Link ( 동작 X )</li>
              <li>example 페이지에서는 되는데 왜지...</li>
            </ul>
            <p>위 동작 시 confirm 창이 표시됩니다.</p>
          </div>
        </ResultBlock>
      </Container>
    </div>
  );
};

export default TestPage26;