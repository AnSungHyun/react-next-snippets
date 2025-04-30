'use client'

import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { SentimentDissatisfied } from '@mui/icons-material';

const NotFound = () => {
  const router = useRouter();

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#f5f5f5',
      }}
    >
      <SentimentDissatisfied sx={{ fontSize: 100, color: '#666', mb: 2 }} />
      <Typography variant="h1" sx={{ fontSize: '6rem', color: '#333', mb: 2 }}>
        404
      </Typography>
      <Typography variant="h5" sx={{ color: '#666', mb: 3 }}>
        페이지를 찾을 수 없습니다
      </Typography>
      <Typography variant="body1" sx={{ color: '#888', mb: 4, textAlign: 'center' }}>
        요청하신 페이지가 삭제되었거나 주소가 변경되었을 수 있습니다.
      </Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push('/')}
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: 2,
            textTransform: 'none',
            fontSize: '1.1rem',
          }}
        >
          홈으로 이동
        </Button>
        <Button
          variant="outlined"
          onClick={() => router.back()}
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: 2,
            textTransform: 'none',
            fontSize: '1.1rem',
          }}
        >
          이전 페이지
        </Button>
      </Box>
    </Box>
  );
};

export default NotFound;