import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // output: "standalone",
  // outputFileTracingRoot: path.join(__dirname, "../../../"),
  experimental: {
    authInterrupts: true, // forbidden, unauthorized 사용을 위한 옵션
  },
  async rewrites() {
    return [
      // {
      //   // rewirtes 설정을 통해 cors 문제 해결 및 backend api 주소 숨김
      //   source: '/api/products', // 클라이언트에서 요청할 경로
      //   destination: process.env.BACKEND_API_URL + '/api/products', // 실제 백엔드 API 주소
      // },
      {
        // rewirtes 설정을 통해 cors 문제 해결 및 backend api 주소 숨김
        source: '/:path*', // 클라이언트에서 요청할 경로
        destination: 'https://dummyjson.com/:path*', // 실제 백엔드 API 주소
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

export default nextConfig;
