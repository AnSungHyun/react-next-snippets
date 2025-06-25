import axios from 'axios';
import { dynamic } from './config';
import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import type { domainType } from './config';
import { TokenManager } from '@/utils/tokenManager';
import { setServerSideRefreshToken } from '@/app/_config/domainAxios/serverCookie';

const isServer = typeof window === 'undefined';
const runtimeEnvironment = isServer ? "SERVER" : "CLIENT";

export const createAxiosInstance = (type: domainType): AxiosInstance => {

  // 클라이언트 이며, dynamic[type].proxy.use가 true인 경우
  const isProxy = !isServer && dynamic[type].proxy.use;

  const baseURL = isProxy
    ? dynamic[type].proxy.path
    : dynamic[type].url[process.env.NEXT_PUBLIC_MODE as keyof typeof dynamic.base.url];

  // const baseURL = isServer
  //   ? dynamic[type].url[process.env.NEXT_PUBLIC_MODE as keyof typeof dynamic.base.url]
  //   : dynamic[type].proxy.path;

  const instance = axios.create({
    baseURL,
    timeout: dynamic[type].request_timeout,
  });

  // Request Interceptor
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {

      if(isProxy) {
        config.headers.set('x-domain-type', type);
      }

      // 토큰 존재 여부 확인
      const token = TokenManager.getAccessToken();
      // if (!token) {
      //   throw new Error('접근 토큰이 없습니다. 먼저 로그인해주세요.');
      // }
      if(token) {
        config.headers.set('Authorization', `Bearer ${token}`);
      }


      console.info(
        `${runtimeEnvironment}: Axios Req: ${config.method?.toUpperCase()}`,
        {
          apiPath: baseURL + config.url,
          headers: config.headers,
          params: config.params,
          data: config.data,
        },
      );

      return config;
    },
    (error) => {
      console.error(`${runtimeEnvironment}: axios error: ` + error);
      return Promise.reject(error);
    },
  );

  // Response Interceptor
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      // /login 엔드포인트에 대한 응답 처리
      if (!isServer && response.config.url === '/auth/login' && response.status === 200) {
        TokenManager.setAccessToken(response.data.accessToken);
        console.log('TokenManager.setAccessToken', response.data.accessToken);
      }
      // 서버사이드에서 refreshToken이 있는 경우 쿠키 설정
      if (isServer && response.data.refreshToken) {
        console.log('setServerSideRefreshToken', response.data.refreshToken);
        setServerSideRefreshToken(response.data.refreshToken).then(()=>{});
      }


      return response.data;
    },
    (error) => {
      console.error(`${runtimeEnvironment}: axios error: ` + error);
      return Promise.reject(error);
    },
  );

  return instance;
};

const request = (axiosInstance: AxiosInstance, domainType: domainType) => (option: any) => {
  const { url, method, params, data, headers, headersType, responseType, adapter, fetchOptions } = option;
  return axiosInstance({
    url,
    method,
    params,
    data,
    responseType,
    adapter,
    fetchOptions,
    headers: {
      "Content-Type": headersType || dynamic[domainType].default_headers,
      ...headers
    },
  });
};

export const createApiClient = (instance: AxiosInstance, domainType: domainType) => {
  const requestFn = request(instance, domainType);

  return {
    get: <T = any>(option: any) => {
      return requestFn({ method: "get", ...option }) as Promise<T>;
    },
    post: <T = any>(option: any) => {
      return requestFn({ method: "post", ...option }) as Promise<T>;
    },
    put: <T = any>(option: any) => {
      return requestFn({ method: "put", ...option }) as Promise<T>;
    },
    delete: <T = any>(option: any) => {
      return requestFn({ method: "delete", ...option }) as Promise<T>;
    },
  };
};