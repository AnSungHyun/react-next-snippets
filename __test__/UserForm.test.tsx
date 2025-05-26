import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import UserFormTest, { UserFormData } from '../src/app/_component/UserFormTest';

describe('UserFormTest', () => {
  const mockUserData: UserFormData = {
    name: 'John Doe',
    email: 'john@example.com',
  };

  test('renders correctly with initial values', () => {
    // 제출 함수 모킹
    const handleSubmit = jest.fn();
    // mockUserData를 전달하여 초기값 설정
    render(<UserFormTest userData={mockUserData} onSubmit={handleSubmit} />);

    // 초기값이 올바르게 렌더링되었는지 확인
    expect(screen.getByDisplayValue(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/john@example.com/i)).toBeInTheDocument();
  });

  test('validates form inputs', async () => {
    const handleSubmit = jest.fn();
    // 초기화된 상태로 렌더링
    render(<UserFormTest onSubmit={handleSubmit} />);

    // 제출 버튼 클릭
    fireEvent.click(screen.getByRole('button', { name: /제출/i }));

    // 이름 필드 오류 메시지 확인
    expect(await screen.findByText(/이름을 입력하세요/i)).toBeInTheDocument();
    expect(await screen.findByText(/유효한 이메일 주소가 아닙니다/i)).toBeInTheDocument();

    // 제출 함수가 호출되지 않았는지 확인
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  test('submits form with valid inputs', async () => {
    const handleSubmit = jest.fn();
    render(<UserFormTest userData={mockUserData} onSubmit={handleSubmit} />);

    // 이름과 이메일 필드에 값 입력
    fireEvent.click(screen.getByRole('button', { name: /제출/i }));

    // 제출 버튼 클릭
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith(mockUserData, expect.anything());
    });
  });

  test('resets form when reset button is clicked', async () => {
    const handleSubmit = jest.fn();
    render(<UserFormTest userData={mockUserData} onSubmit={handleSubmit} />);

    // 초기화 버튼 클릭
    fireEvent.click(screen.getByRole('button', { name: /초기화/i }));

    // 초기화 후 값 확인
    expect(screen.getByDisplayValue(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/john@example.com/i)).toBeInTheDocument();
  });
});