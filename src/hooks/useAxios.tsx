// hooks/useAxios.ts
import { useState, useCallback, JSX } from 'react';
import axios from 'axios';
import { Button, ButtonProps } from '@mui/material';

interface ButtonOptions extends Partial<ButtonProps> {
  loadingText?: string;
  text?: string;
}

interface UseAxiosOptions {
  button?: ButtonOptions;
}

interface UseAxiosResult<TData, TParams> {
  data: TData | null;
  loading: boolean;
  error: string | null;
  execute: (params?: TParams) => Promise<void>;
  refetch: () => Promise<void>;
  reset: () => void;
  RefetchButton: () => JSX.Element;
}

export function useAxios<TData, TParams = void>(
  apiFunction: (params?: TParams) => Promise<TData>,
  options?: UseAxiosOptions
): UseAxiosResult<TData, TParams> {
  const [data, setData] = useState<TData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [params, setParams] = useState<TParams | undefined>();

  const defaultButtonOptions: ButtonOptions = {
    variant: 'outlined',
    text: '새로고침',
    loadingText: '요청 중...',
    sx: { textTransform: 'none' }
  };

  const buttonOptions = {
    ...defaultButtonOptions,
    ...options?.button
  };

  const execute = useCallback(async (params?: TParams) => {
    try {
      setLoading(true);
      setError(null);
      setParams(params);
      const response = await apiFunction(params);
      setData(response);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errorMessage = `${err.message} (URL: ${err.config?.url || '알 수 없는 URL'})`;
        setError(errorMessage);
        // throw err;
      } else {
        const errorMessage = '알 수 없는 오류가 발생했습니다.';
        setError(errorMessage);
        // throw new Error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  }, [apiFunction]);

  const refetch = useCallback(() => {
    return execute(params);
  }, [execute, params]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
    setParams(undefined);
  }, []);

  const { loadingText, ...restButtonOptions } = buttonOptions;

  const RefetchButton = useCallback(() => (
    <Button
      {...restButtonOptions}
      onClick={refetch}
      disabled={loading}
    >
      {loading ? loadingText : buttonOptions.text}
    </Button>
  ), [loading, refetch, buttonOptions]);

  return {
    data,
    loading,
    error,
    execute,
    refetch,
    reset,
    RefetchButton
  };
}