// page.tsx
'use client'

import React from 'react';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import Link from 'next/link';
import EmailTemplate from '@/app/(email)/email/EmailTemplate';

interface EmailTemplateProps {
  username: string;
  verificationCode: string;
  expirationTime: string;
}

export default function EmailTemplatePage() {
  const sampleData: EmailTemplateProps = {
    username: "홍길동",
    verificationCode: "123456",
    expirationTime: "2025-05-13 18:00"
  };

  return (
    <Container>
      <p>
        - 이메일 발송을 위한 템플릿 예시 코드
      </p>
      <p>
        - 만약, 전체 화면의 이메일 발송을 위한 템플릿이 어떠한 형태로 나오는지 확인하고 싶으면 Click
      </p>
      <div style={{ display: 'flex' }}>
        <h1>이메일 템플릿 미리보기</h1>
        <Button>
          <Link href={"/email"}>전체화면</Link>
        </Button>
      </div>
      <EmailTemplate {...sampleData} />
    </Container>
  );
}