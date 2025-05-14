// app/search/page.tsx
export default function SearchPage({
                                     searchParams,
                                   }: {
  searchParams: { query?: string; page?: string };
}) {
  return (
    <div>
      <h1>검색 결과</h1>
      <p>검색어: {searchParams.query}</p>
      <p>페이지: {searchParams.page || '1'}</p>
    </div>
  );
}