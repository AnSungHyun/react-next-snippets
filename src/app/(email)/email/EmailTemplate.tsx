// components/EmailTemplate.tsx
'use client'

import React from 'react';

interface EmailTemplateProps {
  username: string;
  verificationCode: string;
  expirationTime: string;
}

const EmailTemplate: React.FC<EmailTemplateProps> = ({
                                                       username,
                                                       verificationCode,
                                                       expirationTime
                                                     }) => {
  return (
    <div style={{ background: '#f0f0f0', padding: '20px', margin: 0 }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        fontFamily: '"Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", sans-serif'
      }}>
        <div style={{ background: '#f8f9fa', padding: '30px', textAlign: 'center' }}>
          <h1 style={{ margin: 0, color: '#333' }}>이메일 인증</h1>
        </div>
        <div style={{ padding: '40px 30px', background: '#ffffff' }}>
          <p>안녕하세요, {username}님!</p>
          <p>아래의 인증 코드를 입력해주세요:</p>
          <div style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#4A90E2',
            letterSpacing: '5px',
            textAlign: 'center',
            margin: '30px 0'
          }}>
            {verificationCode}
          </div>
          <p>이 인증 코드는 {expirationTime}까지 유효합니다.</p>
          <p style={{ color: '#ff4444', fontSize: '14px', marginTop: '20px' }}>
            ※ 본인이 요청하지 않은 인증 메일을 받으셨다면 이 메일을 무시해주세요.
          </p>
        </div>
        <div style={{
          padding: '20px',
          textAlign: 'center',
          fontSize: '12px',
          color: '#666',
          background: '#f8f9fa'
        }}>
          본 메일은 발신전용입니다. 문의사항은 고객센터를 이용해주세요.<br />
          ⓒ 2025 Company Name. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default EmailTemplate;