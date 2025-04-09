"use client"

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialOceanic } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { CopyToClipboard } from "react-copy-to-clipboard";

interface TProps {
  language: string;
  value: string;
}

const CodeBlock: React.FC<TProps> = ({ language, value }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // 2초 후에 복사 상태 초기화
  };

  return (
    <div style={{ position: "relative", fontSize: "14px" }}> {/* 폰트 크기 조절 */}
      <CopyToClipboard text={value} onCopy={handleCopy}>
        <button style={{
          position: "absolute",
          right: "10px",
          top: "10px",
          zIndex: 1, // 버튼을 위로 올리기
          backgroundColor: "white", // 배경색 설정
          border: "1px solid #ccc", // 테두리 설정
          padding: "5px 10px", // 패딩 추가
          cursor: "pointer" // 커서 스타일
        }}>
          {copied ? "복사됨!" : "복사"}
        </button>
      </CopyToClipboard>
      <SyntaxHighlighter language={language} style={materialOceanic}>
        {value}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
