
import TestClient from "./TestClient";
import ProductStoreInitializer from "./ProductStoreInitializer";

async function getData() {
  const res = await fetch('https://dummyjson.com/products?delay=1000', {
    cache: 'no-store'
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const data = await res.json()
  return data.products
}

export default async function TestPage() {
  const initialData = await getData();

  return (
    <div>
      <ProductStoreInitializer products={initialData} />
      <TestClient />
    </div>
  );
}