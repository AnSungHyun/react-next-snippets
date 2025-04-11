import React from 'react';

interface ResultProps {
  children: string | React.ReactNode; // 결과가 문자열 또는 JSX 요소일 수 있음
}

const ResultBlock: React.FC<ResultProps> = ({ children }) => {
  return (
    <div style={{
      border: "1px solid #ccc", // 테두리 설정
      borderRadius: "4px", // 모서리 둥글게
      padding: "10px", // 패딩 추가
      backgroundColor: "#f9f9f9", // 배경색 설정
      marginTop: "10px", // 위쪽 여백 추가
      fontSize: "14px" // 폰트 크기 조절
    }}>
      <h4>결과:</h4>
      <pre style={{ whiteSpace: "pre-wrap" }}>{children}</pre>
    </div>
  );
};

export default ResultBlock;