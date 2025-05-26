"use client"

import React, { useEffect } from "react";
import {Container} from "@mui/material";
import CodeBlock from "@/app/_component/CodeBlock";
import ResultBlock from '@/app/_component/CodeResultBlock';
import UseInfinityQueryClientComponent from './UseInfinityQueryClientComponent';
interface Props {
  title? :string;
  contents?: string;
  children: React.ReactNode;
}
const TestPage32: React.FC = ({}) => {
  useEffect(() => {
  }, []);
  return (
    <div>
      <Container>
        <p>
          - TanStack Query로 조회한 캐시 데이터에 Optimistic Update를 적용하는 방법.
        </p>
        <p>
          - 먼저 캐시 데이터를 변경하여, UI에 반영한 후 Update를 수행하는 방식입니다.
        </p>
        <ResultBlock>
          <UseInfinityQueryClientComponent />
        </ResultBlock>
      </Container>
    </div>
  );
};

export default TestPage32;