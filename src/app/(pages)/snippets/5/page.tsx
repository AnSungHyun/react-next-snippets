import React from "react";
import {Container} from "@mui/material";
import CodeBlock from "@/app/_component/CodeBlock";
import ServerComponent from "@/app/_component/ServerComponent";
import ClientChildrenComponent from "@/app/_component/ClientChildrenComponent";
interface Props {
  title? :string;
  contents?: string;
  children: React.ReactNode;
}

const TestPage5: React.FC<Props> = ({title, children, ...props}) => {
  return (
    <div>
      <Container>
        <h1>
          Client 컴포넌트에서 Server Import (children 사용)
        </h1>
        <h2>
          <p>
            - Client 컴포넌트에서 Server 컴포넌트를 Children 을 활용한다면 사용 가능하다
          </p>
          <p>
            - 이렇게 하면 각각 Client 컴포넌트는 는 Client 렌더링, Server 컴포넌트는 Server 렌더링이 가능하다.
          </p>
          <p>
            - 맨 아래 결과처럼 Client 컴포넌트 안에 Server 컴포넌트가 렌더링 된 것을 확인할 수 있다.
          </p>
        </h2>
        <CodeBlock language={"typescript"} value={
          "import React from \"react\";\n" +
          "import {Container} from \"@mui/material\";\n" +
          "import CodeBlock from \"@/app/_component/CodeBlock\";\n" +
          "import ServerComponent from \"@/app/_component/ServerComponent\";\n" +
          "import ClientChildrenComponent from \"@/app/_component/ClientChildrenComponent\";\n" +
          "interface Props {\n" +
          "  title? :string;\n" +
          "  contents?: string;\n" +
          "  children: React.ReactNode;\n" +
          "}\n" +
          "\n" +
          "const TestPage5: React.FC<Props> = ({title, children, ...props}) => {\n" +
          "  return (\n" +
          "    <div>\n" +
          "      <Container>\n" +
          "        <h1>\n" +
          "          Client 컴포넌트에서 Server Import (children 사용)\n" +
          "        </h1>\n" +
          "      </Container>\n" +
          "      <ClientChildrenComponent>\n" +
          "        <ServerComponent />\n" +
          "      </ClientChildrenComponent>\n" +
          "    </div>\n" +
          "  );\n" +
          "};\n" +
          "\n" +
          "export default TestPage5;"
        }/>
        {title}
        {props.contents}
        {children}
      </Container>
      <ClientChildrenComponent>
        <ServerComponent />
      </ClientChildrenComponent>
    </div>
  );
};

export default TestPage5;