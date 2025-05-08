"use client"

import React, { useEffect } from "react";
import {Container} from "@mui/material";
import CodeBlock from "@/app/_component/CodeBlock";
import ResultBlock from '@/app/_component/CodeResultBlock';
import ImmerComparisonExample from '@/app/(pages)/snippets/30/ImmerComparisonExample';
import ImmerArrayExample from '@/app/(pages)/snippets/30/ImmerArrayExample';

interface Props {
  title? :string;
  contents?: string;
  children: React.ReactNode;
}
const TestPage30: React.FC = ({}) => {
  useEffect(() => {
  }, []);
  return (
    <div>
      <Container>
        <p>
          - Immer 사용 시 직접 객체를 수정하는 것처럼 간단하게 작성할 수 있다.
        </p>
        <p>
          - 일반적인 방식: 중첩된 객체의 불변성을 유지하기 위해 spread 연산자를 여러 번 사용
        </p>
        <p>
          - 두 방식 모두 동일한 결과를 만들지만, Immer를 사용한 코드가 더 직관적이고 간결하다
        </p>
        <ImmerComparisonExample />
        <ImmerArrayExample />
      </Container>
    </div>
  );
};

export default TestPage30;