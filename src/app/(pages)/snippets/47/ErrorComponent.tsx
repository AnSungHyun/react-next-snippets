'use client';
import React, { useEffect } from 'react';

const ErrorComponent = () => {

  useEffect(() => {
    throw new Error("의도적으로 발생시킨 에러입니다!");
  }, []);

  return (
    <div>
      이 내용은 보이지 않을 것입니다.
    </div>
  );
};

export default ErrorComponent;