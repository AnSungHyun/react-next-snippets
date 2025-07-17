// components/UserAgentDetectionPage.tsx
'use client';

import { Container, Typography } from '@mui/material';
import UserAgentButton from './UserAgentButton';
import { useState, useEffect } from 'react';
import { detectUserAgent } from './UserAgentHelper';

export default function UserAgentDetectionPage() {
  const [userAgent, setUserAgent] = useState('');

  useEffect(() => {
    setUserAgent(window.navigator.userAgent);
  }, []);

  const deviceInfo = detectUserAgent(userAgent);

  const handleUserAgentChange = (newUserAgent: string) => {
    setUserAgent(newUserAgent);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        클라이언트 디바이스 타입 체크
      </Typography>

      <UserAgentButton
        initialUserAgent={userAgent}
        onUserAgentChange={handleUserAgentChange}
      />

      <Typography variant="body1">
        현재 디바이스: <strong>{deviceInfo.deviceType}</strong>
      </Typography>

      <Typography variant="body2" sx={{ mt: 2 }}>
        User Agent: {deviceInfo.userAgent}
      </Typography>

      <Typography variant="body1" sx={{ mt: 3 }}>
        상세 정보:
      </Typography>
      <ul>
        <li>PC: {deviceInfo.isPC.toString()}</li>
        <li>Mobile: {deviceInfo.isMobile.toString()}</li>
        <li>APP: {deviceInfo.isApp.toString()}</li>
      </ul>
    </Container>
  );
}