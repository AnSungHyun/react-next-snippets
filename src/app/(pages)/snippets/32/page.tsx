"use client"

import React, { useEffect, useState } from 'react';
import {Container} from "@mui/material";
import CodeBlock from "@/app/_component/CodeBlock";
import ResultBlock from '@/app/_component/CodeResultBlock';
import UseInfinityQueryClientComponent from './UseInfinityQueryClientComponent';
import Button from '@mui/material/Button';
import CodeIcon from '@mui/icons-material/Code';
import CommonDialog from "@/app/_component/CommonDialog";
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
          <CodeBlock filename={"page.tsx"} value={""} />
          <CodeBlock
            filename={"UseInfinityQueryClientComponent.tsx"}
            value={
              ""
            }  // 여기에 기존 코드 내용을 넣으세요
          />
        </CommonDialog>

      </Container>
    </div>
  );
};

export default TestPage32;