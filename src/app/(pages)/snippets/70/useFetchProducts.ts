
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

interface ApiResponse {
  products: any[];
  total: number;
  skip: number;
  limit: number;
}

export const useFetchProducts = (debounceMs: number = 500) => {
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState<ApiResponse | null>(null);

  const fetchProducts = useDebouncedCallback(
    async (): Promise<void> => {
      try {
        setIsLoading(true);
        const response = await fetch('https://dummyjsonn.com/products?delay=1000', {
          cache: 'no-store'
        });

        if (!response.ok) {
          throw new Error('데이터 요청 실패');
        }
        const data = await response.json();
        setResponse(data);

        // return data;
      } catch (e){
        const errRes: ApiResponse = {
          products: [],
          total: 0,
          skip: 0,
          limit: 0
        }
        setResponse(errRes);
      } finally {
        setIsLoading(false);
      }
    },
    debounceMs
  );

  return {
    isLoading,
    response,
    fetchProducts
  };
};