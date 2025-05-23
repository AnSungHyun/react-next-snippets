'use client'

import React, { useEffect } from "react";
import {Container} from "@mui/material";
import CodeBlock from "@/app/_component/CodeBlock";

const TestPage1: React.FC = () => {
  useEffect(() => {
  }, []);
  return (
    <div>
      <Container>
      <CodeBlock language={"typescript"} value={
        "interface MyComponentProps {\n" +
        "    title: string;\n" +
        "}\n" +
        "\n" +
        "\n" +
        "function MyComponent({ title }: MyComponentProps) {\n" +
        "    return <h1>{title}</h1>;\n" +
        "}"
      }/>
      <h1>
        일반 함수 ref 컴포넌트 예시
      </h1>
      <CodeBlock language={"typescript"} value={
        "interface MyComponentProps {\n" +
        "    label: string;\n" +
        "    children: ReactNode;\n" +
        "}\n" +
        "\n" +
        "\n" +
        "const MyComponent = forwardRef<HTMLDivElement, MyComponentProps>(function MyComponent({ label, children }, ref) {\n" +
        "    return (\n" +
        "        <div ref={ref}>\n" +
        "            <h1>{label}</h1>\n" +
        "            {children}\n" +
        "        </div>\n" +
        "    );\n" +
        "});"
      }/>
      </Container>
    </div>
  );
};

export default TestPage1;