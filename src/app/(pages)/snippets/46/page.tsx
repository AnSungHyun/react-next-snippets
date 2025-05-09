'use client';
import React, { Suspense, lazy, useState } from 'react';
import { Container, Tab, Tabs, CircularProgress } from '@mui/material';

// 동적 임포트를 사용한 컴포넌트 로딩
const ChartComponent = lazy(() => import('./ChartComponent'));
const DataTableComponent = lazy(() => import('./DataTableComponent'));
const ProductExample = lazy(() => import('./ProductExample'));
const ErrorComponent = lazy(() => import('./ErrorComponent'));


// 로딩 컴포넌트
const LoadingComponent = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '200px'
    }}>
      <CircularProgress />
      <span style={{ marginLeft: '10px' }}>로딩 중...</span>
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

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const renderTabContent = () => {
    return (
      <ErrorBoundary>
        <Suspense fallback={<LoadingComponent />}>
          {activeTab === 0 && <ChartComponent />}
          {activeTab === 1 && <DataTableComponent />}
          {activeTab === 2 && <ProductExample />}
          {activeTab === 3 && <ErrorComponent />}

        </Suspense>
      </ErrorBoundary>
    );
  };

  return (
    <Container>
      <p>
        - lazy를 사용하여 각 탭을 클릭했을 때 lazy를 사용하여 동적으로 import
      </p>
      <p>
        - 초기 렌더링 속도를 줄일 수 있고, 선택적으로 필요한 컴포넌트만 로드할 수 있다.
      </p>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        sx={{ marginBottom: 2 }}
      >
        <Tab label="차트 보기" />
        <Tab label="테이블 보기" />
        <Tab label="제품 목록" />
        <Tab label="에러 테스트" />

      </Tabs>

      {renderTabContent()}
    </Container>
  );
};

export default DashboardPage;