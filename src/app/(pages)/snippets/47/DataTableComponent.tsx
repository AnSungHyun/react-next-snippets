'use client';
import React from 'react';

interface DataItem {
  id: number;
  name: string;
  value: number;
}

const DataTableComponent = () => {
  const data: DataItem[] = [
    { id: 1, name: '항목 1', value: 100 },
    { id: 2, name: '항목 2', value: 200 },
    { id: 3, name: '항목 3', value: 300 },
  ];

  return (
    <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '4px' }}>
      <h3>데이터 테이블</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
        <tr>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>이름</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>값</th>
        </tr>
        </thead>
        <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.id}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.name}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.value}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTableComponent;