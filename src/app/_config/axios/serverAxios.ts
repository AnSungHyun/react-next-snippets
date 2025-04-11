import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import {redirect, RedirectType, unauthorized} from "next/navigation";
import qs from "qs";

export const config = {
  base_url: {
    local: "https://dummyjson.com",
    dev: "https://dummyjson.com",
    pro: "https://dummyjson.com",
    test: "https://dummyjson.com",
  },
  result_code: "0000",
  request_timeout: 60000,
  default_headers: "application/json",
} as const;

// export type Config = typeof config;

export const PATH_URL =
  config.base_url[process.env.NEXT_PUBLIC_MODE as keyof typeof config.base_url];

const request = (option: any) => {
  const {url, method, params, data, headersType, responseType, adapter, fetchOptions} = option;
  return service({
    url,
    method,
    params,
    data,
    responseType,
    adapter,
    fetchOptions,
    headers: {
      "Content-Type": headersType || config.default_headers,
    },
  });
};

export default {
  get: <T = any>(option: any) => {
    return request({method: "get", ...option}) as Promise<T>;
  },
  post: <T = any>(option: any) => {
    return request({method: "post", ...option}) as Promise<T>;
  },
  delete: <T = any>(option: any) => {
    return request({method: "delete", ...option}) as Promise<T>;
  },
  put: <T = any>(option: any) => {
    return request({method: "put", ...option}) as Promise<T>;
  },
};

// Axios Instance Create
const service: AxiosInstance = axios.create({
  baseURL: PATH_URL,
  timeout: config.request_timeout,
});

// Request Interceptor
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (
      config.method === "post" &&
      config.headers?.["Content-Type"] === "application/x-www-form-urlencoded"
    ) {
      config.data = qs.stringify(config.data);
    }

    // API 요청 시 token 전송
    // const token = getToken();
    // if (token) {
    //   config.headers = {
    //     ...config.headers,
    //     Authorization: `Bearer ${token}`
    //   };
    // }

    // GET 요청 파라미터 인코딩
    if (config.method === "get" && config.params) {
      let url = config.url as string;
      url += "?";
      const keys = Object.keys(config.params);
      for (const key of keys) {
        if (config.params[key] !== undefined && config.params[key] !== null) {
          url += `${key}=${encodeURIComponent(config.params[key])}&`;
        }
      }
      url = url.substring(0, url.length - 1);
      config.params = {};
      config.url = url;
    }

    return config;
  },
  (error: AxiosError) => {
    console.log(error);
    return Promise.reject(error);
  },
);

// Response Interceptor
service.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
    // if (response.config.responseType === 'blob') {
    //   return response;
    // } else if (response.data.code === result_code) {
    //   return response.data;
    // } else {
    //   console.error(response.data.message);
    //   return Promise.reject(response.data);
    // }
  },
  (error: AxiosError) => {

    // 로그인 요청이 아닌 상황에 401 에러 발생 시
    // 토큰이 만료된 것으로 간주하고 로그인 페이지로 리다이렉트
    if (error.response?.status === 401 && !error.request.url.includes("/login")) {
      console.error('User info not found');
      redirect('/login', RedirectType.push);
    }

    // Server Error
    // experimental 기능. root 경로에 unauthorized.ts 파일을 렌더링하도록 할 수있음.
    // unauthorized();

    // token 만료, 재발행 후 재요청할 때 사용
    // const originalRequest = error.config;
    // if (error.response?.status === 401) {
    //   try {
    //     // Refresh token을 사용하여 새로운 토큰 발급 요청
    //     const refreshTokenResponse = await refreshToken(); // refreshToken 함수 호출
    //     const newToken = refreshTokenResponse.data.token; // 새로운 토큰을 가져옴
    //
    //     // 새로운 토큰을 저장 (예: 로컬 스토리지 또는 상태 관리)
    //     localStorage.setItem('token', newToken); // 예시로 로컬 스토리지에 저장
    //
    //     // 원래 요청의 Authorization 헤더에 새로운 토큰 추가
    //     originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
    //
    //     // 원래 요청 다시 시도
    //     return service(originalRequest);
    //   } catch (refreshError) {
    //     console.error("Refresh token error: ", refreshError);
    //     return Promise.reject(refreshError); // Refresh token 요청 실패 시 에러 반환
    //   }
    // }

    console.error("cwareServerAxios : " + error);
    return Promise.reject(error);
  },
);
