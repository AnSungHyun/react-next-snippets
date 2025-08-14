
'use client';

import React, { useState, useEffect } from 'react';
import { useProductStore } from './store';
import { Button } from '@mui/material';

export function ErrorList() {
  const { products, deleteProduct } = useProductStore();
  const [isLoading, setIsLoading] = useState(false);

  // useState를 조건부로 사용하여 에러 발생
  if (products.length === 0) {
    const [error] = useState('데이터가 없습니다');
    return <div>{error}</div>;
  }

  // 첫 번째 렌더링에서는 이 훅들이 호출되지 않아 에러 발생
  const [selectedId, setSelectedId] = useState<number | null>(null);
  useEffect(() => {
    console.log('선택된 ID:', selectedId);
  }, [selectedId]);

  return (
    <div>
      <h2>에러 발생 데모</h2>
      {products.map((product) => (
        <div key={product.id} style={{ margin: '10px', padding: '10px', border: '1px solid #ccc' }}>
          <h3>{product.title}</h3>
          <p>가격: ${product.price}</p>
          <Button
            variant="contained"
            color="error"
            disabled={isLoading}
            onClick={() => {
              setSelectedId(product.id);
              deleteProduct(product.id);
            }}
          >
            삭제
          </Button>
        </div>
      ))}
    </div>
  );
}

export default function ProductList() {
  return (
    <div>
      <ErrorList />
    </div>
  );
}