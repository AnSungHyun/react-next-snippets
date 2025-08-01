// DebouncedButton.tsx
'use client';

import React, { useEffect } from 'react';
import { Button } from '@mui/material';
import { useFetchProducts } from './useFetchProducts';

export default function DebouncedButton() {
  const { isLoading, fetchProducts, response } = useFetchProducts(500);

  const handleFetchClick = async () => {
    try {
      console.log('fetchProducts 시작');
      const result = await fetchProducts();
      console.log('fetchProducts 응답:', result);
    } catch (error) {
      console.error('버튼 클릭 처리 중 에러:', error);
    }
  };

  useEffect(() => {
    console.log( 'useEffect - response 변경 감지:', response);
  }, [response]);


  return (
    <Button
      variant="contained"
      onClick={handleFetchClick}
      disabled={isLoading}
      sx={{ m: 2 }}
    >
      {isLoading ? '로딩 중...' : '데이터 요청'}
    </Button>
  );
}