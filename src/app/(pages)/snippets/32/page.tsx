"use client"

import React, { useEffect, useState } from 'react';
import {Container} from "@mui/material";
import CodeBlock from "@/app/_component/CodeBlock";
import ResultBlock from '@/app/_component/CodeResultBlock';
import UseInfinityQueryClientComponent from './UseInfinityQueryClientComponent';
import Button from '@mui/material/Button';
import CodeIcon from '@mui/icons-material/Code';
import CommonDialog from "@/app/_component/CommonDialog";
import { InfiniteData, useMutation } from '@tanstack/react-query';
import { Product, ProductAddRequest, ProductResponse, putProductsApi } from '@/app/_api/GetProduct';
import { produce } from 'immer';
interface Props {
  title? :string;
  contents?: string;
  children: React.ReactNode;
}
const TestPage32: React.FC = ({}) => {
  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(!open);
  }
  return (
    <div>
      <Container>
        <p>
          - TanStack Query로 조회한 캐시 데이터에 Optimistic Update를 적용하는 방법.
        </p>
        <p>
          - 먼저 캐시 데이터를 변경하여, UI에 반영한 후 Update를 수행하는 방식입니다.
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
              "  // 상품 수정를 위한 mutation 정의\n" +
              "  const updateProductMutation = useMutation({\n" +
              "    mutationFn: async (product: ProductAddRequest) => {\n" +
              "      const { id, ...productWithoutId } = product;\n" +
              "\n" +
              "      // 2초 지연 추가\n" +
              "      await new Promise(resolve => setTimeout(resolve, 2000));\n" +
              "\n" +
              "      const response: Product = await putProductsApi(id!, productWithoutId);\n" +
              "      return response;\n" +
              "    },\n" +
              "    onMutate: async (newProduct: ProductAddRequest) => {\n" +
              "      await queryClient.cancelQueries({\n" +
              "        queryKey: ['products', { limit: reqParam.limit, sort: reqParam.sort }]\n" +
              "      });\n" +
              "\n" +
              "      const previousProducts = queryClient.getQueryData<InfiniteData<ProductResponse>>(\n" +
              "        ['products', { limit: reqParam.limit, sort: reqParam.sort }]\n" +
              "      );\n" +
              "\n" +
              "      // Optimistic update 적용 (즉시 UI 반영)\n" +
              "      // immer를 사용하지 않은 예시\n" +
              "      queryClient.setQueryData(\n" +
              "        ['products', { limit: reqParam.limit, sort: reqParam.sort }],\n" +
              "        (old: InfiniteData<ProductResponse> | undefined) => {\n" +
              "          if (!old?.pages) return old;\n" +
              "\n" +
              "          const optimisticProduct = {\n" +
              "            ...newProduct,\n" +
              "            availabilityStatus: \"In Stock\"\n" +
              "          };\n" +
              "\n" +
              "          const newPages = old.pages.map(page => ({\n" +
              "            ...page,\n" +
              "            products: page.products.map(product =>\n" +
              "              product.id === newProduct.id ? optimisticProduct : product\n" +
              "            )\n" +
              "          }));\n" +
              "\n" +
              "          return {\n" +
              "            ...old,\n" +
              "            pages: newPages\n" +
              "          };\n" +
              "        }\n" +
              "      );\n" +
              "\n" +
              "\n" +
              "      // immer 사용 예시\n" +
              "      queryClient.setQueryData(\n" +
              "        ['products', { limit: reqParam.limit, sort: reqParam.sort }],\n" +
              "        (old: InfiniteData<ProductResponse> | undefined) => {\n" +
              "          if (!old?.pages) return old;\n" +
              "\n" +
              "          return produce(old, draft => {\n" +
              "            const optimisticProduct = {\n" +
              "              ...newProduct,\n" +
              "              availabilityStatus: \"In Stock\"\n" +
              "            };\n" +
              "\n" +
              "            draft.pages.forEach(page => {\n" +
              "              page.products = page.products.map(product =>\n" +
              "                product.id === newProduct.id ? optimisticProduct as Product : product\n" +
              "              );\n" +
              "            });\n" +
              "          });\n" +
              "        }\n" +
              "      );\n" +
              "\n" +
              "      return { previousProducts };\n" +
              "    },\n" +
              "    onError: (err, newProduct, context) => {\n" +
              "      if (context?.previousProducts) {\n" +
              "        queryClient.setQueryData(\n" +
              "          ['products', { limit: reqParam.limit, sort: reqParam.sort }],\n" +
              "          context.previousProducts\n" +
              "        );\n" +
              "      }\n" +
              "      console.error(\"Mutation Error:\", err);\n" +
              "    },\n" +
              "    onSettled: (data, error, variables) => {\n" +
              "      console.log('Mutation이 완료됨:', {\n" +
              "        data,\n" +
              "        error,\n" +
              "        variables\n" +
              "      });\n" +
              "    }\n" +
              "  });"
            }  // 여기에 기존 코드 내용을 넣으세요
          />
        </CommonDialog>

      </Container>
    </div>
  );
};

export default TestPage32;