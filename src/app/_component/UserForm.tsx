'use client'
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {TextField, Button} from '@mui/material';
import {useForm} from "react-hook-form";
import React, {useEffect} from "react";

// Zod 스키마 정의
const schema = z.object({
  name: z.string().min(1, '이름을 입력하세요.'),
  email: z.string().email('유효한 이메일 주소가 아닙니다.'),
});

interface UserFormProps {
  userData?: UserFormData;
}

interface UserFormData {
  // onSubmit: (data: any) => void;
  name?: string;
  email?: string;
}

//const UserForm: React.FC<{ userData: UserFormProps }> = ({ userData }) => {
const UserForm: React.FC<UserFormProps> = ({userData}) => {
  const {register, getValues, setValue, watch, trigger, reset, getFieldState, setFocus, handleSubmit, formState: {errors}} = useForm({
    resolver: zodResolver(schema),
    mode: 'onSubmit'
  });

  const onSubmit = (data: any) => {
    console.log('폼 제출:', data); // 폼 제출 데이터 확인
    console.log(getValues()); // 현재 폼 값 확인
    setFocus('email'); // 포커스 설정
    console.log(getFieldState('name')); // 필드 상태 확인
  };

  // 입력값 감시
  const nameValue = watch('name');
  const emailValue = watch('email');

  useEffect(() => {
    reset({
      name: userData?.name || '',
      email: userData?.email || '',
    }); // 기본값 설정
  }, []);

  const onReset = () => {
    reset();
  }

  const handleTrigger = async () => {
    const result = await trigger(); // 모든 필드 검증
    if (result) {
      console.log("검증 통과!");
    } else {
      console.log("검증 실패:", errors);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          // label="이름"
          size={"small"}
          {...register('name')}
          error={!!errors.name}
          helperText={errors.name?.message}
          margin="normal"
        />
        <TextField
          fullWidth
          // label="이메일"
          size={"small"}
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          제출
        </Button>
        <Button type="button"  variant="contained" color="primary" onClick={onReset}>
          초기화
        </Button>
        <Button type="button"  variant="contained" color="primary" onClick={handleTrigger}>
          유효성 검증
        </Button>
      </form>
    </>
  );
};

export default UserForm;