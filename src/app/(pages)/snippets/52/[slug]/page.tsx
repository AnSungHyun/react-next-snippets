// app/posts/[slug]/page.tsx
export default async function ProductPage({
                                   params,
                                   searchParams,
                                 }: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const slugParams = await Promise.resolve(params);
  const resolvedSearchParams = await Promise.resolve(searchParams);

  return (
    <div>
      <h1>상품 페이지</h1>

      <p>슬러그: {slugParams.slug}</p>
      <p>검색 파라미터: {JSON.stringify(resolvedSearchParams)}</p>
    </div>
  );
}