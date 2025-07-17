
'use client';

import { Button } from '@mui/material';

interface UserAgentButtonProps {
  initialUserAgent: string;
  onUserAgentChange: (newUserAgent: string) => void;
}

export default function UserAgentButton({ initialUserAgent, onUserAgentChange }: UserAgentButtonProps) {
  const handleClick = () => {
    const newUserAgent = initialUserAgent + ' MyAppName';
    onUserAgentChange(newUserAgent);
  };

  return (
    <Button variant="contained" onClick={handleClick} sx={{ mb: 2 }}>
      앱으로 변경
    </Button>
  );
}