"use client"

import React, {useEffect} from 'react';
import { Box, AppBar, Toolbar, Typography, List, ListItem, Button } from '@mui/material';
import Link from 'next/link';
import {usePathname} from "next/navigation";
import RQProvider from "@/app/_provider/RQProvider";
import TitleComponent from './TitleComponent';
import useTitleStore from "@/app/_store/useTitleStore";

// 메뉴 항목 리스트를 컴포넌트 외부로 분리
const menuItems = [
  { path: '/snippets/1', label: 'React.FC 기본 컴포넌트' },
  { path: '/snippets/2', label: '일반 함수 기본 컴포넌트' },
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
  { path: '/snippets/14', label: 'Client 컴포넌트를 SSR 처럼 구현하기' },
  { path: '/snippets/15', label: '[TanStack] prefetchQuery, useQuery 사용하기' },
  { path: '/snippets/16', label: '[TanStack] prefetchQuery, useQuery 사용하기' },
];

const LayoutComponent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname(); // 현재 경로 가져오기
  const {menuTitle, setMenuTitle} = useTitleStore();

  // 선택된 메뉴 스타일링 함수
  const getItemStyles = (path: string) => ({
    backgroundColor: pathname === path ? 'lightblue' : 'inherit',
    color: pathname === path ? 'white' : 'inherit',
  });

  const handleClick = (path: string) => {
    setMenuTitle(path); // Zustand 스토어에 현재 경로 설정
  };

  useEffect(() => {
    if(menuTitle === "") {
      const currentMenu = menuItems.find(item => item.path === pathname);
      if (currentMenu) {
        setMenuTitle(currentMenu.label); // 초기 메뉴 제목 설정
      }
    }
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      {/* 좌측 메뉴 */}
      <Box
        sx={{
          width: '20%',
          borderRight: '1px solid lightgray',
          height: '100vh',
          padding: 2,
          overflowY: 'auto',
        }}
      >
        <Typography variant="h6">리스트</Typography>
        <List>
          {menuItems.map((item) => (
            <Link href={item.path} passHref key={item.path}>
              <ListItem component={Button} sx={{...getItemStyles(item.path), textTransform: 'none'}}
                        onClick={() => handleClick(item.label)}>
              {item.label}
              </ListItem>
            </Link>
          ))}
        </List>
      </Box>

      {/* 우측 콘텐츠 */}
      <Box
        sx={{
          width: '80%',
          padding: 2,
          height: '100vh',
          overflowY: 'auto',
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
