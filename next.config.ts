import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // output: "standalone",
  // outputFileTracingRoot: path.join(__dirname, "../../../"),
  experimental: {
    authInterrupts: true, // forbidden, unauthorized 사용을 위한 옵션
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ]
  },
  async rewrites() {
    return [
      // {
      //   // rewirtes 설정을 통해 cors 문제 해결 및 backend api 주소 숨김
      //   source: '/api/products', // 클라이언트에서 요청할 경로
      //   destination: process.env.BACKEND_API_URL + '/api/products', // 실제 백엔드 API 주소
      // },
      {
        // 상세한 rewrite 설정을 앞순위에 두어야함.
        source: '/dummy/:path*', // 클라이언트에서 요청할 경로
        destination: 'https://dummyjson.com/:path*', // 실제 백엔드 API 주소
      },
      {
        // rewirtes 설정을 통해 cors 문제 해결 및 backend api 주소 숨김
        source: '/:path*', // 클라이언트에서 요청할 경로
        destination: 'https://dummyjson.com/:path*', // 실제 백엔드 API 주소
        // page 요청과 API 요청을 구분하기 위한 조건
        has: [
          {
            type: 'header',
            key: 'accept',
            value: '(.*application/json.*|.*text/json.*)',
          },
        ]
      },
      // {
      //   source: '/products/:path*', // products로 시작하는 모든 경로
      //   destination: 'https://dummyjson.com/products/:path*' // DummyJSON API로 전달
      // }

      // {
      //   // rewirtes 설정을 통해 cors 문제 해결 및 backend api 주소 숨김
      //   source: '/product', // 클라이언트에서 요청할 경로
      //   destination: 'https://dummyjson.com/produ', // 실제 백엔드 API 주소
      // },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com",
        pathname: '**',
      },
      {
        protocol: "https",
        hostname: "dummyimage.com",
        pathname: '**',
      }
    ]
    // domains: ['cdn.dummyjson.com'],
  },
};

// export default nextConfig;
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
