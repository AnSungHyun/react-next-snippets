import React from "react";

const fetchData = async () => {
  // 2초 후에 데이터 반환
  return new Promise<string>((resolve) =>
    setTimeout(() => resolve("Server 컴포넌트 비동기 데이터 로드 완료!"), 2000),
  );
};

// 비동기적으로 데이터를 가져오는 컴포넌트
const SuspenseServerComponent = async () => {
  const data = await fetchData(); // 서버에서 데이터 가져오기

  return (
    <div>
      {data}
    </div>
  );
};

export default SuspenseServerComponent;
