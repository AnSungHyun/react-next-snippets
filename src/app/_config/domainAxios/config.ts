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