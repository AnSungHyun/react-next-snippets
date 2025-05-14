// app/search/page.tsx
export default async function SearchPage({
                                     searchParams,
                                   }: {
  searchParams: { query?: string; page?: string };
}) {
  const resolvedSearchParams = await Promise.resolve(searchParams);
  return (
    <div>
      <h1>검색 결과</h1>
      <p>검색어: {resolvedSearchParams.query}</p>
      <p>페이지: {resolvedSearchParams.page || '1'}</p>
    </div>
  );
}