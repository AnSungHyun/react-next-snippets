'use client'

import React from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useRouter } from "next/navigation";

const LoginPage: React.FC = () => {
  const router = useRouter();

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    // 로그인 처리 로직 추가
    console.log("로그인 시도");
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 8,
          p: 3,
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        <Typography variant="h5">로그인</Typography>
        <form onSubmit={handleLogin} style={{ width: "100%" }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="이메일"
            type="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="비밀번호"
            type="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            로그인
          </Button>
        </form>
        <Button
          variant="text"
          onClick={handleBack}
          sx={{ mt: 2 }}
        >
          뒤로가기
        </Button>
      </Box>
    </Container>
  );
};

export default LoginPage;