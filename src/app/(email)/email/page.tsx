// page.tsx
'use client'

import React from 'react';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import EmailTemplate from '@/app/(email)/email/EmailTemplate';
import { useRouter } from 'next/navigation';

interface EmailTemplateProps {
  username: string;
  verificationCode: string;
  expirationTime: string;
}

export default function EmailTemplatePage() {
  const router = useRouter();

  const sampleData: EmailTemplateProps = {
    username: "홍길동",
    verificationCode: "123456",
    expirationTime: "2025-05-13 18:00"
  };

  return (
    <Container>
      <Button
        onClick={() => {
          router.back();
        }}
      >
        뒤로가기
      </Button>
      <div style={{ display: 'flex' }}>
        <h1>이메일 템플릿 미리보기</h1>
      </div>
      <EmailTemplate {...sampleData} />
    </Container>
  );
}