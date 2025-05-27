'use client';

import React, { useEffect } from 'react';
import { Container } from '@mui/material';
import CodeBlock from '@/app/_component/CodeBlock';

const TestPage1: React.FC = () => {
  useEffect(() => {}, []);
  return (
    <div>
      <Container>
        <h1>화살표 함수 컴포넌트 예시</h1>
        <CodeBlock
          language={'typescript'}
          value={
            "import React from 'react';\n" +
            '\n' +
            'interface MyComponentProps {\n' +
            '  title: string;\n' +
            '}\n' +
            '\n' +
            'const MyComponent = ({ title }: MyComponentProps) => {\n' +
            '  return <h1>{title}</h1>;\n' +
            '};\n'
          }
        />
        <h1>화살표 함수 ref 컴포넌트 예시</h1>
        <CodeBlock
          language={'typescript'}
          value={
            "import React from 'react';\n" +
            '\n' +
            'interface MyComponentProps {\n' +
            '  title: string;\n' +
            '  ref?: React.Ref<HTMLDivElement>;\n' +
            '}\n' +
            '\n' +
            'const MyComponent = ({ title, ref }: MyComponentProps) => {\n' +
            '  return (\n' +
            '    <div>\n' +
            '      <h1>{title}</h1>\n' +
            '    </div>\n' +
            '  );\n' +
            '};\n'
          }
        />
        <CodeBlock
          language={'typescript'}
          value={
            'import React, { useEffect } from "react";\n' +
            'interface MyComponentProps {\n' +
            '  title: string;\n' +
            '}\n' +
            '\n' +
            '\n' +
            'function MyComponent({ title }: MyComponentProps) {\n' +
            '  return <h1>{title}</h1>;\n' +
            '}'
          }
        />
        <h1>일반 함수 ref 컴포넌트 예시</h1>
        <CodeBlock
          language={'typescript'}
          value={
            "import React, { useEffect } from 'react';\n" +
            '\n' +
            'interface MyComponentProps {\n' +
            '  title: string;\n' +
            '  ref?: React.Ref<HTMLDivElement>;\n' +
            '}\n' +
            '\n' +
            'function MyComponent({ title, ref }: MyComponentProps) {\n' +
            '  return (\n' +
            '    <div ref={ref}>\n' +
            '      <h1>{title}</h1>\n' +
            '    </div>\n' +
            '  );\n' +
            '}\n'
          }
        />
      </Container>
    </div>
  );
};

export default TestPage1;
