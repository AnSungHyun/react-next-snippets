import React, {Suspense} from "react";
import {Container} from "@mui/material";
import ResultBlock from "@/app/_component/CodeResultBlock";
import Loading from "@/app/_component/Loading/Loading";
import UseAxiosClientComponent from '@/app/(pages)/snippets/23/UseAxiosClientComponent';
import CodeBlock from '@/app/_component/CodeBlock';

const TestPage23: React.FC = () => {

  return (
    <div>
      <Container>
        <p>
          - useAxios.tsx 를 구현 및 사용하여 중복되는 loading, error 관련 코드를 줄일 수 있음.
        </p>
        <p>
          - execute 를 통해 동적으로 실행 가능.
        </p>
        <p>
          - commonAxios.ts 를 구현하여 axios 의 공통 config ( url, method, param, data, request interceptor, response interceptor ) 설정을 구현함
        </p>
        <p>
          - useAxios.tsx 와 commonAxios를 통합 함으로써 API 요청의 중복 코드를 줄이고 일관성을 유지할 수 있음.
        </p>
        <p>
          - 이외에 GetProduct.ts 파일 처럼 API 요청 ( get, post, put, delete ) 을 위한 함수들을 별도로 모아서 관리할 수 있음.
        </p>
        <ResultBlock>
          <Suspense fallback={<Loading/>}>
            <UseAxiosClientComponent />
          </Suspense>
        </ResultBlock>
        <CodeBlock filename={"page.tsx"} value={
          "import React, {Suspense} from \"react\";\n" +
          "import {Container} from \"@mui/material\";\n" +
          "import ResultBlock from \"@/app/_component/CodeResultBlock\";\n" +
          "import Loading from \"@/app/_component/Loading/Loading\";\n" +
          "import UseAxiosClientComponent from '@/app/(pages)/snippets/23/UseAxiosClientComponent';\n" +
          "import CodeBlock from '@/app/_component/CodeBlock';\n" +
          "\n" +
          "const TestPage23: React.FC = () => {\n" +
          "\n" +
          "  return (\n" +
          "    <div>\n" +
          "      <Container>\n" +
          "        <ResultBlock>\n" +
          "          <Suspense fallback={<Loading/>}>\n" +
          "            <UseAxiosClientComponent />\n" +
          "          </Suspense>\n" +
          "        </ResultBlock>\n" +
          "      </Container>\n" +
          "    </div>\n" +
          "  );\n" +
          "};\n" +
          "\n" +
          "export default TestPage23;"
        }/>
        <CodeBlock filename={"UseAxiosClientComponent.tsx"} value={
          "'use client';\n" +
          "\n" +
          "import React, { useEffect, useRef, useState } from 'react';\n" +
          "import { z } from 'zod';\n" +
          "import { useForm } from 'react-hook-form';\n" +
          "import { zodResolver } from '@hookform/resolvers/zod';\n" +
          "import {\n" +
          "  getErrorProductsApi,\n" +
          "  getProductsApiWithParam,\n" +
          "  ProductParams,\n" +
          "  ProductResponse,\n" +
          "} from '@/app/_api/GetProduct';\n" +
          "import { useAxios } from '@/hooks/useAxios';\n" +
          "import Loading from '@/app/_component/Loading/Loading';\n" +
          "import { Divider, Grid, Paper } from '@mui/material';\n" +
          "import Button from '@mui/material/Button';\n" +
          "import ProductList from '@/app/_component/ProductList';\n" +
          "\n" +
          "const productParamsSchema = z.object({\n" +
          "  limit: z\n" +
          "    .number()\n" +
          "    .min(1, '최소 1개 이상 조회해야 합니다')\n" +
          "    .max(100, '최대 100개까지만 조회 가능합니다'),\n" +
          "  delay: z\n" +
          "    .number()\n" +
          "    .min(0, '지연 시간은 0 이상이어야 합니다')\n" +
          "    .max(5000, '최대 지연 시간은 5000ms입니다'),\n" +
          "  sort: z.enum(['asc', 'desc'], {\n" +
          "    required_error: '정렬 방식을 선택해주세요',\n" +
          "  }),\n" +
          "});\n" +
          "\n" +
          "// TypeScript 타입 추론\n" +
          "type ProductRequestParams = z.infer<typeof productParamsSchema>;\n" +
          "\n" +
          "// 공통 스타일\n" +
          "const inputStyle = {\n" +
          "  width: '100%',\n" +
          "  padding: '8px',\n" +
          "  borderRadius: '4px',\n" +
          "  border: '1px solid #ccc',\n" +
          "  fontSize: '16px',\n" +
          "  boxSizing: 'border-box' as const,\n" +
          "};\n" +
          "\n" +
          "const labelStyle = {\n" +
          "  marginBottom: '8px',\n" +
          "  color: '#666',\n" +
          "  fontSize: '14px',\n" +
          "  display: 'block',\n" +
          "};\n" +
          "\n" +
          "const errorStyle = {\n" +
          "  color: 'red',\n" +
          "  fontSize: '12px',\n" +
          "  marginTop: '4px',\n" +
          "  display: 'block',\n" +
          "};\n" +
          "\n" +
          "const formGroupStyle = {\n" +
          "  display: 'flex',\n" +
          "  flexDirection: 'column' as const,\n" +
          "  alignItems: 'flex-start',\n" +
          "  width: '100%',\n" +
          "};\n" +
          "\n" +
          "const UseAxiosClientComponent: React.FC = () => {\n" +
          "  const {\n" +
          "    data: productResponseError,\n" +
          "    loading: loadingError,\n" +
          "    error: errorError,\n" +
          "    execute: executeError,\n" +
          "    RefetchButton: RefetchButtonError,\n" +
          "  } = useAxios<ProductResponse>(() => getErrorProductsApi(), {\n" +
          "    button: {\n" +
          "      // 기본 텍스트\n" +
          "      text: '에러 요청 새로고침',\n" +
          "    },\n" +
          "  });\n" +
          "\n" +
          "  const {\n" +
          "    data: productResponse,\n" +
          "    loading: loading,\n" +
          "    error: error,\n" +
          "    execute: execute,\n" +
          "    RefetchButton: RefetchButton,\n" +
          "  } = useAxios<ProductResponse, ProductParams>(\n" +
          "    (params) => getProductsApiWithParam(params),\n" +
          "    {\n" +
          "      button: {\n" +
          "        text: '정상 요청 새로고침',\n" +
          "      },\n" +
          "    },\n" +
          "  );\n" +
          "\n" +
          "  // 초기 값\n" +
          "  const [reqParam, setReqParam] = useState<ProductRequestParams>({\n" +
          "    limit: 3,\n" +
          "    delay: 1000,\n" +
          "    sort: 'desc',\n" +
          "  });\n" +
          "\n" +
          "  // React Hook Form 설정\n" +
          "  const {\n" +
          "    control,\n" +
          "    handleSubmit,\n" +
          "    watch,\n" +
          "    formState: { errors },\n" +
          "    register,\n" +
          "  } = useForm<ProductRequestParams>({\n" +
          "    resolver: zodResolver(productParamsSchema),\n" +
          "    defaultValues: reqParam,\n" +
          "    mode: 'onBlur',\n" +
          "  });\n" +
          "\n" +
          "  // 버튼 클릭 핸들러\n" +
          "  const handleClick = () => {\n" +
          "    const formValues = {\n" +
          "      limit: Number(watch('limit')),\n" +
          "      delay: Number(watch('delay')),\n" +
          "      sort: watch('sort') as 'asc' | 'desc',\n" +
          "    };\n" +
          "\n" +
          "    // Zod로 유효성 검사\n" +
          "    const result = productParamsSchema.safeParse(formValues);\n" +
          "    if (result.success) {\n" +
          "      execute(formValues);\n" +
          "    } else {\n" +
          "      // 유효성 검사 실패 시 에러 처리\n" +
          "      console.error('유효성 검사 실패:', result.error);\n" +
          "    }\n" +
          "  };\n" +
          "\n" +
          "  const submitButtonRef = useRef<HTMLButtonElement>(null);\n" +
          "\n" +
          "  // data가 변경될 때마다 후처리 실행\n" +
          "  useEffect(() => {\n" +
          "    if (productResponse) {\n" +
          "      // 데이터 후처리 로직\n" +
          "      console.log('데이터가 업데이트됨:', productResponse);\n" +
          "      // 추가 처리 작업\n" +
          "    }\n" +
          "  }, [productResponse]); // productResponse가 변경될 때마다 실행\n" +
          "\n" +
          "  useEffect(() => {\n" +
          "    if (submitButtonRef.current) {\n" +
          "      submitButtonRef.current.click();\n" +
          "    }\n" +
          "  }, []);\n" +
          "\n" +
          "  // 폼 제출 핸들러\n" +
          "  const onSubmit = (data) => {\n" +
          "    execute(data);\n" +
          "  };\n" +
          "\n" +
          "  const limitValue = watch('limit');\n" +
          "\n" +
          "  useEffect(() => {\n" +
          "    const formValues = watch();\n" +
          "\n" +
          "    // 유효성 검사\n" +
          "    const result = productParamsSchema.safeParse(formValues);\n" +
          "    if (result.success) {\n" +
          "      execute(formValues);\n" +
          "    }\n" +
          "  }, [limitValue]);\n" +
          "\n" +
          "  return (\n" +
          "    <div>\n" +
          "      <RefetchButton />\n" +
          "      <RefetchButtonError />\n" +
          "      <Divider />\n" +
          "      <Paper sx={{ p: 2, mb: 2 }}>\n" +
          "        <Grid container spacing={2}>\n" +
          "          <div style={formGroupStyle}>\n" +
          "            <label style={labelStyle}>조회 개수 (Limit)</label>\n" +
          "            <input\n" +
          "              type=\"number\"\n" +
          "              {...register('limit', { valueAsNumber: true })}\n" +
          "              style={{\n" +
          "                ...inputStyle,\n" +
          "                borderColor: errors.limit ? 'red' : '#ccc',\n" +
          "              }}\n" +
          "              min={1}\n" +
          "              max={100}\n" +
          "            />\n" +
          "            {errors.limit && (\n" +
          "              <span style={errorStyle}>{errors.limit.message}</span>\n" +
          "            )}\n" +
          "          </div>\n" +
          "\n" +
          "          <div style={formGroupStyle}>\n" +
          "            <label style={labelStyle}>지연 시간 (ms)</label>\n" +
          "            <input\n" +
          "              type=\"number\"\n" +
          "              {...register('delay', { valueAsNumber: true })}\n" +
          "              style={{\n" +
          "                ...inputStyle,\n" +
          "                borderColor: errors.delay ? 'red' : '#ccc',\n" +
          "              }}\n" +
          "            />\n" +
          "            {errors.delay && (\n" +
          "              <span style={errorStyle}>{errors.delay.message}</span>\n" +
          "            )}\n" +
          "          </div>\n" +
          "\n" +
          "          <div style={formGroupStyle}>\n" +
          "            <label style={labelStyle}>정렬 방식</label>\n" +
          "            <select\n" +
          "              {...register('sort')}\n" +
          "              style={{\n" +
          "                ...inputStyle,\n" +
          "                borderColor: errors.sort ? 'red' : '#ccc',\n" +
          "              }}\n" +
          "            >\n" +
          "              <option value=\"asc\">오름차순</option>\n" +
          "              <option value=\"desc\">내림차순</option>\n" +
          "            </select>\n" +
          "            {errors.sort && (\n" +
          "              <span style={errorStyle}>{errors.sort.message}</span>\n" +
          "            )}\n" +
          "          </div>\n" +
          "\n" +
          "          <Button\n" +
          "            ref={submitButtonRef}\n" +
          "            onClick={handleClick}\n" +
          "            variant=\"contained\"\n" +
          "            color=\"primary\"\n" +
          "            fullWidth\n" +
          "          >\n" +
          "            조회하기\n" +
          "          </Button>\n" +
          "        </Grid>\n" +
          "      </Paper>\n" +
          "\n" +
          "      {loading && <Loading />}\n" +
          "      {!loading && productResponse && !error && (\n" +
          "        <>\n" +
          "          {JSON.stringify(productResponse, null, 2)}\n" +
          "          <ProductList products={productResponse?.products ?? []} />\n" +
          "        </>\n" +
          "      )}\n" +
          "      {error && <>{error.toString()}</>}\n" +
          "    </div>\n" +
          "  );\n" +
          "};\n" +
          "\n" +
          "export default UseAxiosClientComponent;\n"
        }/>
      </Container>
    </div>
  );
};

export default TestPage23;