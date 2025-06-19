'use client';

import { useEffect, useState } from 'react';
import { DynamicComponent } from './components/DynamicComponent';
import { useInView } from 'react-intersection-observer';

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

export default function Page() {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { ref, inView } = useInView();
  const PAGE_SIZE = 2;

  useEffect(() => {
    // 최초 데이터 로드
    fetchMore();
  }, []);

  useEffect(() => {
    if (inView && isLoading && items.length > 0) {
      fetchMore();
    }
  }, [inView, isLoading]);

  const fetchMore = async () => {
    const lastItem = items[items.length - 1];
    const lastId = lastItem?.id ?? 0;
    const nextItems = allItems
      .filter((item) => item.id > lastId)
      .slice(0, PAGE_SIZE);

    // 더 이상 불러올 게 없다면 리턴
    if (nextItems.length === 0) {
      setIsLoading(false);
      return;
    }

    setItems((prev) => [...prev, ...nextItems]);
    setPage((prev) => prev + 1);
  };

  return (
    <div style={{ display: 'grid', gap: '2rem', padding: '2rem' }}>
      {items.map((item, idx) => (
        <DynamicComponent
          key={item.id}
          component={item.component}
          props={item.props}
        />
      ))}

      {/* 더보기 기준 */}
      <div ref={ref} style={{ height: '1px', marginTop: '20px' }} />

      {isLoading && <div>로딩 중...</div>}
      {!isLoading && (
        <div style={{ textAlign: 'center', color: 'gray' }}>
          모든 항목을 다 불러왔습니다.
        </div>
      )}
    </div>
  );
}
