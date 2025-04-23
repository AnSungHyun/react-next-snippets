'use client';

import React, { useEffect, useRef, useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  getErrorProductsApi,
  getProductsApiWithParam,
  ProductParams,
  ProductResponse,
} from '@/app/_api/GetProduct';
import { useAxios } from '@/hooks/useAxios';
import Loading from '@/app/_component/Loading/Loading';
import { Divider, Grid, Paper } from '@mui/material';
import Button from '@mui/material/Button';
import ProductList from '@/app/_component/ProductList';

const productParamsSchema = z.object({
  limit: z
    .number()
    .min(1, '최소 1개 이상 조회해야 합니다')
    .max(100, '최대 100개까지만 조회 가능합니다'),
  delay: z
    .number()
    .min(0, '지연 시간은 0 이상이어야 합니다')
    .max(5000, '최대 지연 시간은 5000ms입니다'),
  sort: z.enum(['asc', 'desc'], {
    required_error: '정렬 방식을 선택해주세요',
  }),
});

// TypeScript 타입 추론
type ProductRequestParams = z.infer<typeof productParamsSchema>;

// 공통 스타일
const inputStyle = {
  width: '100%',
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  fontSize: '16px',
  boxSizing: 'border-box' as const,
};

const labelStyle = {
  marginBottom: '8px',
  color: '#666',
  fontSize: '14px',
  display: 'block',
};

const errorStyle = {
  color: 'red',
  fontSize: '12px',
  marginTop: '4px',
  display: 'block',
};

const formGroupStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  alignItems: 'flex-start',
  width: '100%',
};

const UseAxiosClientComponent: React.FC = () => {
  const {
    data: productResponseError,
    loading: loadingError,
    error: errorError,
    execute: executeError,
    RefetchButton: RefetchButtonError,
  } = useAxios<ProductResponse>(() => getErrorProductsApi(), {
    button: {
      // 기본 텍스트
      text: '에러 요청 새로고침',
    },
  });

  const {
    data: productResponse,
    loading: loading,
    error: error,
    execute: execute,
    RefetchButton: RefetchButton,
  } = useAxios<ProductResponse, ProductParams>(
    (params) => getProductsApiWithParam(params),
    {
      button: {
        text: '정상 요청 새로고침',
      },
    },
  );

  // 초기 값
  const [reqParam, setReqParam] = useState<ProductRequestParams>({
    limit: 3,
    delay: 1000,
    sort: 'desc',
  });

  // React Hook Form 설정
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    register,
  } = useForm<ProductRequestParams>({
    resolver: zodResolver(productParamsSchema),
    defaultValues: reqParam,
    mode: 'onBlur',
  });

  // 버튼 클릭 핸들러
  const handleClick = () => {
    const formValues = {
      limit: Number(watch('limit')),
      delay: Number(watch('delay')),
      sort: watch('sort') as 'asc' | 'desc',
    };

    // Zod로 유효성 검사
    const result = productParamsSchema.safeParse(formValues);
    if (result.success) {
      execute(formValues);
    } else {
      // 유효성 검사 실패 시 에러 처리
      console.error('유효성 검사 실패:', result.error);
    }
  };

  const submitButtonRef = useRef<HTMLButtonElement>(null);

  // data가 변경될 때마다 후처리 실행
  useEffect(() => {
    if (productResponse) {
      // 데이터 후처리 로직
      console.log('데이터가 업데이트됨:', productResponse);
      // 추가 처리 작업
    }
  }, [productResponse]); // productResponse가 변경될 때마다 실행

  useEffect(() => {
    if (submitButtonRef.current) {
      submitButtonRef.current.click();
    }
  }, []);

  // 폼 제출 핸들러
  const onSubmit = (data) => {
    execute(data);
  };

  const limitValue = watch('limit');

  useEffect(() => {
    const formValues = watch();

    // 유효성 검사
    const result = productParamsSchema.safeParse(formValues);
    if (result.success) {
      execute(formValues);
    }
  }, [limitValue]);

  return (
    <div>
      <RefetchButton />
      <RefetchButtonError />
      <Divider />
      <Paper sx={{ p: 2, mb: 2 }}>
        <Grid container spacing={2}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>조회 개수 (Limit)</label>
            <input
              type="number"
              {...register('limit', { valueAsNumber: true })}
              style={{
                ...inputStyle,
                borderColor: errors.limit ? 'red' : '#ccc',
              }}
              min={1}
              max={100}
            />
            {errors.limit && (
              <span style={errorStyle}>{errors.limit.message}</span>
            )}
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>지연 시간 (ms)</label>
            <input
              type="number"
              {...register('delay', { valueAsNumber: true })}
              style={{
                ...inputStyle,
                borderColor: errors.delay ? 'red' : '#ccc',
              }}
            />
            {errors.delay && (
              <span style={errorStyle}>{errors.delay.message}</span>
            )}
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>정렬 방식</label>
            <select
              {...register('sort')}
              style={{
                ...inputStyle,
                borderColor: errors.sort ? 'red' : '#ccc',
              }}
            >
              <option value="asc">오름차순</option>
              <option value="desc">내림차순</option>
            </select>
            {errors.sort && (
              <span style={errorStyle}>{errors.sort.message}</span>
            )}
          </div>

          <Button
            ref={submitButtonRef}
            onClick={handleClick}
            variant="contained"
            color="primary"
            fullWidth
          >
            조회하기
          </Button>
        </Grid>
      </Paper>

      {loading && <Loading />}
      {!loading && productResponse && !error && (
        <>{JSON.stringify(productResponse, null, 2)}</>
      )}
      {error && <>{error.toString()}</>}
      <ProductList products={productResponse?.products ?? []} />
    </div>
  );
};

export default UseAxiosClientComponent;
