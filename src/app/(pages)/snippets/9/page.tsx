import React from "react";
import {Container} from "@mui/material";
import CodeBlock from "@/app/_component/CodeBlock";
import ResultBlock from "@/app/_component/CodeResultBlock";
import LoginForm from "@/app/_component/LoginForm";

const fetchData = async () => {
  // 2초 후에 데이터 반환
  return new Promise<string>((resolve) =>
    setTimeout(() => resolve("비동기 데이터 로드 완료!"), 2000),
  );
};

const TestPage9: React.FC = () => {
  return (
    <div>
      <Container>
      <p>
        - 각 Field 개별로 유효성 검증하는 케이스
      </p>
      <p>
        - 제출: handleSubmit 으로 모든 필드 검증
      </p>
      <ResultBlock>
        <LoginForm />
      </ResultBlock>
      <CodeBlock filename={"page.tsx"} language={"typescript"} value={
        "import React from \"react\";\n" +
        "import {Container} from \"@mui/material\";\n" +
        "import CodeBlock from \"@/app/_component/CodeBlock\";\n" +
        "import ResultBlock from \"@/app/_component/CodeResultBlock\";\n" +
        "import LoginForm from \"@/app/_component/LoginForm\";\n" +
        "\n" +
        "const fetchData = async () => {\n" +
        "  // 2초 후에 데이터 반환\n" +
        "  return new Promise<string>((resolve) =>\n" +
        "    setTimeout(() => resolve(\"비동기 데이터 로드 완료!\"), 2000),\n" +
        "  );\n" +
        "};\n" +
        "\n" +
        "const TestPage9: React.FC = () => {\n" +
        "  return (\n" +
        "    <div>\n" +
        "      <Container>\n" +
        "      <p>\n" +
        "        - 각 Field 개별로 유효성 검증하는 케이스\n" +
        "      </p>\n" +
        "      <p>\n" +
        "        - 제출: handleSubmit 으로 모든 필드 검증\n" +
        "      </p>\n" +
        "      <ResultBlock>\n" +
        "        <LoginForm />\n" +
        "      </ResultBlock>\n" +
        "      </Container>\n" +
        "    </div>\n" +
        "  );\n" +
        "};\n" +
        "\n" +
        "export default TestPage9;"
      }/>
      <CodeBlock filename={"LoginForm.tsx"} language={"typescript"} value={
        "\"use client\"\n" +
        "import { z } from 'zod';\n" +
        "import { zodResolver } from '@hookform/resolvers/zod';\n" +
        "import { TextField, Button } from '@mui/material';\n" +
        "import { useForm } from \"react-hook-form\";\n" +
        "import React, { useEffect } from \"react\";\n" +
        "\n" +
        "// Zod 스키마 정의\n" +
        "const schema = z.object({\n" +
        "  username: z.string().min(1, '사용자 이름을 입력하세요.'),\n" +
        "  password: z.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다.'),\n" +
        "});\n" +
        "\n" +
        "// 필드 이름 타입 정의\n" +
        "type FieldName = keyof LoginFormData;\n" +
        "\n" +
        "interface LoginFormProps {\n" +
        "  onSubmit: (data: LoginFormData) => void;\n" +
        "}\n" +
        "\n" +
        "interface LoginFormData {\n" +
        "  username: string;\n" +
        "  password: string;\n" +
        "}\n" +
        "\n" +
        "const LoginForm: React.FC = () => {\n" +
        "  const { register, handleSubmit, formState: { errors }, reset, trigger } = useForm({\n" +
        "    resolver: zodResolver(schema),\n" +
        "    mode: 'onSubmit'\n" +
        "  });\n" +
        "\n" +
        "  const handleLogin = (data: LoginFormData) => {\n" +
        "    console.log('로그인 데이터:', data); // 로그인 데이터 확인\n" +
        "    onSubmit(data);\n" +
        "  };\n" +
        "\n" +
        "  const onSubmit = (data: any) => {\n" +
        "    console.log('폼 제출:', data); // 폼 제출 데이터 확인\n" +
        "  };\n" +
        "\n" +
        "  const onReset = () => {\n" +
        "    reset();\n" +
        "  };\n" +
        "\n" +
        "  // 포커스 아웃 시 유효성 검사\n" +
        "  const handleBlur = async (field: FieldName) => {\n" +
        "    const result = await trigger(field); // 특정 필드 유효성 검사\n" +
        "    if (!result) {\n" +
        "      console.log(`${field} 검증 실패:`, errors[field]);\n" +
        "    } else {\n" +
        "      console.log(`${field} 검증 통과!`);\n" +
        "    }\n" +
        "  };\n" +
        "\n" +
        "  return (\n" +
        "    <>\n" +
        "      <form onSubmit={handleSubmit(handleLogin)}>\n" +
        "        <TextField\n" +
        "          fullWidth\n" +
        "          label=\"사용자 이름\"\n" +
        "          size={\"small\"}\n" +
        "          {...register('username')}\n" +
        "          error={!!errors.username}\n" +
        "          helperText={errors.username?.message}\n" +
        "          margin=\"normal\"\n" +
        "          onBlur={() => handleBlur('username')} // 포커스 아웃 시 유효성 검사\n" +
        "        />\n" +
        "        <TextField\n" +
        "          fullWidth\n" +
        "          label=\"비밀번호\"\n" +
        "          type=\"password\"\n" +
        "          size={\"small\"}\n" +
        "          {...register('password')}\n" +
        "          error={!!errors.password}\n" +
        "          helperText={errors.password?.message}\n" +
        "          margin=\"normal\"\n" +
        "          onBlur={() => handleBlur('password')} // 포커스 아웃 시 유효성 검사\n" +
        "        />\n" +
        "        <Button type=\"submit\" variant=\"contained\" color=\"primary\">\n" +
        "          로그인\n" +
        "        </Button>\n" +
        "        <Button type=\"button\" variant=\"contained\" color=\"secondary\" onClick={onReset}>\n" +
        "          초기화\n" +
        "        </Button>\n" +
        "      </form>\n" +
        "    </>\n" +
        "  );\n" +
        "};\n" +
        "\n" +
        "export default LoginForm;"
      }/>
      </Container>
    </div>
  );
};

export default TestPage9;