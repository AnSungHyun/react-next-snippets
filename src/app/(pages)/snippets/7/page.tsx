"use client"

import React, { useEffect } from "react";
import {Container} from "@mui/material";
import CodeBlock from "@/app/_component/CodeBlock";
import useCommonStore from "@/app/_store/useCommonStore";
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
      <h1>
        Zustand 예시 코드
      </h1>
        <p>
          mode : {isNextPublicMode}
        </p>
      <CodeBlock language={"typescript"} value={
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