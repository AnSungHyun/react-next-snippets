// app/route-examples/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {
  Container,
  Typography,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  Card,
  CardContent,
  CardActions,
  Box,
  IconButton,
} from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import LinkIcon from '@mui/icons-material/Link';
import CloseIcon from '@mui/icons-material/Close';

const examples = {
  slug: {
    title: '동적 라우팅 (Slug)',
    description: '게시물 ID나 제품 ID와 같은 동적 값을 URL에 포함시킬 때 사용합니다.',
    code: `// app/posts/[slug]/page.tsx
export default function PostPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | undefined };
}) {
  return (
    <div>
      <h1>포스트 상세</h1>
      <p>슬러그: {params.slug}</p>
      <p>검색 파라미터: {JSON.stringify(searchParams)}</p>
    </div>
  );
}`,
    testUrls: [
      '/snippets/52/10000001?query=1234&sort=asc',
      '/snippets/52/10000002?query=1234&sort=asc',
      '/snippets/52/10000003?query=1234&sort=asc'
    ]
  },
  searchParams: {
    title: '검색 파라미터 예시',
    description: '페이지네이션, 필터링, 정렬 등에 사용되는 쿼리 파라미터를 처리합니다.',
    code: `// app/products/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  
  return (
    <div>
      <h1>상품 목록</h1>
      <p>카테고리: {searchParams.get('category')}</p>
      <p>정렬: {searchParams.get('sort')}</p>
      <p>페이지: {searchParams.get('page')}</p>
    </div>
  );
}`,
    testUrls: [
      '/snippets/52/searchParams?category=electronics&sort=price&page=1',
      '/snippets/52/searchParams?category=books&sort=date&page=2',
      '/snippets/52/searchParams?category=clothes&sort=name'
    ]
  },
  serverSearchParams: {
    title: '서버 컴포넌트 SearchParams',
    description: '서버 컴포넌트에서 직접 검색 파라미터를 받아 처리하는 방법입니다.',
    code: `// app/search/page.tsx
export default function SearchPage({
  searchParams,
}: {
  searchParams: { query?: string; page?: string };
}) {
  return (
    <div>
      <h1>검색 결과</h1>
      <p>검색어: {searchParams.query}</p>
      <p>페이지: {searchParams.page || '1'}</p>
    </div>
  );
}`,
    testUrls: [
      '/snippets/52/serverSearchParams?query=nextjs&page=1',
      '/snippets/52/serverSearchParams?query=react&page=2',
      '/snippets/52/serverSearchParams?query=typescript'
    ]
  }
};

export default function RouteExamplesPage() {
  const [selectedExample, setSelectedExample] = useState<keyof typeof examples | null>(null);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        Next.js 라우팅 예제
      </Typography>

      <Grid container spacing={3}>
        {Object.entries(examples).map(([key, example]) => (
          <Grid  key={key}>
            <Card elevation={2}>
              <CardContent>
                <Typography variant="h5" gutterBottom color="primary">
                  {example.title}
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 3 }}>
                  {example.description}
                </Typography>

                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'medium' }}>
                    테스트 링크:
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {example.testUrls.map((url, index) => (
                      <Button
                        key={index}
                        component={Link}
                        href={url}
                        variant="outlined"
                        size="medium"
                        startIcon={<LinkIcon />}
                        sx={{
                          mb: 1,
                          borderRadius: '8px',
                          textTransform: 'none'
                        }}
                      >
                        테스트 {index + 1}
                      </Button>
                    ))}
                  </Box>
                </Box>
              </CardContent>

              <CardActions sx={{ padding: 2 }}>
                <Button
                  startIcon={<CodeIcon />}
                  onClick={() => setSelectedExample(key as keyof typeof examples)}
                  variant="contained"
                  color="primary"
                  sx={{
                    borderRadius: '8px',
                    textTransform: 'none'
                  }}
                >
                  코드 보기
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={!!selectedExample}
        onClose={() => setSelectedExample(null)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { borderRadius: '12px' }
        }}
      >
        {selectedExample && (
          <>
            <DialogTitle>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h6" component="h2">
                  {examples[selectedExample].title}
                </Typography>
                <IconButton
                  edge="end"
                  onClick={() => setSelectedExample(null)}
                  aria-label="close"
                  sx={{
                    color: 'grey.500',
                    '&:hover': { color: 'grey.700' }
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent dividers>
              <SyntaxHighlighter
                language="typescript"
                style={tomorrow}
                customStyle={{
                  margin: 0,
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              >
                {examples[selectedExample].code}
              </SyntaxHighlighter>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Container>
  );
}