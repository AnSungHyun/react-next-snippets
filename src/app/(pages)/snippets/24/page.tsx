'use client';

import React, { Suspense, useState } from 'react';
import {
  Box,
  Button,
  CardActions,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton, Typography,
} from '@mui/material';
import ResultBlock from "@/app/_component/CodeResultBlock";
import Loading from "@/app/_component/Loading/Loading";
import UseAxiosClientComponent from "./UseAxiosClientComponent";
import CodeIcon from '@mui/icons-material/Code';
import CloseIcon from '@mui/icons-material/Close';
import CodeBlock from '@/app/_component/CodeBlock';
import CommonDialog from '@/app/_component/CommonDialog';


const TestPage24: React.FC = () => {
  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(!open);
  }

  return (
    <div>
      <Container>
        <p>- useAxios, intersection-observer 를 사용한 무한 스크롤 조회 구현</p>
        <p>
          - product[] 라는 배열 상태 값이 데이터를 add 하여 추가 조회되는
          상품들이 렌더링됨
        </p>
        <p>
          - product 상태 값이 바뀜에 따라 1번 부터 조회된 곳 까지 모든 상품이
          리렌더링 되는 문제가 있음
        </p>
        <p>
          - productList 컴포넌트 내의 productCard 컴포넌트를 React.memo 사용하여
          리렌더링 최소화
        </p>
        <p>
          - React.memo를 사용하지 않으면 추가 조회 할 때마다, 1번째부터
          n번째까지 모든 상품 영역이 리렌더링 되는 문제가 있음.
        </p>
        <CardActions sx={{ padding: 2 }}>
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
        </CardActions>
        <ResultBlock>
          <Suspense fallback={<Loading />}>
            <UseAxiosClientComponent />
          </Suspense>
        </ResultBlock>
        <CommonDialog open={open} onClose={handleOpen} title="코드 보기">
          <CodeBlock
            filename={'UseAxiosClientComponent.tsx'}
            value={
            "'use client';\n" +
              "\n" +
              "import React, { useEffect, useRef, useState } from 'react';\n" +
              "import {\n" +
              "  getProductsApiWithParam,\n" +
              "  ProductParams,\n" +
              "  ProductResponse,\n" +
              "  Product\n" +
              "\n" +
              "} from '@/app/_api/GetProduct';\n" +
              "import { useAxios } from '@/hooks/useAxios';\n" +
              "import Loading from '@/app/_component/Loading/Loading';\n" +
              "import { Divider } from '@mui/material';\n" +
              "import ProductList from '@/app/_component/ProductList';\n" +
              "import { useInView } from 'react-intersection-observer';\n" +
              "\n" +
              "\n" +
              "interface ProductRequestParams {\n" +
              "  limit: number;\n" +
              "  delay: number;\n" +
              "  sort: 'asc' | 'desc';\n" +
              "  skip?: number;\n" +
              "}\n" +
              "\n" +
              "const UseAxiosClientComponent: React.FC = () => {\n" +
              "  const {\n" +
              "    data: productResponse,\n" +
              "    loading: loading,\n" +
              "    error: error,\n" +
              "    execute: execute,\n" +
              "  } = useAxios<ProductResponse, ProductParams>((params) =>\n" +
              "    getProductsApiWithParam(params),\n" +
              "  );\n" +
              "\n" +
              "  // 페이징 관련 상태\n" +
              "  const [products, setProducts] = useState<Product[]>([]);\n" +
              "  const [hasMore, setHasMore] = useState(true);\n" +
              "  const [page, setPage] = useState(-1);\n" +
              "\n" +
              "  // 스크롤 관련 상태\n" +
              "  const { ref, inView } = useInView({\n" +
              "    threshold: 0.1,\n" +
              "  });\n" +
              "\n" +
              "  // 초기 값\n" +
              "  const [reqParam, setReqParam] = useState<ProductRequestParams>({\n" +
              "    limit: 3,\n" +
              "    delay: 1000,\n" +
              "    sort: 'desc',\n" +
              "    skip: 0,\n" +
              "  });\n" +
              "\n" +
              "  // data가 변경될 때마다 후처리 실행\n" +
              "  // 데이터 업데이트 처리\n" +
              "  useEffect(() => {\n" +
              "    if (productResponse) {\n" +
              "      // 새로운 제품들을 기존 제품 목록에 추가\n" +
              "      setProducts((prevProducts) => [\n" +
              "        ...prevProducts,\n" +
              "        ...productResponse.products,\n" +
              "      ]);\n" +
              "\n" +
              "      // 더 불러올 데이터가 있는지 확인\n" +
              "      setHasMore(\n" +
              "        productResponse.total > (reqParam.skip || 0) + productResponse.products.length\n" +
              "      );\n" +
              "    }\n" +
              "  }, [productResponse]);\n" +
              "\n" +
              "\n" +
              "  // 초기 데이터 로드\n" +
              "  // useEffect(() => {\n" +
              "  //   execute(reqParam);\n" +
              "  // }, []);\n" +
              "\n" +
              "  // 스크롤 감지 시 추가 데이터 로드\n" +
              "  useEffect(() => {\n" +
              "    if (inView && hasMore && !loading) {\n" +
              "      const nextPage = page + 1;\n" +
              "      const newSkip = nextPage * reqParam.limit;\n" +
              "      setPage(nextPage);\n" +
              "\n" +
              "      execute({\n" +
              "        ...reqParam,\n" +
              "        skip: newSkip,\n" +
              "      });\n" +
              "    }\n" +
              "  }, [inView]);\n" +
              "\n" +
              "\n" +
              "  return (\n" +
              "    <div>\n" +
              "      <Divider />\n" +
              "      {products.length} 개 상품 조회\n" +
              "      <ProductList products={products} />\n" +
              "\n" +
              "      <div ref={ref} style={{ height: '20px', margin: '20px 0' }}>\n" +
              "        {loading && <Loading />}\n" +
              "      </div>\n" +
              "\n" +
              "      {error && <>{error.toString()}</>}\n" +
              "\n" +
              "      {!hasMore && (\n" +
              "        <div style={{ textAlign: 'center', padding: '20px' }}>\n" +
              "          더 이상 불러올 상품이 없습니다.\n" +
              "        </div>\n" +
              "      )}\n" +
              "    </div>\n" +
              "  );\n" +
              "};\n" +
              "\n" +
              "export default UseAxiosClientComponent;\n"
            }
          />
        </CommonDialog>
      </Container>
    </div>
  );
};

export default TestPage24;