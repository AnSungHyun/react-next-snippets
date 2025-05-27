import React from "react";
import {Container} from "@mui/material";
import {getProductsApi} from "@/app/_api/GetProduct";
import ResultBlock from "@/app/_component/CodeResultBlock";
import CodeBlock from '@/app/_component/CodeBlock';

const TestPage10: React.FC = async () => {
  const fetchData = await getProductsApi();
  const data = JSON.stringify(fetchData, null, 2);
  return (
    <div>
      <Container>
        <p>
          - Server 컴포넌트의 data fetch는 페이지가 한번에 렌더링된다.
        </p>
        <p>
          - F5로 새로고침하면 페이지가 로드될때 이미 fetch data가 준비되어 있다.
        </p>
        <ResultBlock>
          {data}
        </ResultBlock>
        <CodeBlock value={
          "import React from \"react\";\n" +
          "import {Container} from \"@mui/material\";\n" +
          "import {getProductsApi} from \"@/app/_api/GetProduct\";\n" +
          "import ResultBlock from \"@/app/_component/CodeResultBlock\";\n" +
          "\n" +
          "const TestPage10: React.FC = async () => {\n" +
          "  const fetchData = await getProductsApi();\n" +
          "  const data = JSON.stringify(fetchData, null, 2);\n" +
          "  return (\n" +
          "    <div>\n" +
          "      <Container>\n" +
          "        <ResultBlock>\n" +
          "          {data}\n" +
          "        </ResultBlock>\n" +
          "      </Container>\n" +
          "    </div>\n" +
          "  );\n" +
          "};\n" +
          "\n" +
          "export default TestPage10;"
        }/>
      </Container>
    </div>
  );
};

export default TestPage10;