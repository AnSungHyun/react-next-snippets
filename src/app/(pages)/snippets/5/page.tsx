import React from "react";
import {Container} from "@mui/material";
import CodeBlock from "@/app/_component/CodeBlock";
import ServerComponent from "@/app/_component/ServerComponent";
import ClientChildrenComponent from "@/app/_component/ClientChildrenComponent";
import ResultBlock from "@/app/_component/CodeResultBlock";
const TestPage5: React.FC = () => {
  return (
    <div>
      <Container>
        <h2>
          <p>
            - Client 컴포넌트에서 Server 컴포넌트를 Children 을 활용한다면 사용 가능하다
          </p>
          <p>
            - 이렇게 하면 각각 Client 컴포넌트는 는 Client 렌더링, Server 컴포넌트는 Server 렌더링이 가능하다.
          </p>
          <p>
            - 아래 결과처럼 Client 컴포넌트 안에 Server 컴포넌트가 렌더링 된 것을 확인할 수 있다.
          </p>
        </h2>
        <ResultBlock>
          <ClientChildrenComponent>
            <ServerComponent />
          </ClientChildrenComponent>
        </ResultBlock>
        <CodeBlock language={"typescript"} value={
          "import React from \"react\";\n" +
          "import {Container} from \"@mui/material\";\n" +
          "import CodeBlock from \"@/app/_component/CodeBlock\";\n" +
          "import ServerComponent from \"@/app/_component/ServerComponent\";\n" +
          "import ClientChildrenComponent from \"@/app/_component/ClientChildrenComponent\";\n" +
          "\n" +
          "const TestPage5: React.FC = () => {\n" +
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
      </Container>
    </div>
  );
};

export default TestPage5;