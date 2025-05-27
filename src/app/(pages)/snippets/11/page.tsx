'use client'

import React, {use, useEffect} from "react";
import {Container} from "@mui/material";
import {getProductsApi, ProductResponse} from "@/app/_api/GetProduct";
import ResultBlock from '@/app/_component/CodeResultBlock';
import CodeBlock from "@/app/_component/CodeBlock";

const TestPage11: React.FC = () => {
  const [data, setData] = React.useState<ProductResponse>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProductsApi();
        // const response = await getProductsApi();
        setData(response);
      } catch (e) {
        // setError("Failed to fetch products");
      } finally {
        // setLoading(false);
      }
    };

    fetchData().then(r => {});
  }, []);

  return (
    <div>
      <Container>
        <p>
          - Client 컴포넌트의 data fetch는 페이지가 렌더링된 이후 데이터를 요청 후 가져온다.
        </p>
        <p>
          - F5를 눌러부면 결과 영역이 비어있다가 data fetch가 완료된 이후 로드된 것을 확인할 수 있다.
        </p>
        <ResultBlock>
          {JSON.stringify(data, null, 2)}
        </ResultBlock>
        <CodeBlock value={
          "'use client'\n" +
          "\n" +
          "import React, {use, useEffect} from \"react\";\n" +
          "import {Container} from \"@mui/material\";\n" +
          "import {getProductsApi, ProductResponse} from \"@/app/_api/GetProduct\";\n" +
          "import ResultBlock from \"@/app/_component/CodeResultBlock\";\n" +
          "\n" +
          "const TestPage11: React.FC = () => {\n" +
          "  const [data, setData] = React.useState<ProductResponse>();\n" +
          "\n" +
          "  useEffect(() => {\n" +
          "    const fetchData = async () => {\n" +
          "      try {\n" +
          "        const response = await getProductsApi();\n" +
          "        // const response = await getProductsApi();\n" +
          "        setData(response);\n" +
          "      } catch (e) {\n" +
          "        // setError(\"Failed to fetch products\");\n" +
          "      } finally {\n" +
          "        // setLoading(false);\n" +
          "      }\n" +
          "    };\n" +
          "\n" +
          "    fetchData().then(r => {});\n" +
          "  }, []);\n" +
          "\n" +
          "  return (\n" +
          "    <div>\n" +
          "      <Container>\n" +
          "        <ResultBlock>\n" +
          "          {JSON.stringify(data, null, 2)}\n" +
          "        </ResultBlock>\n" +
          "      </Container>\n" +
          "    </div>\n" +
          "  );\n" +
          "};\n" +
          "\n" +
          "export default TestPage11;"
        } />
      </Container>
    </div>
  );
};

export default TestPage11;