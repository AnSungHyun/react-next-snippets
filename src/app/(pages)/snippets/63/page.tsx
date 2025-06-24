'use client';

import { useEffect, useRef, useState } from 'react';
import { DynamicComponent } from './components/DynamicComponent';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/navigation';
import { useInfiniteQuery } from '@tanstack/react-query';

type FeedItem = {
  id: number;
  component: string;
  props: Record<string, any>;
};

const allItems: FeedItem[] = [
  {
    id: 1,
    component: 'ProductCard',
    props: { title: '멋진 상품', price: 12900 },
  },
  {
    id: 2,
    component: 'BannerBlock',
    props: { imageUrl: '/images/snippets/UserFormTestFail.png' },
  },
  {
    id: 3,
    component: 'BannerBlock',
    props: { imageUrl: '/images/snippets/UserFormTestFail.png' },
  },
  {
    id: 4,
    component: 'BannerBlock',
    props: { imageUrl: '/images/snippets/UserFormTestFail.png' },
  },
  {
    id: 5,
    component: 'BannerBlock',
    props: { imageUrl: '/images/snippets/UserFormTestFail.png' },
  },
  {
    id: 6,
    component: 'BannerBlock',
    props: { imageUrl: '/images/snippets/UserFormTestFail.png' },
  },
  {
    id: 7,
    component: 'BannerBlock',
    props: { imageUrl: '/images/snippets/UserFormTestFail.png' },
  },
  {
    id: 8,
    component: 'BannerBlock',
    props: { imageUrl: '/images/snippets/UserFormTestFail.png' },
  },
  {
    id: 9,
    component: 'BannerBlock',
    props: { imageUrl: '/images/snippets/UserFormTestFail.png' },
  },
  {
    id: 10,
    component: 'EventNotice',
    props: { message: '이벤트 종료까지 D-3!' },
  },
  { id: 11, component: '기본값은 에러', props: {} },
  {
    id: 12,
    component: 'ProductCard',
    props: { title: '다음 상품', price: 19900 },
  },
  {
    id: 13,
    component: 'BannerBlock',
    props: {
      imageUrl: '/images/snippets/UserFormTestFail.png',
    },
  },
  {
    id: 14,
    component: 'EventNotice',
    props: { message: '진짜 마지막 공지입니다.' },
  },
];

const PAGE_SIZE = 2;

// 더미 데이터 페이징 처리
const fetchFeedItems = async ({ pageParam = 0 }) => {
  const start = pageParam * 1;
  const end = start + 1;
  await new Promise((r) => setTimeout(r, 300)); // 네트워크 지연
  return allItems.slice(start, end);
};

export default function Page() {
  const { ref, inView } = useInView();
  const router = useRouter();

  function moveA() {
    router.push('/snippets/48');
  }

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ['feed-items'],
      queryFn: fetchFeedItems,
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        const loaded = allPages.flat().length;
        if (loaded < allItems.length) {
          return allPages.length; // 다음 pageParam
        }
        return undefined;
      },
      staleTime: 1000 * 60 * 5,
    });

  // inView > 다음 페이지 요청
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div style={{ display: 'grid', gap: '2rem', padding: '2rem' }}>
      {data?.pages
        .flat()
        .map((item, idx) => (
          <DynamicComponent
            key={item.id}
            component={item.component}
            props={item.props}
          />
        ))}

      {/* 더보기 기준 */}
      <div ref={ref} style={{ height: '1px', marginTop: '20px' }} />

      <button onClick={moveA}>버튼버튼버튼</button>
    </div>
  );
}
