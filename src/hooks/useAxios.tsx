// hooks/useAxios.ts
import {useState, useEffect, useCallback, JSX} from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

interface UseAxiosResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  reset: () => void;
  RefetchButton: () => JSX.Element;
}

export function useAxios<T>(
  axiosFunc: () => Promise<T>,
  immediate = true
): UseAxiosResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosFunc();
      setData(response);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errorMessage = `${err.message} (URL: ${err.config?.url || '알 수 없는 URL'})`;
        setError(errorMessage);
      } else {
        setError('알 수 없는 오류가 발생했습니다.');
      }
      // throw err; // ErrorBoundary로 에러 전파
    } finally {
      setLoading(false);
    }
  };

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  // 재사용 가능한 리페치 버튼 컴포넌트
  const RefetchButton = useCallback(() => (
    <Button
      variant="outlined"
      onClick={() => fetchData()}
      disabled={loading}
      sx={{ textTransform: 'none' }}
    >
      {loading ? '로딩 중...' : '새로고침'}
    </Button>
  ), [loading, fetchData]);

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  }, [immediate, fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    reset,
    RefetchButton
  };
}