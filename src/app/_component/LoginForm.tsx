"use client"
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button } from '@mui/material';
import { useForm } from "react-hook-form";
import React, { useEffect } from "react";

// Zod 스키마 정의
const schema = z.object({
  username: z.string().min(1, '사용자 이름을 입력하세요.'),
  password: z.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다.'),
});

// 필드 이름 타입 정의
type FieldName = keyof LoginFormData;

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
}

interface LoginFormData {
  username: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset, trigger } = useForm({
    resolver: zodResolver(schema),
    mode: 'onSubmit'
  });

  const handleLogin = (data: LoginFormData) => {
    console.log('로그인 데이터:', data); // 로그인 데이터 확인
    onSubmit(data);
  };

  const onSubmit = (data: any) => {
    console.log('폼 제출:', data); // 폼 제출 데이터 확인
  };

  const onReset = () => {
    reset();
  };

  // 포커스 아웃 시 유효성 검사
  const handleBlur = async (field: FieldName) => {
    const result = await trigger(field); // 특정 필드 유효성 검사
    if (!result) {
      console.log(`${field} 검증 실패:`, errors[field]);
    } else {
      console.log(`${field} 검증 통과!`);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleLogin)}>
        <TextField
          fullWidth
          label="사용자 이름"
          size={"small"}
          {...register('username')}
          error={!!errors.username}
          helperText={errors.username?.message}
          margin="normal"
          onBlur={() => handleBlur('username')} // 포커스 아웃 시 유효성 검사
        />
        <TextField
          fullWidth
          label="비밀번호"
          type="password"
          size={"small"}
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
          margin="normal"
          onBlur={() => handleBlur('password')} // 포커스 아웃 시 유효성 검사
        />
        <Button type="submit" variant="contained" color="primary">
          로그인
        </Button>
        <Button type="button" variant="contained" color="secondary" onClick={onReset}>
          초기화
        </Button>
      </form>
    </>
  );
};

export default LoginForm;