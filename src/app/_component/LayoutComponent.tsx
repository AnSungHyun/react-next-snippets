"use client"

import React from 'react';
import { Box, AppBar, Toolbar, Typography, List, ListItem, Button } from '@mui/material';
import Link from 'next/link';
import {usePathname} from "next/navigation";

// 메뉴 항목 리스트를 컴포넌트 외부로 분리
const menuItems = [
  { path: '/snippets/1', label: 'React.FC 기본 컴포넌트' },
  { path: '/snippets/2', label: '일반 함수 기본 컴포넌트' },
  { path: '/snippets/3', label: '기본 컴포넌트' },
];

const LayoutComponent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname(); // 현재 경로 가져오기

  // 선택된 메뉴 스타일링 함수
  const getItemStyles = (path: string) => ({
    backgroundColor: pathname === path ? 'lightblue' : 'inherit',
    color: pathname === path ? 'white' : 'inherit',
  });


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
              <ListItem component={Button} sx={{ ...getItemStyles(item.path),textTransform: 'none'}}>
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
        <Box sx={{ marginTop: 2 }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default LayoutComponent;
