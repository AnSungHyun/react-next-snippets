// app/test/TestClient.tsx
'use client';

import { useProductStore } from './store';
import { useState } from 'react';
import { Button, TextField } from '@mui/material';

export default function TestClient() {
  const { initialized, products, updateProductTitle } = useProductStore();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newTitle, setNewTitle] = useState('');

  const handleEdit = (productId: number, currentTitle: string) => {
    setEditingId(productId);
    setNewTitle(currentTitle);
  };

  const handleSave = (productId: number) => {
    updateProductTitle(productId, newTitle);
    setEditingId(null);
    setNewTitle('');
  };

  const handleCancel = () => {
    setEditingId(null);
    setNewTitle('');
  };

  return (
    <div>
      <h1>상품 목록</h1>{/*
      {initialized && <h2>{products[0].tags[0]}</h2>}*/}
      <h2>{products?.[0]?.reviews?.[0]?.rating}</h2>
      <div>
        {products.map((product) => (
          <div key={product.id} style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #ddd' }}>
            {editingId === product.id ? (
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <TextField
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  size="small"
                  fullWidth
                />
                <Button onClick={() => handleSave(product.id)} variant="contained" color="primary" size="small">
                  저장
                </Button>
                <Button onClick={handleCancel} variant="outlined" color="secondary" size="small">
                  취소
                </Button>
              </div>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0 }}>{product.title}</h3>
                <Button
                  onClick={() => handleEdit(product.id, product.title)}
                  variant="outlined"
                  size="small"
                >
                  수정
                </Button>
              </div>
            )}
            <p>{product.description}</p>
            <p>가격: ${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}