
// components/Section2.tsx
import { Card, CardContent, Typography, Box } from '@mui/material';

const Section2 = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>2Column 상품 리스트</Typography>
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 2,
        '& > *': { gridColumn: 'span 1' }
      }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i}>
            <CardContent>
              <Typography variant="h6">상품 {i + 1}</Typography>
              <Box sx={{
                height: '150px',
                bgcolor: '#f5f5f5',
                my: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                상품 이미지 영역
              </Box>
              <Typography variant="body1">가격: ₩{(29900 + i * 1000).toLocaleString()}</Typography>
              <Typography variant="body2" color="text.secondary">상품 설명이 들어갈 영역입니다.</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Section2;