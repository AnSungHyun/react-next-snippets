// ServerSideComponent.tsx
import React from 'react';
import { getProductsApiWithCache, Product } from '@/app/_api/GetProduct';

interface ServerSideProps {
  products: Product[];
  loadTime: string;
}

const ServerSideComponent = ({ products, loadTime }: ServerSideProps) => {
  console.log('ServerSideComponent');
  const isServer = typeof window === 'undefined'; // 서버인지 클라이언트인지 확인
  console.log('isServer: ', isServer);
  return (
    <div style={{ padding: '20px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
      <h3>서버 사이드 렌더링 컴포넌트</h3>
      <p style={{ color: '#666' }}>데이터 로딩 시간: {loadTime}</p>
      <div style={{ marginTop: '20px' }}>
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              padding: '12px',
              marginBottom: '12px',
              backgroundColor: '#f5f5f5',
              borderRadius: '4px'
            }}
          >
            <h4 style={{ margin: '0 0 8px 0' }}>{product.title}</h4>
            <p style={{ margin: '0 0 8px 0', color: '#666' }}>
              {product.description}
            </p>
            <p style={{ margin: 0, color: '#2196f3' }}>
              가격: ${product.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServerSideComponent;