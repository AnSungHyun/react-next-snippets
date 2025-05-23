'use client'

import React, { useEffect } from "react";
import {Container} from "@mui/material";
import CodeBlock from "@/app/_component/CodeBlock";
// interface Props {
//   contents?: string;
// }

const TestPage1: React.FC = ({...props}) => {
  useEffect(() => {
  }, []);
  return (
    <div>
      <Container>
      <CodeBlock language={"typescript"} value={
        "\"use client\"\n" +
        "\n" +
        "import React, { useEffect } from \"react\";\n" +
        "import {Container} from \"@mui/material\";\n" +
        "import CodeBlock from \"@/app/_component/CodeBlock\";" +
        "\n" +
        "interface Props {\n" +
        "  title? :string;\n" +
        "  children: React.ReactNode;\n" +
        "  contents?: string;\n" +
        "}\n"+
        "const MyComponent: React.FC<Props> = ({title, children, ...props}) => {\n" +
        "  useEffect(() => {\n" +
        "  }, []);\n" +
        "  return (\n" +
        "    <div>\n" +
        "      <Container>\n" +
        "      <h1>\n" +
        "        기본 Component Snippets\n" +
        "      </h1>\n" +
        "      {title}\n" +
        "      {children}\n" +
        "      {props.contents}\n" +
        "      </Container>\n" +
        "    </div>\n" +
        "  );\n" +
        "};"
      }/>
      <h1>
        React.FC ref 컴포넌트 예시
      </h1>
      <CodeBlock language={"typescript"} value={
        "interface MyComponentProps {\n" +
        "    label: string;\n" +
        "    children: ReactNode;\n" +
        "}\n" +
        "\n" +
        "\n" +
        "const MyComponent = forwardRef<HTMLDivElement, MyComponentProps>(({ label, children }, ref) => {\n" +
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