"use client"

import React, { useEffect, useState } from 'react';
import { Button, Container } from '@mui/material';
import CodeBlock from "@/app/_component/CodeBlock";
import ResultBlock from '@/app/_component/CodeResultBlock';
import UseInfinityQueryClientComponent from './UseInfinityQueryClientComponent';
import CodeIcon from '@mui/icons-material/Code';
import CommonDialog from '@/app/_component/CommonDialog';
interface Props {
  title? :string;
  contents?: string;
  children: React.ReactNode;
}
const TestPage27: React.FC = ({}) => {
  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(!open);
  }
  return (
    <div>
      <Container>
        <p>
          - TanStack Query로 조회한 캐시 데이터에 useMutation으로 데이터 추가하기
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
          <UseInfinityQueryClientComponent />
        </ResultBlock>
        <CommonDialog open={open} onClose={handleOpen} title="코드 보기">
          <CodeBlock
            filename={'UseQueryClientComponent.tsx'}
            value={
              "  // 상품 추가를 위한 mutation 정의\n" +
              "  const addProductMutation = useMutation({\n" +
              "    mutationFn: async (product: ProductAddRequest) => {\n" +
              "      // API 호출 구현 필요\n" +
              "      console.log(\"mutationFn: \");\n" +
              "      const response:Product = await postProductsApi(product);\n" +
              "      console.log(response);\n" +
              "      return response;\n" +
              "    },\n" +
              "    onSuccess: (addedProduct:Product) => {\n" +
              "      try {\n" +
              "        // immer 사용하지 않은 예시\n" +
              "         queryClient.setQueryData(\n" +
              "           ['products', { limit: reqParam.limit, sort: reqParam.sort }],\n" +
              "           (oldData: InfiniteData<ProductResponse>) => {\n" +
              "             if (!oldData?.pages?.[0]?.products) return oldData;\n" +
              "        \n" +
              "             addedProduct.id = new Date().getTime();\n" +
              "             addedProduct.availabilityStatus = \"In Stock\";\n" +
              "        \n" +
              "             return {\n" +
              "               ...oldData,\n" +
              "               pages: [\n" +
              "                 {\n" +
              "                   ...oldData.pages[0],\n" +
              "                   products: [addedProduct, ...oldData.pages[0].products]\n" +
              "                 },\n" +
              "                 ...oldData.pages.slice(1)\n" +
              "               ]\n" +
              "             };\n" +
              "           }\n" +
              "         );\n" +
              "        // immer 사용한 예시\n" +
              "        queryClient.setQueryData(\n" +
              "          ['products', { limit: reqParam.limit, sort: reqParam.sort }],\n" +
              "          (oldData: InfiniteData<ProductResponse>) => {\n" +
              "            return produce(oldData, draft => {\n" +
              "              if (!draft?.pages?.[0]?.products) return;\n" +
              "\n" +
              "              // 새 상품 데이터 설정\n" +
              "              addedProduct.id = new Date().getTime();\n" +
              "              addedProduct.availabilityStatus = \"In Stock\";\n" +
              "\n" +
              "              // 첫 페이지의 상품 목록 앞에 새 상품 추가\n" +
              "              draft.pages[0].products.unshift(addedProduct);\n" +
              "            });\n" +
              "          }\n" +
              "        );\n" +
              "      } catch (error) {\n" +
              "        console.error('캐시 업데이트 중 오류:', error);\n" +
              "      }\n" +
              "    },\n" +
              "    onError: (error) => {\n" +
              "      console.error(\"Mutation Error:\", error); // 에러 확인\n" +
              "    }\n" +
              "  });"
            }
          />
          <CodeBlock filename={"GetProduct.ts"} value={
            "// 상품 추가\n" +
            "export const postProductsApi = (data: ProductAddRequest): Promise<Product> => {\n" +
            "  return commonAxios.post({ url: '/products/add', data: data });\n" +
            "};"
          }></CodeBlock>
        </CommonDialog>
      </Container>
    </div>
  );
};

export default TestPage27;