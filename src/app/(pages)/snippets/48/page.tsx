'use client'

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Container } from '@mui/material';

export default function Home() {
  const [Section1, setSection1] = useState<any>(null);
  const [Section2, setSection2] = useState<any>(null);
  const [Section3, setSection3] = useState<any>(null);
  const [Section4, setSection4] = useState<any>(null);

  // 섹션 로딩 상태 추가
  const [isSection2Loading, setIsSection2Loading] = useState(false);
  const [isSection3Loading, setIsSection3Loading] = useState(false);
  const [isSection4Loading, setIsSection4Loading] = useState(false);

  const { ref: section1Ref, inView: section1InView } = useInView({
    threshold: 1,
    triggerOnce: true // 한 번만 트리거되도록 설정
  });

  const { ref: section2Ref, inView: section2InView } = useInView({
    threshold: 1,
    triggerOnce: true // 한 번만 트리거되도록 설정
  });

  const { ref: section3Ref, inView: section3InView } = useInView({
    threshold: 1,
    triggerOnce: true // 한 번만 트리거되도록 설정
  });

  // 섹션 1은 즉시 로드
  useEffect(() => {
    const loadSection1 = async () => {
      const module = await import('./Section1');
      setSection1(() => module.default);
    };
    loadSection1();
  }, []);

  // 섹션 1이 뷰포트에 들어오면 섹션 2 로드
  useEffect(() => {
    if (section1InView && !Section2 && !isSection2Loading) {
      const loadSection2 = async () => {
        setIsSection2Loading(true);
        console.log("섹션 2 로딩 시작...");
        const module = await import('./Section2');
        setSection2(() => module.default);
      };
      loadSection2();
    }
  }, [section1InView, Section2, isSection2Loading]);

  // 섹션 2가 뷰포트에 들어오면 섹션 3 로드
  useEffect(() => {
    if (section2InView && !Section3 && !isSection3Loading) {
      const loadSection3 = async () => {
        setIsSection3Loading(true);
        console.log("섹션 3 로딩 시작...");
        const module = await import('./Section3');
        setSection3(() => module.default);
      };
      loadSection3();
    }
  }, [section2InView, Section3, isSection3Loading]);

  // 섹션 3가 뷰포트에 들어오면 섹션 4 로드
  useEffect(() => {
    if (section3InView && !Section4 && !isSection4Loading) {
      const loadSection4 = async () => {
        setIsSection4Loading(true);
        console.log("섹션 4 로딩 시작...");
        const module = await import('./Section4');
        setSection4(() => module.default);
      };
      loadSection4();
    }
  }, [section3InView, Section4, isSection4Loading]);

  const LoadingSection = () => (
    <div className="min-h-[400px] p-8 bg-gray-50">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <div className="text-lg font-semibold text-blue-500">로딩 중...</div>
      </div>
    </div>
  );

  return (
    <Container>
      <p>
        - scroll 위치에 따라 next/dynamic을 사용하여 동적 컴포넌트 로딩을 구현한 예시 코드
      </p>
      <p>
        - 하지만 동적으로 로딩한 컴포넌트여서, 페이지 이동후 "뒤로가기" 시 컨텐츠, 스크롤 유실
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
    </Container>
  );
}