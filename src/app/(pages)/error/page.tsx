'use client';

import React from 'react';
import { Button, Typography, Container } from '@mui/material';
import { useRouter } from 'next/navigation';

const ErrorPage: React.FC = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back(); // 이전 페이지로 이동
  };

  return (
    <Container component="main" maxWidth="xs" sx={styles.container}>
      <Typography variant="h2" component="h1" gutterBottom>
        오류 발생
      </Typography>
      <Typography variant="body1" gutterBottom>
        요청하신 페이지를 찾을 수 없습니다.
      </Typography>
      <Button variant="contained" color="primary" onClick={handleBack}>
        뒤로가기
      </Button>
    </Container>
  );
};

// 스타일 정의
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
  },
};

export default ErrorPage;
