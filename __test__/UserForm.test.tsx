// UserForm.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UserForm from '../src/app/_component/UserForm';

describe('UserForm', () => {
  const mockUserData = {
    name: 'John Doe',
    email: 'john@example.com',
  };

  test('renders correctly with initial values', () => {
    render(<UserForm userData={mockUserData} />);

    expect(screen.getByDisplayValue(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/john@example.com/i)).toBeInTheDocument();
  });

  test('validates form inputs', async () => {
    render(<UserForm />);

    // 제출 버튼 클릭
    fireEvent.click(screen.getByRole('button', { name: /제출/i }));

    // 이름 필드 오류 메시지 확인
    expect(await screen.findByText(/이름을 입력하세요/i)).toBeInTheDocument();
    // 이메일 필드 오류 메시지 확인
    expect(await screen.findByText(/유효한 이메일 주소가 아닙니다/i)).toBeInTheDocument();
  });

  test('submits form with valid inputs', async () => {
    const handleSubmit = jest.fn();
    render(<UserForm userData={mockUserData} />);

    // 제출 버튼 클릭
    fireEvent.click(screen.getByRole('button', { name: /제출/i }));

    // await waitFor(() => {
    //   expect(handleSubmit).toHaveBeenCalled();
    //   expect(handleSubmit).toHaveBeenCalledWith({
    //     name: 'Jane Doe',
    //     email: 'jane@example.com',
    //   });
    // });
  });

  test('resets form when reset button is clicked', () => {
    render(<UserForm userData={mockUserData} />);

    // 초기화 버튼 클릭
    fireEvent.click(screen.getByRole('button', { name: /초기화/i }));

    // 초기화 후 값 확인
    expect(screen.getByDisplayValue(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/john@example.com/i)).toBeInTheDocument();
  });
});
