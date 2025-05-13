// components/Section2.tsx
const Section2 = () => {
  return (
    <div className="min-h-[1000px] p-8 bg-green-100">
      <h2 className="text-2xl mb-4">섹션 2</h2>
      <div className="grid grid-cols-2 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="p-4 bg-white rounded shadow">
            <h3>아이템 {i + 1}</h3>
            <p>섹션 2의 그리드 아이템입니다...</p>
            <div className="h-40 bg-green-50 mt-4"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Section2;