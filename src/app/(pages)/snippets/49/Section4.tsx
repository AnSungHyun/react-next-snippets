// components/Section4.tsx
import { Card, CardContent, Typography, Box } from '@mui/material';

const Section4 = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>1Column 배너 리스트</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardContent>
              <Typography variant="h5" gutterBottom>배너 {i + 1}</Typography>
              <Box sx={{
                height: '200px',
                bgcolor: '#f0f0f0',
                my: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                배너 이미지 영역
              </Box>
              <Typography variant="body1">배너 설명이 들어갈 영역입니다.</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Section4;