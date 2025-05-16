'use client'
import { useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { Button, Container } from '@mui/material';
import Link from 'next/link';
import { useQuery, useQueries } from '@tanstack/react-query';

type Section = {
  id: number;
  componentName: string;
};

async function fetchSectionsFromDB(): Promise<Section[]> {
  return [
    { id: 1, componentName: 'Section1' },
    { id: 2, componentName: 'Section2' },
    { id: 3, componentName: 'Section3' },
    { id: 4, componentName: 'Section4' },
  ];
}

async function loadComponent(name: string) {
  const mod = await import(`./${name}`);
  console.log(`Loaded component: ${name}`);
  return mod.default;
}

export default function DynamicSectionsPage() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: sectionList = [] } = useQuery<Section[]>({
    queryKey: ['sections'],
    queryFn: fetchSectionsFromDB,
    staleTime: 1000 * 60 * 5,
  });

  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    // sessionStorage.setItem('visibleCount', String(visibleCount));
    console.log('visibleCount:', visibleCount);
  }, [visibleCount]);

  const componentQueries = useQueries({
    queries: sectionList.slice(0, visibleCount).map((section) => ({
      queryKey: ['sectionComponent', section.componentName],
      queryFn: () => loadComponent(section.componentName),
      staleTime: Infinity,
      enabled: !!section.componentName,
    })),
  });

  // 로딩 감지용 요소를 따로 생성
  const { ref: loadMoreRef, inView } = useInView({ threshold: 1 });

  useEffect(() => {
    const lastLoaded = componentQueries[visibleCount - 1]?.isSuccess;
    if (inView && lastLoaded && visibleCount < sectionList.length) {
      setVisibleCount((prev) => prev + 1);
    }
  }, [inView, visibleCount, sectionList.length, componentQueries]);

  const LoadingSection = () => (
    <div className="min-h-[400px] p-8 bg-gray-50">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <div className="text-lg font-semibold text-blue-500">로딩 중...</div>
      </div>
    </div>
  );

  return (
    <Container ref={scrollRef}>
      <p>
        - Section 개수에 상관없이 동적으로 스크롤 하단에 도달 시 컴포넌트 로딩
      </p>
      <p>
        - 하지만 Section 자체도 동적인 데이터다 보니 scroll 유지가 어려움
      </p>
      <div className="max-w-6xl mx-auto">
        {sectionList.slice(0, visibleCount).map((section, idx) => {
          const query = componentQueries[idx];
          const SectionComponent = query?.data;
          return (
            <div key={section.id} className="mb-8">
              {SectionComponent ? <SectionComponent /> : <LoadingSection />}
            </div>
          );
        })}

        {/* 로딩 감지용 요소를 섹션 아래 별도로 추가 */}
        {visibleCount < sectionList.length && (
          <div ref={loadMoreRef} style={{ height: '1px' }} />
        )}
      </div>
      <Button>
        <Link href={'/snippets/1'}>
          다른 페이지로 이동!
          <br />( 뒤로가기로 스크롤 유지 되는지 확인 )
        </Link>
      </Button>
    </Container>
  );
}
