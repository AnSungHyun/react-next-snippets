// @ts-nocheck
/* eslint-disable */
'use client'

import React, { useEffect } from "react";
import {Container} from "@mui/material";
import CodeBlock from "@/app/_component/CodeBlock";
// import {UserFormData} from '@/app/_component/UserFormTest';
import Image from "next/image";

const TestPage45: React.FC = () => {
  useEffect(() => {
  }, []);
  // const userData: UserFormData = {
  //   name: 'SungHyun',
  //   email: 'sunghyun@example.co.kr',
  // }
  //
  // const onSubmit = (data: UserFormData) => {
  //   console.log('폼 제출:', data);
  // }

  return (
    <div>
      <Container>
        <p>
          - Jest와 React Testing Library를 사용하여 React 컴포넌트 테스트하기
        </p>
        <p>
          - 이 예제에서는 테스트 코드 수행 중 오류가 발견된 경우 어떻게 표현되는지 확인합니다.
        </p>
        <CodeBlock
          filename={'전체 테스트 코드 실행 및 결과'}
          language={'typescript'}
          value={'pnpm test\n' + 'pnpm jest'}
        />
        <div style={{ position: 'relative', width: '100%', height: '300px' }}>
          <Image
            src="/images/snippets/UserFormTestFail.png"
            alt="UserFormTest"
            fill
            style={{ objectFit: 'contain' }}
          />
        </div>
        {/*<UserFormTest userData={userData} onSubmit={onSubmit} />*/}

        <CodeBlock
          filename={'/__test__/UserForm.fail.test.tsx'}
          language={'typescript'}
          value={
            "import React from 'react';\n" +
            "import {\n" +
            "  render,\n" +
            "  screen,\n" +
            "  fireEvent,\n" +
            "} from '@testing-library/react';\n" +
            "import UserFormTest, { UserFormData } from '../src/app/_component/UserFormTest';\n" +
            "\n" +
            "describe('UserFormTest', () => {\n" +
            "  const mockUserData: UserFormData = {\n" +
            "    name: 'John Doe',\n" +
            "    email: 'john@example.com',\n" +
            "  };\n" +
            "\n" +
            "  test('폼 인풋 유효성 체크', async () => {\n" +
            "    const handleSubmit = jest.fn();\n" +
            "    // 초기화된 상태로 렌더링\n" +
            "    render(<UserFormTest onSubmit={handleSubmit} />);\n" +
            "\n" +
            "    // 제출 버튼 클릭\n" +
            "    fireEvent.click(screen.getByRole('button', { name: /제출/i }));\n" +
            "\n" +
            "    // 이름 필드 오류 메시지 확인\n" +
            "    expect(await screen.findByText(/이름을 입력하세요/i)).toBeInTheDocument();\n" +
            "    expect(await screen.findByText(/유효한 이메일 주소가 아닙니다/i)).toBeInTheDocument();\n" +
            "\n" +
            "    // 함수 호출 코드가 없기때문에 handleSubmit 이 호출되지 않아야 하지만, \n" +
            "    // 호출 했을 것으로 예상하여 toHaveBeenCalled() 를 사용하여 오류로 판단\n" +
            "    expect(handleSubmit).toHaveBeenCalled();\n" +
            "  });\n" +
            "\n" +
            "});"
          }
        />
      </Container>
    </div>
  );
};

export default TestPage45;