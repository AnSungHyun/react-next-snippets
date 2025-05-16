// components/Section1.tsx
const Section1 = () => {
  return (
    <div className="min-h-[800px] p-8 bg-blue-100">
      <h2 className="text-2xl mb-4">섹션 1</h2>
      {/* 충분한 컨텐츠 높이를 만들기 위한 반복 요소 */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} className="mb-8 p-4 bg-white rounded shadow">
          <h3>컨텐츠 {i + 1}</h3>
          <p>섹션 1의 상세 내용입니다...</p>
        </div>
      ))}
    </div>
  );
};

export default Section1;