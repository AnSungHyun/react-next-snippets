'use client'

import React, {useEffect, useRef} from 'react';
import { Box, AppBar, Toolbar, Typography, List, ListItem, Button } from '@mui/material';
import Link from 'next/link';
import {usePathname} from "next/navigation";
import RQProvider from "@/app/_provider/RQProvider";
import TitleComponent from './TitleComponent';
import useTitleStore from "@/app/_store/useTitleStore";

// 메뉴 항목 리스트를 컴포넌트 외부로 분리
const menuItems = [
  { path: '/snippets/1', label: 'React.FC 기본 컴포넌트' },
  { path: '/snippets/2', label: '일반 함수, 화살표 함수 기본 컴포넌트' },
  { path: '/snippets/3', label: 'Server 컴포넌트에서 Client Import' },
  { path: '/snippets/4', label: 'Client 컴포넌트에서 Server Import(불가)' },
  { path: '/snippets/5', label: 'Client 컴포넌트에서 Server Import(가능)' },
  { path: '/snippets/6', label: 'Client 컴포넌트에서 Server Action 사용' },
  { path: '/snippets/7', label: 'Zustand 사용 예시' },
  { path: '/snippets/8', label: 'zod + react-hook-form 사용 예시' },
  { path: '/snippets/9', label: 'zod + rhf 개별 검증' },
  { path: '/snippets/10', label: 'Server 컴포넌트 data fetch' },
  { path: '/snippets/11', label: 'Client 컴포넌트 data fetch' },
  { path: '/snippets/12', label: 'Server 컴포넌트 Suspense' },
  { path: '/snippets/13', label: 'Client 컴포넌트 Suspense' },
  { path: '/snippets/14', label: 'Client 컴포넌트를 서버 컴포넌트로 감싸서 구현하기' },
  { path: '/snippets/15', label: '[TanStack] prefetchQuery, useQuery 사용하기' },
  { path: '/snippets/16', label: '[TanStack] prefetchQuery 중복 호출 staleTime 확인' },
  { path: '/snippets/17', label: '[TanStack] HydrateBoundary 영역 테스트' },
  { path: '/snippets/18', label: '[TanStack] prefetchQuery, useQuery 정상 동작 구현' },
  { path: '/snippets/19', label: '[Error Boundary] Client Comp 에러 구현' },
  { path: '/snippets/20', label: '[Error Boundary] Server Comp 에러 구현' },
  { path: '/snippets/21', label: '[Error Boundary] Client Comp fetch 에러 구현' },
  { path: '/snippets/22', label: '[Error Boundary] Server Comp fetch 에러 구현' },
  { path: '/snippets/23', label: '[useAxios] axios 공통 모듈 구현' },
  { path: '/snippets/24', label: '[useAxios] axios intersection observer' },
  { path: '/snippets/25', label: '[TanStack] useInfinityQuery intersection observer' },
  { path: '/snippets/26', label: '[router] navigation guard' },
  { path: '/snippets/27', label: '[TanStack] useMutation 상품 추가' },
  { path: '/snippets/28', label: '[TanStack] useMutation 상품 수정' },
  { path: '/snippets/29', label: '[TanStack] useMutation 상품 삭제' },
  { path: '/snippets/30', label: '[immer] 예시 코드' },
  { path: '/snippets/31', label: '[Axios] Fetch API 캐시 사용 예시' },
  { path: '/snippets/32', label: '[TanStack] Optimistic Update' },
  { path: '/snippets/33', label: '[SessionStorage] 세션 저장소 ' },
  { path: '/snippets/34', label: '[Cookie] 쿠키 정보 핸들링' },
  { path: '/snippets/35', label: '[LocalStorage] LocalStorage 저장소' },
  { path: '/snippets/36', label: '[i18n] 다국어 처리, 공통 메세지 처리' },
  { path: '/snippets/37', label: '[dayjs] DateUtils 날짜 핸들링' },
  { path: '/snippets/38', label: '[새로고침] pull to refresh(미구현)' },
  { path: '/snippets/39', label: '[동영상] player(미구현)' },
  { path: '/snippets/40', label: '[useAxios] POST, PUT, DELETE 요청' },
  { path: '/snippets/41', label: '[useAxios] GET 요청 + Fetch API 캐시 사용' },
  { path: '/snippets/42', label: '[axios] blob 파일 업로드(미구현)' },
  { path: '/snippets/43', label: '[axios] blob 파일 다운로드(미구현)' },
  { path: '/snippets/44', label: '[jest] 테스트 코드 작성(정상)' },
  { path: '/snippets/45', label: '[jest] 테스트 코드 작성(에러)' },
  { path: '/snippets/46', label: '[code splitting, lazy] 컴포넌트 동적 import(tab)' },
  { path: '/snippets/47', label: '[next/dynamic] 컴포넌트 지연 로딩(tab)' },
  { path: '/snippets/48', label: '[await import] 컴포넌트 지연 로딩(scroll)' },
  { path: '/snippets/49', label: '[await import,tanstack] 컴포넌트 지연 로딩(scroll)' },
  { path: '/snippets/50', label: '[email] email 발송용 템플릿' },
  { path: '/snippets/51', label: '[meta,SEO] 메타데이터 설정' },
  { path: '/snippets/52', label: '[pathname,searchParams] url 관련 값 사용' },
  { path: '/snippets/53', label: '[await import,tanstack] 컴포넌트 지연 로딩(scroll) 2' },
  { path: '/snippets/54', label: '[await import,tanstack] 컴포넌트 지연 로딩(scroll) 3' },
  { path: '/snippets/55', label: '[kakao, toss] 결제 모듈 연동(미구현)' },
  { path: '/snippets/56', label: '[SSG] Static Site Generation 예시(미구현)' },
  { path: '/snippets/57', label: '[SSE] Server Sent Event 예시(미구현)' },
  { path: '/snippets/58', label: '[swiper, tab] 메인 페이지 tab swiper 예시(미구현)' },
  { path: '/snippets/59', label: '재귀 컴포넌트 예시' },
  { path: '/snippets/60', label: 'Shadow Dom 을 사용한 CSS 격리' },
  { path: '/snippets/61', label: 'Shadow Dom 을 사용한 외부 Service 렌더링(미구현)' },
  { path: '/snippets/62', label: 'library 패키징 및 배포 후 import 예시 구현(미구현)' },
  { path: '/snippets/63', label: 'use-debounce 를 활용한 검색 (미구현)' },
  { path: '/snippets/64', label: '로그인 토큰 발급, 사용자 조회, 리프레시 토큰 발급' },
  { path: '/snippets/65', label: '외부 로그인 연동 구현' },
  { path: '/snippets/66', label: 'useCart, useCartStore 로 장바구니 상품 관리' },
  { path: '/snippets/67', label: 'Request Memoization 테스트' },
  { path: '/snippets/68', label: 'UserAgent 로 PC, Mobile, APP 검증하기' },
  { path: '/snippets/69', label: 'Zustand 사용한 SSR 구현하기' },
];

const LayoutComponent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname(); // 현재 경로 가져오기
  const {menuTitle, setMenuTitle} = useTitleStore();
  const menuRef = useRef<HTMLButtonElement | null>(null);

  // 선택된 메뉴 스타일링 함수
  const getItemStyles = (path: string) => ({
    backgroundColor: pathname === path ? 'lightblue' : 'inherit',
    color: pathname === path ? 'white' : 'inherit',
  });

  // const handleClick = (path: string) => {
  //   setMenuTitle(path); // Zustand 스토어에 현재 경로 설정
  // };
  useEffect(() => {
    if (menuRef.current) {
      // 선택된 메뉴 항목으로 스크롤
      menuRef.current.scrollIntoView({ behavior: 'auto', block: 'center' });
    }

    const menuItem = menuItems.find(item => item.path === pathname);
    setMenuTitle(menuItem?.label);
  }, [pathname]);

  useEffect(() => {
    if(menuTitle === "") {
      const currentMenu = menuItems.find((item) => item.path === pathname);
      if (currentMenu) {
        setMenuTitle(currentMenu.label); // 초기 메뉴 제목 설정
      }
    }
  }, []);

  return (
    <Box sx={{ display: 'flex' }} >
       {/*좌측 메뉴*/}
      <Box
        sx={{
          width: '20%',
          borderRight: '1px solid lightgray',
          height: '100vh',
          padding: 2,
          position: 'fixed', // 메뉴를 fixed로 설정
        }}
      >
        <Typography variant="h6">리스트</Typography>
        <Box sx={{
          height: 'calc(100vh - 80px)', // 제목 영역을 제외한 높이
          overflowY: 'auto' // 메뉴 내용이 길 경우 스크롤
        }}>

        <List>
          {menuItems.map((item, index) => (
            <Link href={item.path} passHref key={item.path} >
              <ListItem component={Button} sx={{...getItemStyles(item.path), textTransform: 'none', fontSize: '15px'}}
                        // onClick={() => handleClick(item.label)}
                        ref={pathname === item.path ? menuRef : null}
              >
                {index+1}, {item.label}
              </ListItem>
            </Link>
          ))}
        </List>
      </Box>
      </Box>

      {/* 우측 콘텐츠 */}
      <Box
        sx={{
          width: '80%',
          padding: 2,
          marginLeft: '20%',
        }}
      >
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">내용</Typography>
          </Toolbar>
        </AppBar>
        <RQProvider>
          <Box sx={{ marginTop: 2 }}><TitleComponent/></Box>
          <Box sx={{ marginTop: 2 }}>{children}</Box>
        </RQProvider>
      </Box>
    </Box>
  );
};

export default LayoutComponent;
