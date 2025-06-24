import axios from 'axios';
import { dynamic } from './config';
import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import type { domainType } from './config';

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