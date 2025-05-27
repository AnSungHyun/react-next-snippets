'use client'

import React from "react";
import {Container} from "@mui/material";
import CodeBlock from "@/app/_component/CodeBlock";
import ServerComponent from "@/app/_component/ServerComponent";
import ResultBlock from "@/app/_component/CodeResultBlock";

const TestPage4: React.FC = () => {
  return (
    <div>
      <Container>
        <h2>
          <p>
            - Client 컴포넌트에서 Server 컴포넌트를 Import 는 할 수는 있다.
          </p>
          <p>
            - 하지만 Server 컴포넌트도 Client 컴포넌트로 동작하기 때문에 서버 동작 코드에서 오류가 발생한다.
          </p>
          <p>
            - 이 페이지에서 F5 로 새로고침 하면 error 를 확인할 수 있다.
          </p>
          <p>
            - 제일 하단에 API_URL 을 .env 파일에서 불러오지 못했다. Server 컴포넌트로 동작하지 못했다는 의미.
          </p>
        </h2>
        <ResultBlock>
          <ServerComponent/>
        </ResultBlock>
        <CodeBlock filename={"4/page.tsx"} language={"typescript"} value={
          "\"use client\"" +
          "\n" +
          "import React from \"react\";\n" +
          "import {Container} from \"@mui/material\";\n" +
          "import CodeBlock from \"@/app/_component/CodeBlock\";\n" +
          "import ServerComponent from \"@/app/_component/ServerComponent\";\n" +
          "\n" +
          "const TestPage4: React.FC = () => {\n" +
          "  return (\n" +
          "    <div>\n" +
          "      <Container>\n" +
          "        <h1>\n" +
          "          Client 컴포넌트에서 Server Import\n" +
          "        </h1>\n" +
          "      </Container>\n"+
          "      <ServerComponent/>\n"+
          "    </div>\n"+
          "  );\n"+
          "};\n"+
          "\n" +
          "export default TestPage4;"
        }/>
        <CodeBlock filename={"ServerComponent.tsx"} language={"typescript"} value={
          "import React from \"react\";\n" +
          "\n" +
          "const ServerComponent: React.FC = () => {\n" +
          "  const API_URL = process.env.BACKEND_API_URL;\n" +
          "\n" +
          "  return (\n" +
          "    <div style={{ border: \"1px solid blue\" }}>\n" +
          "      <h1>\n" +
          "        I'm Server Component\n" +
          "        API_URL: {API_URL}\n" +
          "      </h1>\n" +
          "    </div>\n" +
          "  );\n" +
          "};\n" +
          "\n" +
          "export default ServerComponent;"
        }/>
        <CodeBlock filename={".env"} language={"properties"} value={
          "## URL\n" +
          "NEXT_PUBLIC_BASE_URL=http://localhost:3013\n" +
          "BACKEND_API_URL=http://localhost:8081"
        } />
      </Container>
    </div>
  );
};

export default TestPage4;