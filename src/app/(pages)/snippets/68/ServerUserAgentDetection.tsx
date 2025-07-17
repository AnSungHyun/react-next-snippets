// components/ServerUserAgentDetection.tsx
import { headers } from 'next/headers';
import { Container, Typography } from '@mui/material';
import { detectUserAgent } from './UserAgentHelper';

export default async function ServerUserAgentDetection() {
  const headersList = await headers();
  const userAgent = headersList.get('user-agent') || '';
  const deviceInfo = detectUserAgent(userAgent);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        서버 디바이스 타입 체크
      </Typography>

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