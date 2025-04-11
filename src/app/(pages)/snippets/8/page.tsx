import React from "react";
import {Container} from "@mui/material";
import CodeBlock from "@/app/_component/CodeBlock";
import useCommonStore from "@/app/_store/useCommonStore";
import ResultBlock from "@/app/_component/CodeResultBlock";
import UserForm from "@/app/_component/UserForm";

interface UserFormData {
  // onSubmit: (data: any) => void;
  name?: string;
  email?: string;
}
const fetchData = async () => {
  // 2초 후에 데이터 반환
  return new Promise<string>((resolve) =>
    setTimeout(() => resolve("비동기 데이터 로드 완료!"), 2000),
  );
};

const TestPage8: React.FC = () => {
  const data:UserFormData = {
    name: 'ash',
    email: 'ashash@asdf',
  }

  return (
    <div>
      <Container>
      <p>
        - 각 Form Field 의 유효성 체크 및 상태 관리를 zod 와 react hook form 을 통해 간단히 구현 가능.
      </p>
        <p>
          - 제출: handleSubmit 으로 모든 필드 검증
        </p>
        <p>
          - 초기화: reset 으로 모든 필드 초기화
        </p>
        <p>
          - 유효성 검증: trigger 로 모든 필드 동적 검증
        </p>
      <ResultBlock>
        <UserForm userData={data} />
      </ResultBlock>
      <CodeBlock filename={"page.tsx"} language={"typescript"} value={
        "import React from \"react\";\n" +
        "import {Container} from \"@mui/material\";\n" +
        "import ResultBlock from \"@/app/_component/CodeResultBlock\";\n" +
        "import UserForm from \"@/app/_component/UserForm\";\n" +
        "\n" +
        "interface UserFormData {\n" +
        "  // onSubmit: (data: any) => void;\n" +
        "  name?: string;\n" +
        "  email?: string;\n" +
        "}\n" +
        "const TestPage8: React.FC = () => {\n" +
        "  const data:UserFormData = {\n" +
        "    name: 'ash',\n" +
        "    email: 'ashash@asdf',\n" +
        "  }\n" +
        "\n" +
        "  return (\n" +
        "    <div>\n" +
        "      <Container>\n" +
        "      <h1>\n" +
        "        Zustand 예시 코드\n" +
        "      </h1>\n" +
        "      <ResultBlock>\n" +
        "        <UserForm userData={data} />\n" +
        "      </ResultBlock>\n" +
        "      </Container>\n" +
        "    </div>\n" +
        "  );\n" +
        "};\n" +
        "\n" +
        "export default TestPage8;"
      }/>
      <CodeBlock filename={"UserForm.tsx"} language={"typescript"} value={
        "\"use client\"\n" +
        "import {z} from 'zod';\n" +
        "import {zodResolver} from '@hookform/resolvers/zod';\n" +
        "import {TextField, Button} from '@mui/material';\n" +
        "import {useForm} from \"react-hook-form\";\n" +
        "import React, {useEffect} from \"react\";\n" +
        "\n" +
        "// Zod 스키마 정의\n" +
        "const schema = z.object({\n" +
        "  name: z.string().min(1, '이름을 입력하세요.'),\n" +
        "  email: z.string().email('유효한 이메일 주소가 아닙니다.'),\n" +
        "});\n" +
        "\n" +
        "interface UserFormProps {\n" +
        "  userData?: UserFormData;\n" +
        "}\n" +
        "\n" +
        "interface UserFormData {\n" +
        "  // onSubmit: (data: any) => void;\n" +
        "  name?: string;\n" +
        "  email?: string;\n" +
        "}\n" +
        "\n" +
        "//const UserForm: React.FC<{ userData: UserFormProps }> = ({ userData }) => {\n" +
        "const UserForm: React.FC<UserFormProps> = ({userData}) => {\n" +
        "  const {register, getValues, setValue, getFieldState, setFocus, handleSubmit, formState: {errors}} = useForm({\n" +
        "    resolver: zodResolver(schema),\n" +
        "    mode: 'onSubmit'\n" +
        "  });\n" +
        "\n" +
        "  const onSubmit = (data: any) => {\n" +
        "    console.log('폼 제출:', data); // 폼 제출 데이터 확인\n" +
        "    console.log(getValues()); // 현재 폼 값 확인\n" +
        "    setFocus('email'); // 포커스 설정\n" +
        "    console.log(getFieldState('name')); // 필드 상태 확인\n" +
        "  };\n" +
        "\n" +
        "  useEffect(() => {\n" +
        "    setValue('name', userData?.name || ''); // 기본값 설정\n" +
        "    setValue('email', userData?.email || '');// 기본값 설정\n" +
        "  }, []);\n" +
        "\n" +
        "  const onReset = () => {\n" +
        "    reset();\n" +
        "  }\n" +
        "\n" +
        "  const handleTrigger = async () => {\n" +
        "    const result = await trigger(); // 모든 필드 검증\n" +
        "    if (result) {\n" +
        "      console.log(\"검증 통과!\");\n" +
        "    } else {\n" +
        "      console.log(\"검증 실패:\", errors);\n" +
        "    }\n" +
        "  };" +
        "\n" +
        "  return (\n" +
        "    <>\n" +
        "      <form onSubmit={handleSubmit(onSubmit)}>\n" +
        "        <TextField\n" +
        "          fullWidth\n" +
        "          // label=\"이름\"\n" +
        "          {...register('name')}\n" +
        "          error={!!errors.name}\n" +
        "          helperText={errors.name?.message}\n" +
        "          margin=\"normal\"\n" +
        "        />\n" +
        "        <TextField\n" +
        "          fullWidth\n" +
        "          // label=\"이메일\"\n" +
        "          {...register('email')}\n" +
        "          error={!!errors.email}\n" +
        "          helperText={errors.email?.message}\n" +
        "          margin=\"normal\"\n" +
        "        />\n" +
        "        <Button type=\"submit\" variant=\"contained\" color=\"primary\">\n" +
        "          제출\n" +
        "        </Button>\n" +
        "      </form>\n" +
        "    </>\n" +
        "  );\n" +
        "};\n" +
        "\n" +
        "export default UserForm;"
      }/>
      </Container>
    </div>
  );
};

export default TestPage8;