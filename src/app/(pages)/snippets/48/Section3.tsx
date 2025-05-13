// components/Section3.tsx
const Section3 = () => {
  return (
    <div className="min-h-[1200px] p-8 bg-red-100">
      <h2 className="text-2xl mb-4">섹션 3</h2>
      <div className="space-y-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl mb-4">큰 컨텐츠 블록 {i + 1}</h3>
            <div className="space-y-4">
              <p>섹션 3의 긴 컨텐츠입니다...</p>
              <div className="h-60 bg-red-50"></div>
              <p>추가 설명 텍스트...</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Section3;