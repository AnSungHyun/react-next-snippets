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
const TestPage29: React.FC = ({}) => {
  useEffect(() => {
  }, []);
  return (
    <div>
      <Container>
        <p>
          - TanStack Query로 조회한 캐시 데이터에 useMutation으로 데이터 삭제하기
        </p>
        <p>
          - DELETE 요청 수행 후 cache 데이터에서 해당 데이터 찾아서 삭제처리.
        </p>
        <ResultBlock>
          <UseInfinityQueryClientComponent />
        </ResultBlock>
      </Container>
    </div>
  );
};

export default TestPage29;