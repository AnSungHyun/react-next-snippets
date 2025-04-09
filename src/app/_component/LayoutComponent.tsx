
import React from 'react';
import {Box, AppBar, Toolbar, Typography, List, ListItem, Button} from '@mui/material';
import Link from 'next/link';


const LayoutComponent: React.FC<{ children: React.ReactNode }> = ({children}) => {
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        {/* 좌측 메뉴 */}
        <Box
          sx={{
            width: '20%',
            bgcolor: 'background.paper',
            borderRight: '1px solid lightgray',
            height: '100vh',
            padding: 2,
          }}
        >
          <Typography variant="h6">리스트</Typography>
          <List>
            <Link href="/snippets/1">
              <ListItem component={Button}>
                React.FC 기본 컴포넌트
              </ListItem>
            </Link>
            <Link href="/snippets/2">
              <ListItem component={Button}>
                일반 함수 기본 컴포넌트
              </ListItem>
            </Link>
            <Link href="/snippets/3">
              <ListItem component={Button}>
                기본 컴포넌트
              </ListItem>
            </Link>
          </List>
        </Box>

        {/* 우측 콘텐츠 */}
        <Box
          sx={{
            width: '80%',
            padding: 2,
          }}
        >
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6">내용</Typography>
            </Toolbar>
          </AppBar>
          <Box sx={{ marginTop: 2 }}>
            {children}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default LayoutComponent;