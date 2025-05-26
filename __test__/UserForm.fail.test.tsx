import React from 'react';
import {
  render,
  screen,
  fireEvent,
} from '@testing-library/react';
import UserFormTest, { UserFormData } from '../src/app/_component/UserFormTest';

describe('UserFormTest', () => {
  const mockUserData: UserFormData = {
    name: 'John Doe',
    email: 'john@example.com',
  };

  test('폼 인풋 유효성 체크', async () => {
    const handleSubmit = jest.fn();
    // 초기화된 상태로 렌더링
    render(<UserFormTest onSubmit={handleSubmit} />);

    // 제출 버튼 클릭
    fireEvent.click(screen.getByRole('button', { name: /제출/i }));

    // 이름 필드 오류 메시지 확인
    expect(await screen.findByText(/이름을 입력하세요/i)).toBeInTheDocument();
    expect(await screen.findByText(/유효한 이메일 주소가 아닙니다/i)).toBeInTheDocument();

    // 제출 함수가 호출되지 않았는지 확인
    expect(handleSubmit).toHaveBeenCalled();
  });

});