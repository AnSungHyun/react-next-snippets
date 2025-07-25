'use client'

import React, { useState } from 'react';
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle, Divider,
} from '@mui/material';
import ResultBlock from "@/app/_component/CodeResultBlock";
// import { useNavigationGuard } from 'next-navigation-guard';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CodeBlock from '@/app/_component/CodeBlock';

type NavigationType = 'back' | 'forward' | 'refresh' | 'push';
interface HandleNavigationProps {
  type: NavigationType;
}


const TestPage26: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<(() => void) | null>(null);

  // 페이지 이동 가드 설정
  // useNavigationGuard({
  //   enabled: true,
  //   confirm: () =>
  //     // window.confirm('저장하지 않은 정보가 있습니다. 그래도 진행 하시겠습니까?'),
  //   {
  //     return new Promise((resolve) => {
  //       setDialogOpen(true);
  //       setPendingNavigation(() => () => resolve(true));
  //     });
  //   }
  // });

  const handleCancel = () => {
    setDialogOpen(false);
    setPendingNavigation(null);
  };

  const handleConfirm = () => {
    setDialogOpen(false);
    if (pendingNavigation) {
      pendingNavigation();
      setPendingNavigation(null);
    }
  };

  const router = useRouter();
  const handleClick = () => {
    router.push('/snippets/1');
  }

  const handleNavigation = ({ type }: HandleNavigationProps): void => {
      switch (type) {
        case 'back':
          router.back();
          break;
        case 'forward':
          router.forward();
          break;
        case 'refresh':
          router.refresh();
          break;
        default:
          break;
      }
  }

    return (
      <div>
        <Container>
          <h1>네비게이션 가드 테스트</h1>
          <p>
            - 페이지 이동 시 confirm 창을 띄워 페이지 이탈 방지 기능을 테스트합니다.
          </p>
          <p>
            - /app/layout.tsx 에서 NavigationGuardProvider 를 사용하여 네비게이션 가드를 설정합니다.
          </p>
          <button onClick={handleClick}> onClick 링크</button>
          <Divider />
          <Link href="/snippets/1"><button>링크Link(적용 안됨)</button></Link>
          <Divider />
          <CustomLink href={'/snippets/1'}><button>링크CustomLink</button></CustomLink>
          <Divider />
          <button onClick={() => handleNavigation({ type: 'back' })}>
            {' '}
            뒤로가기
          </button>
          <button onClick={() => handleNavigation({ type: 'forward' })}>
            {' '}
            앞으로가기
          </button>
          <button onClick={() => handleNavigation({ type: 'refresh' })}>
            {' '}
            새로고침
          </button>
          <ResultBlock>
            <div style={{ padding: '20px' }}>
              <h3>페이지 이탈 방지 가능한 동작</h3>
              <ul>
                <li>브라우저 뒤로가기/앞으로가기 ( 가능 )</li>
                <li>페이지 새로고침 ( 가능 )</li>
                <li>브라우저 탭/창 닫기 ( 가능, browser 기본 메세지 )</li>
                <li>Link ( 동작 X )</li>
                <li>CustomLink ( 동작 O )</li>
              </ul>
              <p>위 동작 시 confirm 창이 표시됩니다.</p>
            </div>
          </ResultBlock>
          <CodeBlock filename={"app/layout.tsx"} value={
            "export default function RootLayout({\n" +
            "  children,\n" +
            "}: Readonly<{\n" +
            "  children: React.ReactNode;\n" +
            "}>) {\n" +
            "  return (\n" +
            "    <html lang=\"ko\">\n" +
            "      <body className={`${geistSans.variable} ${geistMono.variable}`}>\n" +
            "        <NavigationGuardProvider>{children}</NavigationGuardProvider>\n" +
            "      </body>\n" +
            "    </html>\n" +
            "  );\n" +
            "}\n"
          }/>
        </Container>

        {/* MUI Dialog */}
        <Dialog
          open={dialogOpen}
          onClose={handleCancel}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {'페이지 이동 확인'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              저장하지 않은 정보가 있습니다. 그래도 진행 하시겠습니까?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel} color="primary">
              취소
            </Button>
            <Button onClick={handleConfirm} color="primary" autoFocus>
              확인
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
};

export default TestPage26;

const CustomLink = ({ href, children }) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a href={href} onClick={handleClick}>
      {children}
    </a>
  );
};