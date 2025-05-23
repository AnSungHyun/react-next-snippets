'use client'

import React, {useEffect} from "react";
import {Container} from "@mui/material";
import CodeBlock from "@/app/_component/CodeBlock";
import {ServerActionComponent} from "@/app/_component/ServerAction";
import ResultBlock from "@/app/_component/CodeResultBlock";
interface Props {
  title? :string;
  contents?: string;
  children: React.ReactNode;
}

const TestPage6: React.FC = () => {
  const [url, setUrl] = React.useState<string>("");

  useEffect(() => {
    ServerActionComponent("BACKEND_API_URL").then(r=>{setUrl(r)});
  }, []);

  return (
    <div>
      <Container>
        <h2>
          <p>
            - Server 전용 로직이 필요한 경우 Server Action을 사용하면 Client 에서 동작을 구현할 수 있다.
          </p>
          <p>
            - Server action 은 모두 async function 으로 정의되어야 한다.
          </p>
          <p>
            - 하단의 실행 결과를 보면 BACKEND_API_URL 은 서버에서만 사용 가능한 환경 변수 값을 가져올 수 있었다.
          </p>
        </h2>
        <ResultBlock>
          BACKEND_API_URL : {url}
        </ResultBlock>
        <CodeBlock filename={"page.tsx"} language={"typescript"} value={
          "\"use client\";\n" +
          "\n" +
          "import React, {useEffect} from \"react\";\n" +
          "import {Container} from \"@mui/material\";\n" +
          "import CodeBlock from \"@/app/_component/CodeBlock\";\n" +
          "import {ServerActionComponent} from \"@/app/_component/ServerAction\";\n" +
          "\n" +
          "const TestPage6: React.FC = () => {\n" +
          "  const [url, setUrl] = React.useState<string>(\"\");\n" +
          "\n" +
          "  useEffect(() => {\n" +
          "    ServerActionComponent(\"BACKEND_API_URL\").then(r=>{setUrl(r)});\n" +
          "  }, []);\n" +
          "\n" +
          "  return (\n" +
          "    <div>\n" +
          "      <Container>\n" +
          "        <h1>\n" +
          "          Client 컴포넌트에서 Server Action 사용\n" +
          "        </h1>\n" +
          "        <h2>\n" +
          "          <p>\n" +
          "            - Server 전용 로직이 필요한 경우 Server Action을 사용하면 Client 에서 동작을 구현할 수 있다.\n" +
          "          </p>\n" +
          "          <p>\n" +
          "            - Server action 은 모두 async function 으로 정의되어야 한다.\n" +
          "          </p>\n" +
          "        </h2>\n" +
          "        <h1>\n"+
          "        BACKEND_API_URL : {url}\n"+
          "        </h1>\n"+
          "      </Container>\n"+
          "    </div>\n"+
          "  );\n"+
          "};\n"+
          "\n"+
          "export default TestPage6;"
        }/>
        <CodeBlock filename={"ServerActionComponent.tsx"} language={"typescript"} value={
          "\"use server\";\n" +
          "\n" +
          "export async function ServerActionComponent(selectedEnvVar: string): Promise<string> {\n" +
          "  const envValue = process.env[selectedEnvVar];\n" +
          "  if (!envValue) {\n" +
          "    return `환경 변수 ${selectedEnvVar}가 설정되지 않았습니다.`;\n" +
          "  }\n" +
          "\n" +
          "  return `선택된 환경 변수 값: ${envValue}`;\n" +
          "}"
        }/>
      </Container>
    </div>
  );
};

export default TestPage6;