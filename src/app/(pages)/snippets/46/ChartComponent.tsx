'use client';
import React from 'react';

const ChartComponent = () => {
  return (
    <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '4px' }}>
      <h3>차트 데이터</h3>
      <div style={{
        height: '200px',
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: '4px'
      }}>
        차트 데이터 시각화 영역
      </div>
    </div>
  );
};

export default ChartComponent;