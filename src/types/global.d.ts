/** 전역(global) 타입 선언 */
declare global {
  type Fn<T = any> = (...args: T[]) => T;

  type Nullable<T> = T | null;

  type AxiosHeaders =
    | 'application/json'
    | 'application/x-www-form-urlencoded'
    | 'multipart/form-data';

  type AxiosMethod = 'get' | 'post' | 'delete' | 'put';

  type AxiosResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream';

  interface AxiosConfig {
    params?: Record<string, any>;
    data?: any;
    url?: string;
    method?: AxiosMethod;
    headersType?: string;
    responseType?: AxiosResponseType;
  }

  interface IResponse<T = any> {
    code: number;
    data: T extends any ? T : T & any;
  }
}

/** 모듈로 인식시키기 위해 export {} 추가 */
export {};