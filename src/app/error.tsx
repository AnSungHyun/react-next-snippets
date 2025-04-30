// app/error.tsx
'use client'

import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

const Error = ({ error, reset }: ErrorProps) => {
  const router = useRouter();

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#fef2f2',
        padding: 3,
      }}
    >
      <ErrorOutline
        sx={{
          fontSize: 80,
          color: '#dc2626',
          mb: 3
        }}
      />

      <Typography
        variant="h4"
        sx={{
          color: '#991b1b',
          mb: 2,
          textAlign: 'center'
        }}
      >
        죄송합니다. 문제가 발생했습니다.
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: '#666',
          mb: 4,
          textAlign: 'center'
        }}
      >
        {error.message || '알 수 없는 오류가 발생했습니다.'}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          gap: 2,
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}
      >
        <Button
          variant="contained"
          onClick={() => reset()}
          sx={{
            bgcolor: '#dc2626',
            '&:hover': {
              bgcolor: '#b91c1c',
            },
            px: 4,
            py: 1.5,
            borderRadius: 2,
            textTransform: 'none',
          }}
        >
          다시 시도
        </Button>

        <Button
          variant="outlined"
          onClick={() => router.push('/')}
          sx={{
            color: '#dc2626',
            borderColor: '#dc2626',
            '&:hover': {
              borderColor: '#b91c1c',
              bgcolor: 'rgba(220, 38, 38, 0.04)',
            },
            px: 4,
            py: 1.5,
            borderRadius: 2,
            textTransform: 'none',
          }}
        >
          홈으로 이동
        </Button>
      </Box>

      {process.env.NODE_ENV === 'development' && (
        <Box
          sx={{
            mt: 4,
            p: 2,
            bgcolor: '#fff',
            borderRadius: 1,
            maxWidth: '80%',
            overflow: 'auto'
          }}
        >
          <Typography variant="body2" sx={{ color: '#666', whiteSpace: 'pre-wrap' }}>
            {error.stack}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Error;