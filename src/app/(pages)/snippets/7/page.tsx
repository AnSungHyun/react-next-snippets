'use client'

import React, { useEffect } from "react";
import {Container} from "@mui/material";
import CodeBlock from "@/app/_component/CodeBlock";
import useCommonStore from "@/app/_store/useCommonStore";
import ResultBlock from "@/app/_component/CodeResultBlock";
const TestPage7: React.FC = () => {
  const {isNextPublicMode, setIsNextPublicMode} = useCommonStore();
  useEffect(() => {
    setIsNextPublicMode(process.env.NEXT_PUBLIC_MODE as string);
  }, []);
  return (
    <div>
      <Container>
        <p>
          - Zustand을 사용하여 Next.js의 환경 변수를 클라이언트에서 사용할 수 있도록 하는 예시입니다.
        </p>
        <p>
          - Context API 대체
        </p>
      <ResultBlock>
        mode : {isNextPublicMode}
      </ResultBlock>
      <CodeBlock filename={"page.tsx"} language={"typescript"} value={
        "\"use client\"\n" +
        "\n" +
        "import React, { useEffect } from \"react\";\n" +
        "import {Container} from \"@mui/material\";\n" +
        "import CodeBlock from \"@/app/_component/CodeBlock\";\n" +
        "import useCommonStore from \"@/app/_store/useCommonStore\";\n" +
        "import ResultBlock from \"@/app/_component/CodeResultBlock\";\n" +
        "\n" +
        "const TestPage7: React.FC = () => {\n" +
        "  const {isNextPublicMode, setIsNextPublicMode} = useCommonStore();\n" +
        "  useEffect(() => {\n" +
        "    setIsNextPublicMode(process.env.NEXT_PUBLIC_MODE as string);\n" +
        "  }, []);\n" +
        "  return (\n" +
        "    <div>\n" +
        "      <Container>\n" +
        "      <h1>\n" +
        "        Zustand 예시 코드\n" +
        "      </h1>\n" +
        "      <ResultBlock>\n"+
        "        mode : {isNextPublicMode}\n"+
        "      </ResultBlock>\n"+
        "      </Container>\n"+
        "    </div>\n"+
        "  );\n"+
        "};"
      }/>
      <CodeBlock filename={"useCommonStore.tsx"} language={"typescript"} value={
        "import {create} from \"zustand/react\";\n" +
        "\n" +
        "interface CommonStore {\n" +
        "  isNextPublicMode: string;\n" +
        "  setIsNextPublicMode: (value: string) => void;\n" +
        "}\n" +
        "\n" +
        "const useCommonStore = create<CommonStore>((set) => ({\n" +
        "  isNextPublicMode: 'none',\n" +
        "  setIsNextPublicMode: (value: string) => set({isNextPublicMode: value}),\n" +
        "}));\n" +
        "\n" +
        "export default useCommonStore;"
      }/>
      </Container>
    </div>
  );
};

export default TestPage7;