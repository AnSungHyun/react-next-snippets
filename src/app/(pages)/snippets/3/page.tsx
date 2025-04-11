
import React from "react";
import {Container} from "@mui/material";
import CodeBlock from "@/app/_component/CodeBlock";
import ClientComponent from "@/app/_component/ClientComponent";
import ResultBlock from "@/app/_component/CodeResultBlock";
interface Props {
  title? :string;
  contents?: string;
  children: React.ReactNode;
}

const TestPage3: React.FC<Props> = ({title, children, ...props}) => {
  return (
    <div>
      <Container>
        <h1>
          Server 컴포넌트에서 Client Import
        </h1>
        <h2>
          <p>
            - Server 컴포넌트는 Server에서 Client는 Browser에서 렌더링
          </p>
          <p>
            - 일반적인 패턴
          </p>
        </h2>
        <CodeBlock language={"typescript"} value={
          "\n" +
          "import React from \"react\";\n" +
          "import {Container} from \"@mui/material\";\n" +
          "import CodeBlock from \"@/app/_component/CodeBlock\";\n" +
          "import ClientComponent from \"@/app/_component/ClientComponent\";\n" +
          "interface Props {\n" +
          "  title? :string;\n" +
          "  contents?: string;\n" +
          "  children: React.ReactNode;\n" +
          "}\n" +
          "\n" +
          "const TestPage3: React.FC<Props> = ({title, children, ...props}) => {\n" +
          "  return (\n" +
          "    <div>\n" +
          "      <Container>\n" +
          "        <h1>\n" +
          "          Server 컴포넌트에서 Client Import\n" +
          "        </h1>\n" +
          "      </Container>\n"+
          "      <ClientComponent/>\n"+
          "    </div>\n"+
          "  );\n"+
          "};\n"+
          "\n"+
          "export default TestPage3;"
        }/>
        {title}
        {props.contents}
        {children}
        <ResultBlock>
          <ClientComponent/>
        </ResultBlock>
      </Container>
    </div>
  );
};

export default TestPage3;