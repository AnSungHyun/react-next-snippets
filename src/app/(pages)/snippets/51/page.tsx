import type {Metadata} from 'next'
import {Container} from '@mui/material'

export const metadata: Metadata = {
  metadataBase: new URL('https://example.com'),
  title: 'Page Title - My Website',
  description: 'This is a description of my page content',
  openGraph: {
    title: 'Page Title - My Website',
    description: 'This is a description of my page content',
    url: 'https://example.com',
    siteName: 'My Website',
    images: [
      {
        url: 'https://example.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'My Website OG Image',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Page Title - My Website',
    description: 'This is a description of my page content',
    creator: '@username',
    images: ['https://example.com/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://example.com',  // 표준 URL
    languages: {
      'en-US': '/en',
      'ko-KR': '/ko'
    }
  }

}

export default function Page() {
  return (
    <Container>
      <div style={{ padding: '2rem 0' }}>
        <h1>Next.js 메타데이터 설정 가이드</h1>

        {/* 기본 메타데이터 섹션 */}
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#2563eb', borderBottom: '2px solid #e5e7eb', paddingBottom: '0.5rem' }}>
            📌 기본 메타데이터
          </h2>
          <pre style={{ background: '#f3f4f6', padding: '1rem', borderRadius: '4px' }}>
{`export const metadata: Metadata = {
  metadataBase: new URL('https://example.com'),
  title: 'Page Title - My Website',
  description: 'This is a description of my page content'
}'`}
          </pre>
        </section>

        {/* OpenGraph 섹션 */}
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#2563eb', borderBottom: '2px solid #e5e7eb', paddingBottom: '0.5rem' }}>
            🌐 OpenGraph 설정
          </h2>
          <p>소셜 미디어 공유 시 표시되는 정보</p>
          <ul style={{ listStyle: 'none', paddingLeft: '1rem' }}>
            <li>✓ 이미지 권장 크기: 1200 x 630</li>
            <li>✓ locale 설정: ko_KR</li>
            <li>✓ type: website</li>
          </ul>
          <pre style={{ background: '#f3f4f6', padding: '1rem', borderRadius: '4px' }}>
{`openGraph: {
    title: 'Page Title - My Website',
    description: 'This is a description of my page content',
    url: 'https://example.com',
    siteName: 'My Website',
    images: [
      {
        url: 'https://example.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'My Website OG Image',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  }`}
          </pre>
        </section>

        {/* 다국어 지원 섹션 */}
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#2563eb', borderBottom: '2px solid #e5e7eb', paddingBottom: '0.5rem' }}>
            🌍 다국어 지원 (신규 권장사항)
          </h2>
          <div style={{ background: '#fef2f2', padding: '1rem', borderRadius: '4px', marginBottom: '1rem' }}>
            <p style={{ color: '#dc2626', margin: 0 }}>
              ⚠️ languages 속성은 deprecated. alternates 사용을 권장합니다.
            </p>
          </div>
          <pre style={{ background: '#f3f4f6', padding: '1rem', borderRadius: '4px' }}>
{`alternates: {
  canonical: 'https://example.com',
  languages: {
    'en-US': '/en',
    'ko-KR': '/ko'
  }
}`}
          </pre>
        </section>

        {/* 검색엔진 설정 섹션 */}
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#2563eb', borderBottom: '2px solid #e5e7eb', paddingBottom: '0.5rem' }}>
            🤖 robots 설정
          </h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
              <td style={{ padding: '0.5rem' }}>index: true</td>
              <td style={{ padding: '0.5rem' }}>검색엔진 색인 허용</td>
            </tr>
            <tr>
              <td style={{ padding: '0.5rem' }}>follow: true</td>
              <td style={{ padding: '0.5rem' }}>링크 추적 허용</td>
            </tr>
            </tbody>
          </table>
          <pre style={{ background: '#f3f4f6', padding: '1rem', borderRadius: '4px' }}>
{`robots: {
  index: true,
  follow: true,
}`}
          </pre>
        </section>

        {/* Twitter 카드 섹션 */}
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#2563eb', borderBottom: '2px solid #e5e7eb', paddingBottom: '0.5rem' }}>
            🐦 Twitter 카드
          </h2>
          <ul style={{ listStyle: 'none', paddingLeft: '1rem' }}>
            <li>✓ card: 'summary_large_image'</li>
            <li>✓ title: 페이지 제목</li>
            <li>✓ description: 페이지 설명</li>
            <li>✓ images: 트위터 공유용 이미지</li>
          </ul>
        </section>

        {/* 팁 섹션 */}
        <section style={{
          background: '#f0fdf4',
          padding: '1rem',
          borderRadius: '4px',
          marginTop: '2rem'
        }}>
          <h3 style={{ color: '#166534', marginTop: 0 }}>💡 유용한 팁</h3>
          <ul style={{ color: '#166534', paddingLeft: '1.5rem' }}>
            <li>동적 메타데이터는 generateMetadata 함수를 사용하세요</li>
          </ul>
        </section>
      </div>
    </Container>
  )
}