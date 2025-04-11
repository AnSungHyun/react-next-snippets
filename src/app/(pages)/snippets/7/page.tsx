"use client"

import React, { useEffect } from "react";
import {Container} from "@mui/material";
import CodeBlock from "@/app/_component/CodeBlock";
import useCommonStore from "@/app/_store/useCommonStore";
import ResultBlock from "@/app/_component/CodeResultBlock";
interface Props {
  title? :string;
  contents?: string;
  children: React.ReactNode;
}

const TestPage7: React.FC<Props> = ({title, children, ...props}) => {
  const {isNextPublicMode, setIsNextPublicMode} = useCommonStore();
  useEffect(() => {
    setIsNextPublicMode(process.env.NEXT_PUBLIC_MODE as string);
  }, []);
  return (
    <div>
      <Container>
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
        "interface Props {\n" +
        "  title? :string;\n" +
        "  contents?: string;\n" +
        "  children: React.ReactNode;\n" +
        "}" +
        "\n" +
        "\n" +
        "const TestPage7: React.FC<Props> = ({title, children, ...props}) => {\n" +
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