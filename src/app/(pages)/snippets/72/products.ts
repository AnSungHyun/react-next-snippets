// lib/products.ts
export type Product = {
  id: number;
  title: string;
  price: number;
  description?: string;
  thumbnail?: string;
};

export const productsQueryKey = ['products','cart'] as const;

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch('https://dummyjson.com/products?limit=10', {
    // 서버에서 Next.js 캐시를 끄고 항상 fresh한 데이터로 prefetch
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  const json = await res.json();

  console.log('api 요청 !! --- ', json);

  return json.products as Product[];
}