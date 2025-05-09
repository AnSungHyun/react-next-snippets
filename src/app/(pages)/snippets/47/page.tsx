'use client';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Container, Tab, Tabs, CircularProgress } from '@mui/material';
// import ServerSideWrapper from './ServerSideWrapper';

// 동적 임포트를 사용한 컴포넌트 로딩
const ChartComponent = dynamic(() => import('./ChartComponent'), {
  loading: () => <LoadingComponent name="차트" />,
  ssr: false
});

const DataTableComponent = dynamic(() => import('./DataTableComponent'), {
  loading: () => <LoadingComponent name="테이블" />,
  ssr: false
});

const ProductExample = dynamic(() => import('./ProductExample'), {
  loading: () => <LoadingComponent name="제품 목록" />,
  ssr: false
});

// 에러가 발생하는 컴포넌트
const ErrorComponent = dynamic(() => import('./ErrorComponent'), {
  loading: () => <LoadingComponent name="에러 테스트" />,
  ssr: false
});

// SSR이 활성화된 컴포넌트
const ServerSideWrapper = dynamic(() => import('./ServerSideWrapper'), {
  loading: () => <LoadingComponent name="SSR 컴포넌트" />,
  ssr: false // SSR 활성화
});


// 로딩 컴포넌트
const LoadingComponent = ({ name }: { name: string }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '200px',
      border: '1px solid #eee',
      borderRadius: '8px',
      backgroundColor: '#fafafa'
    }}>
      <CircularProgress size={40} />
      <span style={{ marginTop: '16px', color: '#666' }}>
        {name} 컴포넌트 로딩 중...
      </span>
    </div>
  );
};

// 에러 바운더리 컴포넌트
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error; retryCount: number }
> {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: undefined,
      retryCount: 0
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  handleRetry = () => {
    this.setState(prevState => ({
      hasError: false,
      retryCount: prevState.retryCount + 1
    }));
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '20px',
          color: 'white',
          backgroundColor: '#ff5252',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <h3>컴포넌트 로딩 중 오류가 발생했습니다</h3>
          <p style={{ fontFamily: 'monospace' }}>
            {this.state.error?.message || '알 수 없는 에러가 발생했습니다.'}
          </p>
          <button
            onClick={this.handleRetry}
            style={{
              padding: '8px 16px',
              backgroundColor: 'white',
              color: '#ff5252',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            다시 시도 ({this.state.retryCount + 1}번째 시도)
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const DynamicDashboardPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const renderTabContent = () => {
    return (
      <ErrorBoundary>
        {activeTab === 0 && <ChartComponent />}
        {activeTab === 1 && <DataTableComponent />}
        {activeTab === 2 && <ProductExample />}
        {activeTab === 3 && <ErrorComponent />}
        {activeTab === 4 && (
          <ServerSideWrapper />
          // <ServerSideComponent
          //   products={[]} // 실제 데이터는 서버 사이드에서 주입됨
          //   loadTime={new Date().toISOString()}
          // />
        )}

      </ErrorBoundary>
    );
  };

  return (
    <Container>
      <h2>Next.js Dynamic Import 예제</h2>

      <div style={{ marginBottom: '20px' }}>
        <h3>주요 특징</h3>
        <ul>
          <li>next/dynamic을 사용한 컴포넌트 동적 로딩</li>
          <li>컴포넌트별 커스텀 로딩 상태 표시</li>
          <li>SSR 비활성화로 클라이언트 사이드 전용 렌더링</li>
          <li>에러 바운더리를 통한 에러 처리 및 재시도 기능</li>
        </ul>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>코드 예시</h3>
        <pre style={{
          backgroundColor: '#f5f5f5',
          padding: '15px',
          borderRadius: '4px',
          overflow: 'auto'
        }}>
{`// CSR 전용 컴포넌트
const ClientComponent = dynamic(() => import('./ClientComponent'), {
  loading: () => <LoadingComponent name="클라이언트" />,
  ssr: false
});

// SSR 활성화 컴포넌트
const ServerComponent = dynamic(() => import('./ServerComponent'), {
  loading: () => <LoadingComponent name="서버" />,
  ssr: true
});`}

        </pre>
      </div>

      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        sx={{ marginBottom: 2 }}
      >
        <Tab label="차트 보기" />
        <Tab label="테이블 보기" />
        <Tab label="제품 목록" />
        <Tab label="에러 테스트" />
        <Tab label="SSR 컴포넌트" />

      </Tabs>

      {renderTabContent()}
    </Container>
  );
};

export default DynamicDashboardPage;