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
const TestPage29: React.FC = ({}) => {
  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(!open);
  }
  return (
    <div>
      <Container>
        <p>
          - TanStack Query로 조회한 캐시 데이터에 useMutation으로 데이터 삭제하기
        </p>
        <p>
          - DELETE 요청 수행 후 cache 데이터에서 해당 데이터 찾아서 삭제처리.
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
        <CommonDialog
          open={open}
          onClose={handleOpen}
          title="코드 보기"
        >
          <CodeBlock
            filename={"UseInfinityQueryClientComponent.tsx"}
            value={
            "  // 상품 삭제를 위한 mutation 정의\n" +
              "  const deleteProductMutation = useMutation({\n" +
              "    mutationFn: async (product: ProductAddRequest) => {\n" +
              "      // API 호출 구현 필요\n" +
              "      const { id, ...productWithoutId } = product;\n" +
              "      console.log(\"mutationFn: \");\n" +
              "\n" +
              "      const response:Product = await deleteProductsApi(id!, productWithoutId);\n" +
              "      console.log(response);\n" +
              "      return response;\n" +
              "    },\n" +
              "    onSuccess: (deletedProduct:Product) => {\n" +
              "      console.log(\"onSuccess: \", deletedProduct);\n" +
              "      try {\n" +
              "        // immer 사용하지 않은 예시\n" +
              "        queryClient.setQueryData(\n" +
              "          ['products', { limit: reqParam.limit, sort: reqParam.sort }],\n" +
              "          (oldData: InfiniteData<ProductResponse>) => {\n" +
              "            if (!oldData?.pages) return oldData;\n" +
              "\n" +
              "            deletedProduct.availabilityStatus = \"In Stock\";\n" +
              "\n" +
              "            return {\n" +
              "              ...oldData,\n" +
              "              pages: oldData.pages\n" +
              "                .map(page => ({\n" +
              "                  ...page,\n" +
              "                  products: page.products.filter(product => product.id !== deletedProduct.id)\n" +
              "                }))\n" +
              "                .filter(page => page.products.length > 0) // 빈 페이지 제거\n" +
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
              "              deletedProduct.availabilityStatus = \"In Stock\";\n" +
              "\n" +
              "              // 각 페이지에서 삭제된 상품 제거\n" +
              "              draft.pages.forEach(page => {\n" +
              "                page.products = page.products.filter(\n" +
              "                  product => product.id !== deletedProduct.id\n" +
              "                );\n" +
              "              });\n" +
              "\n" +
              "              // 빈 페이지 제거\n" +
              "              draft.pages = draft.pages.filter(page => page.products.length > 0);\n" +
              "            })\n" +
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
          <CodeBlock filename={"GetProduct.tsx"} value={"" +
            "// 상품 삭제\n" +
            "export const deleteProductsApi = (\n" +
            "  productId: number,\n" +
            "  data: ProductAddRequest,\n" +
            "): Promise<Product> => {\n" +
            "  return commonAxios.delete({ url: `/products/${productId}`, data: data });\n" +
            "};"
          } />
        </CommonDialog>

      </Container>
    </div>
  );
};

export default TestPage29;