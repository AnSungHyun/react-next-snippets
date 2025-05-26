'use client'

import React, { useEffect } from "react";
import {Container} from "@mui/material";
import CodeBlock from "@/app/_component/CodeBlock";
// import {UserFormData} from '@/app/_component/UserFormTest';
import Image from "next/image";

const TestPage44: React.FC = () => {
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
          - 이 예제에서는 사용자 정보를 입력받는 폼 컴포넌트를 테스트합니다.
          <br />
          - 폼은 이름과 이메일을 입력받으며, 유효성 검사를 포함합니다.
          <br />- 테스트는 컴포넌트 렌더링, 입력값 검증, 제출 및 초기화 기능을
          포함합니다.
        </p>
        <CodeBlock
          filename={'전체 테스트 코드 실행 및 결과'}
          language={'typescript'}
          value={'pnpm test\n' + 'pnpm jest'}
        />
        <div style={{ position: 'relative', width: '100%', height: '300px' }}>
          <Image
            src="/images/snippets/UserFormTest.png"
            alt="UserFormTest"
            fill
            style={{ objectFit: 'contain' }}
          />
        </div>
        {/*<UserFormTest userData={userData} onSubmit={onSubmit} />*/}

        <CodeBlock
          filename={'/__test__/UserForm.test.tsx'}
          language={'typescript'}
          value={
            "import React from 'react';\n" +
            "import {\n" +
            "  render,\n" +
            "  screen,\n" +
            "  fireEvent,\n" +
            "  waitFor,\n" +
            "} from '@testing-library/react';\n" +
            "import UserFormTest, { UserFormData } from '../src/app/_component/UserFormTest';\n" +
            "\n" +
            "describe('UserFormTest', () => {\n" +
            "  const mockUserData: UserFormData = {\n" +
            "    name: 'John Doe',\n" +
            "    email: 'john@example.com',\n" +
            "  };\n" +
            "\n" +
            "  test('renders correctly with initial values', () => {\n" +
            "    // 제출 함수 모킹\n" +
            "    const handleSubmit = jest.fn();\n" +
            "    // mockUserData를 전달하여 초기값 설정\n" +
            "    render(<UserFormTest userData={mockUserData} onSubmit={handleSubmit} />);\n" +
            "\n" +
            "    // 초기값이 올바르게 렌더링되었는지 확인\n" +
            "    expect(screen.getByDisplayValue(/John Doe/i)).toBeInTheDocument();\n" +
            "    expect(screen.getByDisplayValue(/john@example.com/i)).toBeInTheDocument();\n" +
            "  });\n" +
            "\n" +
            "  test('validates form inputs', async () => {\n" +
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
            "    // 제출 함수가 호출되지 않았는지 확인\n" +
            "    expect(handleSubmit).not.toHaveBeenCalled();\n" +
            "  });\n" +
            "\n" +
            "  test('submits form with valid inputs', async () => {\n" +
            "    const handleSubmit = jest.fn();\n" +
            "    render(<UserFormTest userData={mockUserData} onSubmit={handleSubmit} />);\n" +
            "\n" +
            "    // 이름과 이메일 필드에 값 입력\n" +
            "    fireEvent.click(screen.getByRole('button', { name: /제출/i }));\n" +
            "\n" +
            "    // 제출 버튼 클릭\n" +
            "    await waitFor(() => {\n" +
            "      expect(handleSubmit).toHaveBeenCalledWith(mockUserData, expect.anything());\n" +
            "    });\n" +
            "  });\n" +
            "\n" +
            "  test('resets form when reset button is clicked', async () => {\n" +
            "    const handleSubmit = jest.fn();\n" +
            "    render(<UserFormTest userData={mockUserData} onSubmit={handleSubmit} />);\n" +
            "\n" +
            "    // 초기화 버튼 클릭\n" +
            "    fireEvent.click(screen.getByRole('button', { name: /초기화/i }));\n" +
            "\n" +
            "    // 초기화 후 값 확인\n" +
            "    expect(screen.getByDisplayValue(/John Doe/i)).toBeInTheDocument();\n" +
            "    expect(screen.getByDisplayValue(/john@example.com/i)).toBeInTheDocument();\n" +
            "  });\n" +
            "});"
          }
        />
      </Container>
    </div>
  );
};

export default TestPage44;