"use client"

import React, { useEffect } from "react";
import {Container} from "@mui/material";
import CodeBlock from "@/app/_component/CodeBlock";
import ResultBlock from '@/app/_component/CodeResultBlock';
import ImmerComparisonExample from '@/app/(pages)/snippets/30/ImmerComparisonExample';
import ImmerArrayExample from '@/app/(pages)/snippets/30/ImmerArrayExample';
import ProductExample from '@/app/(pages)/snippets/31/ProductExample';

interface Props {
  title? :string;
  contents?: string;
  children: React.ReactNode;
}
const TestPage31: React.FC = ({}) => {
  useEffect(() => {
  }, []);
  return (
    <div>
      <Container>
        <p>
          - axios 로 fetch API cache 사용하기
        </p>
        <p>
          - Next.js 는 Web Fetch API 를 통합하여 캐싱 기능을 제공한다.
        </p>
        <p>
          - axios 를 사용해도 adapter를 통해 Next.js의 Fetch API 캐싱 기능을 활용할 수 있다.
        </p>
        <p>
          - api 요청은 발생하나 "디스크 캐시에서 게재됨","캐시됨" 으로 응답속도가 빠름.
        </p>
        <ProductExample />
      </Container>
    </div>
  );
};

export default TestPage31;