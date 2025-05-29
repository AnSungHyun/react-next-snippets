// components/Section1.tsx
import { Card, CardContent, Typography, Box } from '@mui/material';

const Section1 = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>1Column 상품 리스트</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i} sx={{ width: '100%' }}>
            <CardContent>
              <Typography variant="h6">상품 {i + 1}</Typography>
              <Box sx={{
                height: '100px',
                bgcolor: '#f5f5f5',
                my: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                상품 이미지 영역
              </Box>
              <Typography variant="body1">가격: ₩{(19900 + i * 1000).toLocaleString()}</Typography>
              <Typography variant="body2" color="text.secondary">상품 설명이 들어갈 영역입니다.</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Section1;