'use client'

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useQueries, useQueryClient } from '@tanstack/react-query';
import { Button, Container } from '@mui/material';
import Link from 'next/link';

export default function TestPage49() {
  const queryClient = useQueryClient();

  const { ref: section1Ref, inView: section1InView } = useInView({
    threshold: 1,
    triggerOnce: true
  });

  const { ref: section2Ref, inView: section2InView } = useInView({
    threshold: 1,
    triggerOnce: true
  });

  const { ref: section3Ref, inView: section3InView } = useInView({
    threshold: 1,
    triggerOnce: true
  });

  // 각 섹션에 대한 쿼리 설정
  const results = useQueries({
    queries: [
      {
        queryKey: ['section', 1],
        queryFn: async () => {
          const module = await import('./Section1');
          return module.default;
        },
        staleTime: Infinity, // 캐시를 무기한 유지
        gcTime: 1000 * 60 * 60, // 1시간 동안 캐시 유지
      },
      {
        queryKey: ['section', 2],
        queryFn: async () => {
          const module = await import('./Section2');
          return module.default;
        },
        enabled: section1InView, // section1이 보일 때만 활성화
        staleTime: Infinity,
        gcTime: 1000 * 60 * 60,
      },
      {
        queryKey: ['section', 3],
        queryFn: async () => {
          const module = await import('./Section3');
          return module.default;
        },
        enabled: section2InView,
        staleTime: Infinity,
        gcTime: 1000 * 60 * 60,
      },
      {
        queryKey: ['section', 4],
        queryFn: async () => {
          const module = await import('./Section4');
          return module.default;
        },
        enabled: section3InView,
        staleTime: Infinity,
        gcTime: 1000 * 60 * 60,
      },
    ],
  });

  // 스크롤 위치 저장 및 복원
  useEffect(() => {
    const savedScrollPosition = queryClient.getQueryData(['scrollPosition']);
    if (savedScrollPosition) {
      window.scrollTo(0, savedScrollPosition as number);
    }

    const handleBeforeUnload = () => {
      queryClient.setQueryData(['scrollPosition'], window.scrollY);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [queryClient]);

  const LoadingSection = () => (
    <div className="min-h-[400px] p-8 bg-gray-50">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <div className="text-lg font-semibold text-blue-500">로딩 중...</div>
      </div>
    </div>
  );

  const [Section1, Section2, Section3, Section4] = results.map(result => result.data);

  return (
    <Container>
      <p>
        - scroll 위치에 따라 next/dynamic을 사용하여 동적 컴포넌트 로딩을 구현한
        예시 코드
      </p>
      <p>
        - "뒤로가기" 시에 동적 로드한 컨텐츠, 스크롤을 유실하는 문제로 인해
        TanStack Query와 조합으로 해결
      </p>
      <div className="max-w-6xl mx-auto">
        <div ref={section1Ref} className="mb-8">
          {Section1 ? <Section1 /> : <LoadingSection />}
        </div>

        {Section1 && (
          <div ref={section2Ref} className="mb-8">
            {Section2 ? <Section2 /> : <LoadingSection />}
          </div>
        )}

        {Section2 && (
          <div ref={section3Ref} className="mb-8">
            {Section3 ? <Section3 /> : <LoadingSection />}
          </div>
        )}
        {Section3 && (
          <div className="mb-8">
            {Section4 ? <Section4 /> : <LoadingSection />}
          </div>
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