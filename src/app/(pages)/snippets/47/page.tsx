'use client';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Container, Tab, Tabs, CircularProgress } from '@mui/material';
import CodeBlock from '@/app/_component/CodeBlock';
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
const ServerSideComponent = dynamic(() => import('./ServerSideComponent'), {
  loading: () => <LoadingComponent name="SSR 컴포넌트" />,
  ssr: true // SSR 활성화
  // ssr: true 로 설정하였으나 실제로는 client 렌더링됨.
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
          // <ServerSideWrapper />
          <ServerSideComponent
            products={[]} // 실제 데이터는 서버 사이드에서 주입됨
            loadTime={new Date().toISOString()}
          />
        )}

      </ErrorBoundary>
    );
  };

  return (
    <Container>
      <div style={{ marginBottom: '20px' }}>
        <ul>
          <li>next/dynamic을 사용한 컴포넌트 동적 로딩</li>
          <li>컴포넌트별 커스텀 로딩 상태 표시</li>
          <li>SSR 비활성화로 클라이언트 사이드 전용 렌더링</li>
          <li>에러 바운더리를 통한 에러 처리 및 재시도 기능</li>
        </ul>
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


      <CodeBlock value={
        "'use client';\n" +
        "import React, { useState } from 'react';\n" +
        "import dynamic from 'next/dynamic';\n" +
        "import { Container, Tab, Tabs, CircularProgress } from '@mui/material';\n" +
        "// import ServerSideWrapper from './ServerSideWrapper';\n" +
        "\n" +
        "// 동적 임포트를 사용한 컴포넌트 로딩\n" +
        "const ChartComponent = dynamic(() => import('./ChartComponent'), {\n" +
        "  loading: () => <LoadingComponent name=\"차트\" />,\n" +
        "  ssr: false\n" +
        "});\n" +
        "\n" +
        "const DataTableComponent = dynamic(() => import('./DataTableComponent'), {\n" +
        "  loading: () => <LoadingComponent name=\"테이블\" />,\n" +
        "  ssr: false\n" +
        "});\n" +
        "\n" +
        "const ProductExample = dynamic(() => import('./ProductExample'), {\n" +
        "  loading: () => <LoadingComponent name=\"제품 목록\" />,\n" +
        "  ssr: false\n" +
        "});\n" +
        "\n" +
        "// 에러가 발생하는 컴포넌트\n" +
        "const ErrorComponent = dynamic(() => import('./ErrorComponent'), {\n" +
        "  loading: () => <LoadingComponent name=\"에러 테스트\" />,\n" +
        "  ssr: false\n" +
        "});\n" +
        "\n" +
        "// SSR이 활성화된 컴포넌트\n" +
        "const ServerSideComponent = dynamic(() => import('./ServerSideComponent'), {\n" +
        "  loading: () => <LoadingComponent name=\"SSR 컴포넌트\" />,\n" +
        "  ssr: true // SSR 활성화\n" +
        "  // ssr: true 로 설정하였으나 실제로는 client 렌더링됨.\n" +
        "});"
      }/>

      <CodeBlock value={
        "const DynamicDashboardPage = () => {\n" +
        "  const [activeTab, setActiveTab] = useState(0);\n" +
        "\n" +
        "  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {\n" +
        "    setActiveTab(newValue);\n" +
        "  };\n" +
        "\n" +
        "  const renderTabContent = () => {\n" +
        "    return (\n" +
        "      <ErrorBoundary>\n" +
        "        {activeTab === 0 && <ChartComponent />}\n" +
        "        {activeTab === 1 && <DataTableComponent />}\n" +
        "        {activeTab === 2 && <ProductExample />}\n" +
        "        {activeTab === 3 && <ErrorComponent />}\n" +
        "        {activeTab === 4 && (\n" +
        "          // <ServerSideWrapper />\n" +
        "          <ServerSideComponent\n" +
        "            products={[]} // 실제 데이터는 서버 사이드에서 주입됨\n" +
        "            loadTime={new Date().toISOString()}\n" +
        "          />\n" +
        "        )}\n" +
        "\n" +
        "      </ErrorBoundary>\n" +
        "    );\n" +
        "  };\n" +
        "\n" +
        "  return (\n" +
        "    <Container>\n" +
        "      <Tabs\n" +
        "        value={activeTab}\n" +
        "        onChange={handleTabChange}\n" +
        "        sx={{ marginBottom: 2 }}\n" +
        "      >\n" +
        "        <Tab label=\"차트 보기\" />\n" +
        "        <Tab label=\"테이블 보기\" />\n" +
        "        <Tab label=\"제품 목록\" />\n" +
        "        <Tab label=\"에러 테스트\" />\n" +
        "        <Tab label=\"SSR 컴포넌트\" />\n" +
        "\n" +
        "      </Tabs>\n" +
        "\n" +
        "      {renderTabContent()}\n" +
        "    </Container>\n" +
        "  );\n" +
        "};"
      } />
    </Container>
  );
};

export default DynamicDashboardPage;