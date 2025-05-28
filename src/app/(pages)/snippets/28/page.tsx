"use client"

import React, { useEffect, useState } from 'react';
import { Button, Container } from '@mui/material';
import CodeBlock from "@/app/_component/CodeBlock";
import ResultBlock from '@/app/_component/CodeResultBlock';
import UseInfinityQueryClientComponent from './UseInfinityQueryClientComponent';
import CommonDialog from '@/app/_component/CommonDialog';
import CodeIcon from '@mui/icons-material/Code';
interface Props {
  title? :string;
  contents?: string;
  children: React.ReactNode;
}
const TestPage28: React.FC = ({}) => {
  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(!open);
  }
  return (
    <div>
      <Container>
        <p>
          - TanStack Query로 조회한 캐시 데이터에 useMutation으로 데이터 수정하기
        </p>
        <p>
          - PUT 요청 수행 후 cache 데이터에서 해당 데이터 찾아서 변경처리.
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
            "// 상품 수정를 위한 mutation 정의\n" +
              "  const updateProductMutation = useMutation({\n" +
              "    mutationFn: async (product: ProductAddRequest) => {\n" +
              "      // API 호출 구현 필요\n" +
              "      const { id, ...productWithoutId } = product;\n" +
              "      console.log(\"mutationFn: \");\n" +
              "\n" +
              "      const response:Product = await putProductsApi(id!, productWithoutId); // id! 느낌표는 null이 아님을 나타냄\n" +
              "      console.log(response);\n" +
              "      return response;\n" +
              "    },\n" +
              "    onSuccess: (updatedProduct:Product) => {\n" +
              "      console.log(\"onSuccess: \", updatedProduct);\n" +
              "      try {\n" +
              "        // immer 사용하지 않은 예시\n" +
              "        queryClient.setQueryData(\n" +
              "          ['products', { limit: reqParam.limit, sort: reqParam.sort }],\n" +
              "          (oldData: InfiniteData<ProductResponse>) => {\n" +
              "            if (!oldData?.pages) return oldData;\n" +
              "\n" +
              "            updatedProduct.availabilityStatus = \"In Stock\";\n" +
              "\n" +
              "            return {\n" +
              "              ...oldData,\n" +
              "              pages: oldData.pages.map(page => ({\n" +
              "                ...page,\n" +
              "                products: page.products.map(product =>\n" +
              "                  product.id === updatedProduct.id ? updatedProduct : product\n" +
              "                )\n" +
              "              }))\n" +
              "            };\n" +
              "          }\n" +
              "        );\n" +
              "\n" +
              "        // immer 사용한 예시\n" +
              "        queryClient.setQueryData(\n" +
              "          ['products', { limit: reqParam.limit, sort: reqParam.sort }],\n" +
              "          (oldData: InfiniteData<ProductResponse>) =>\n" +
              "            produce(oldData, draft => {\n" +
              "              if (!draft?.pages) return;\n" +
              "\n" +
              "              updatedProduct.availabilityStatus = \"In Stock\";\n" +
              "\n" +
              "              draft.pages.forEach(page => {\n" +
              "                const productIndex = page.products.findIndex(\n" +
              "                  product => product.id === updatedProduct.id\n" +
              "                );\n" +
              "                if (productIndex !== -1) {\n" +
              "                  page.products[productIndex] = updatedProduct;\n" +
              "                }\n" +
              "              });\n" +
              "            })\n" +
              "        );\n" +
              "\n" +
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
            "// 상품 수정\n" +
            "export const putProductsApi = (\n" +
            "  productId: number,\n" +
            "  data: ProductAddRequest,\n" +
            "): Promise<Product> => {\n" +
            "  return commonAxios.put({ url: `/products/${productId}`, data: data });\n" +
            "};"
          }></CodeBlock>
        </CommonDialog>
      </Container>
    </div>
  );
};

export default TestPage28;