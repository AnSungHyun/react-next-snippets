/**
 * @fileoverview HTTP 클라이언트 설정
 * @description
 * 프로젝트의 HTTP 통신을 위한 설정 파일입니다.
 * 1. 각 도메인별 환경(local, dev, pro, test)에 따른 기본 URL을 정의합니다.
 * 2. Proxy 설정을 통해 CORS 이슈 해결 및 보안을 강화합니다.
 * 3. API 요청에 대한 기본 설정(timeout, headers 등)을 정의합니다.
 * 4. 각 도메인별로 다른 설정이 필요한 경우 개별적으로 정의할 수 있습니다.
 *
 * @author 안성현
 * @date 2025-06-25
 * @lastModified 2025-06-25
 */

// 도메인 타입 정의
export type domainType = 'base' | 'auth' | 'payment' | 'dummy' | 'mock';

export const dynamic = {
  base: {
    url: {
      local: "https://base-api.com",
      dev: "https://base-api.com",
      pro: "https://base-api.com",
      test: "https://base-api.com",
    },
    proxy: {
      use: true, // 외부 API 요청으로 proxy 처리가 필요 없는 경우 false
      path: "/proxy", // 외부 API 요청으로 proxy 처리가 필요 없는 경우 "" 빈값 처리
    },
    result_code: "0000",
    request_timeout: 60000,
    default_headers: "application/json",
  },
  auth: {
    url: {
      local: "https://dummyjson.com",
      dev: "https://dummyjson.com",
      pro: "https://dummyjson.com",
      test: "https://dummyjson.com",
    },
    proxy: {
      use: true, // 외부 API 요청으로 proxy 처리가 필요 없는 경우 false
      path: "/proxy", // 외부 API 요청으로 proxy 처리가 필요 없는 경우 "" 빈값 처리
    },
    result_code: "0000",
    request_timeout: 60000,
    default_headers: "application/json",
  },
  payment: {
    url: {
      local: "https://payment-api.com",
      dev: "https://payment-api.com",
      pro: "https://payment-api.com",
      test: "https://payment-api.com",
    },
    proxy: {
      use: true, // 외부 API 요청으로 proxy 처리가 필요 없는 경우 false
      path: "/proxy", // 외부 API 요청으로 proxy 처리가 필요 없는 경우 "" 빈값 처리
    },
    result_code: "0000",
    request_timeout: 60000,
    default_headers: "application/json",
  },
  dummy: {
    url: {
      local: "https://dummyjson.com",
      dev: "https://dummyjson.com",
      pro: "https://dummyjson.com",
      test: "https://dummyjson.com",
    },
    proxy: {
      use: true, // 외부 API 요청으로 proxy 처리가 필요 없는 경우 false
      path: "/proxy", // 외부 API 요청으로 proxy 처리가 필요 없는 경우 "" 빈값 처리
    },
    result_code: "0000",
    request_timeout: 60000,
    default_headers: "application/json",
  },
  mock: {
    url: {
      local: "https://dummyjson.com",
      dev: "https://dummyjson.com",
      pro: "https://dummyjson.com",
      test: "https://dummyjson.com",
    },
    proxy: {
      use: false, // 외부 API 요청으로 proxy 처리가 필요 없는 경우 false
      path: "", // 외부 API 요청으로 proxy 처리가 필요 없는 경우 "" 빈값 처리
    },
    result_code: "0000",
    request_timeout: 60000,
    default_headers: "application/json",
  }
}