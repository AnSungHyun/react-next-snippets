'use client'

import React, { FC, Suspense, useState } from 'react';

import { Button, Container } from '@mui/material';
import ResultBlock from "@/app/_component/CodeResultBlock";
import Loading from "@/app/_component/Loading/Loading";
import UseInfinityQueryClientComponent from './UseInfinityQueryClientComponent';
import CommonDialog from '@/app/_component/CommonDialog';
import CodeBlock from "@/app/_component/CodeBlock";
import CodeIcon from '@mui/icons-material/Code';

const TestPage25: React.FC = () => {
  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(!open);
  }
  return (
    <div>
      <Container>
        <p>
          - useInfinityQuery, intersection-observer 를 사용한 무한 스크롤 조회 구현
        </p>
        <p>
          - tanstack query 에서 data에 다음 fetch 데이터를 add 해줌
        </p>
        <p>
          - default로 cache가 적용되어 있어서 페이지 이동, history back 동작 시 캐시 데이터 사용
        </p>
        <p>
          - 캐시데이터 사용으로 history back 시에 scroll 이 유지됨
        </p>
        <p>
          - 의문 : 다른 페이지 방문 후, 재방문 시에도 scroll 및 fetch 데이터가 유지되는데,, 맞나?
        </p>
        <p>
          -     : ex) 5페이지까지 조회한 상태에서 다른 페이지 방문 후 다시 접속하면 5페이지까지 데이터가 남아있음.
        </p>
        <div style={{ padding: 2 }}>
          <Button
            startIcon={<CodeIcon />}
            onClick={() => handleOpen()}
            variant="contained"
            color="primary"
            sx={{
              borderRadius: '8px',
              textTransform: 'none',
            }}
          >
            코드 보기
          </Button>
        </div>
        <ResultBlock>
          <Suspense fallback={<Loading/>}>
            <UseInfinityQueryClientComponent />
          </Suspense>
        </ResultBlock>
        <CommonDialog open={open} onClose={handleOpen} title="코드 보기">
          <CodeBlock
            filename={'UseAxiosClientComponent.tsx'}
            value={
              "'use client';\n" +
              "\n" +
              "import React, { useState } from 'react';\n" +
              "import {\n" +
              "  getProductsApiWithParam,\n" +
              "  ProductParams,\n" +
              "  ProductResponse,\n" +
              "  Product\n" +
              "} from '@/app/_api/GetProduct';\n" +
              "import Loading from '@/app/_component/Loading/Loading';\n" +
              "import { Button, Divider } from '@mui/material';\n" +
              "import ProductList from '@/app/_component/ProductList';\n" +
              "import { useInView } from 'react-intersection-observer';\n" +
              "import { useInfiniteQuery } from '@tanstack/react-query';\n" +
              "import { useRouter } from 'next/navigation';\n" +
              "\n" +
              "interface ProductRequestParams {\n" +
              "  limit: number;\n" +
              "  delay: number;\n" +
              "  sort: 'asc' | 'desc';\n" +
              "  skip?: number;\n" +
              "}\n" +
              "\n" +
              "const UseQueryClientComponent: React.FC = () => {\n" +
              "  const router = useRouter();\n" +
              "\n" +
              "  const { ref, inView } = useInView({\n" +
              "    threshold: 0.1,\n" +
              "  });\n" +
              "  // 초기 값\n" +
              "  const [reqParam, setReqParam] = useState<ProductRequestParams>({\n" +
              "    limit: 3,\n" +
              "    delay: 1000,\n" +
              "    sort: 'desc',\n" +
              "    skip: 0,\n" +
              "  });\n" +
              "\n" +
              "  const {\n" +
              "    data,\n" +
              "    isLoading,\n" +
              "    isError,\n" +
              "    error,\n" +
              "    hasNextPage,\n" +
              "    fetchNextPage,\n" +
              "    isFetchingNextPage\n" +
              "  } = useInfiniteQuery({\n" +
              "    queryKey: ['products', { limit: reqParam.limit, sort: reqParam.sort } ],\n" +
              "    queryFn: async ({ pageParam = 0 }) => {\n" +
              "      const response = await getProductsApiWithParam({\n" +
              "        ...reqParam,\n" +
              "        skip: pageParam * reqParam.limit,\n" +
              "      });\n" +
              "      return response;\n" +
              "    },\n" +
              "    getNextPageParam: (lastPage, allPages) => {\n" +
              "      const currentCount = allPages.reduce(\n" +
              "        (total, page) => total + page.products.length,\n" +
              "        0,\n" +
              "      );\n" +
              "      return lastPage.total > currentCount ? allPages.length : undefined;\n" +
              "    },\n" +
              "    initialPageParam: 0,\n" +
              "    staleTime: 10000,\n" +
              "  });\n" +
              "\n" +
              "  // 스크롤 감지 시 추가 데이터 로드\n" +
              "  React.useEffect(() => {\n" +
              "    if (inView && hasNextPage && !isFetchingNextPage) {\n" +
              "      fetchNextPage();\n" +
              "    }\n" +
              "  }, [inView]);\n" +
              "  // }, [inView, hasNextPage, isFetchingNextPage]);\n" +
              "\n" +
              "  // 모든 제품을 하나의 배열로 합치기\n" +
              "  const products = data?.pages.flatMap(page => page.products) ?? [];\n" +
              "\n" +
              "  return (\n" +
              "    <div>\n" +
              "      <Divider />\n" +
              "      {products.length} 개 상품 조회\n" +
              "      <ProductList products={products} />\n" +
              "\n" +
              "      <div ref={ref} style={{ height: '20px', margin: '20px 0' }}>\n" +
              "        {(isLoading || isFetchingNextPage) && <Loading />}\n" +
              "      </div>\n" +
              "\n" +
              "      {isError && <>{error.toString()}</>}\n" +
              "\n" +
              "      {!hasNextPage && (\n" +
              "        <div style={{ textAlign: 'center', padding: '20px' }}>\n" +
              "          더 이상 불러올 상품이 없습니다.\n" +
              "        </div>\n" +
              "      )}\n" +
              "    </div>\n" +
              "  );\n" +
              "};\n" +
              "\n" +
              "export default UseQueryClientComponent;"
            }
          />
        </CommonDialog>
      </Container>
    </div>
  );
};

export default TestPage25;