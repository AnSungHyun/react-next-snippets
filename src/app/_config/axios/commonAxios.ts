import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import qs from "qs";

export const config = {
  base_url: {
    local: "https://dummyjson.com",
    dev: "https://dummyjson.com",
    pro: "https://dummyjson.com",
    test: "https://dummyjson.com",
  },
  base_proxy: "/proxy", // Client 요청 프록시 경로 설정
  result_code: "0000",
  request_timeout: 60000,
  default_headers: "application/json",
} as const;

const isServer = typeof window === 'undefined'; // 서버인지 클라이언트인지 확인

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


const baseURL = isServer
  ? config.base_url[process.env.NEXT_PUBLIC_MODE as keyof typeof config.base_url]
  : config.base_proxy; // 클라이언트에서는 baseURL을 proxy 페이지로 설정

// Axios Instance Create
const service: AxiosInstance = axios.create({
  baseURL,
  timeout: config.request_timeout,
});

// Request Interceptor
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    console.info("baseURL", baseURL);
    console.info("commonAxios url : " + config.url);

    // legacy API 요청 시 필요 할 수 있음.
    // if (
    //   config.method === "post" &&
    //   config.headers?.["Content-Type"] === "application/x-www-form-urlencoded"
    // ) {
    //   config.data = qs.stringify(config.data);
    // }

    // API 요청 시 token 전송
    // const token = getToken();
    // if (token) {
    //   config.headers = {
    //     ...config.headers,
    //     Authorization: `Bearer ${token}`
    //   };
    // }

    // GET 요청 파라미터 인코딩
    // 기본적으로 Axios의 params 객체를 Query String로 변환하여 전송함
    // test=['aa','bb','cc'] => test[]=aa&test[]=bb&test[]=cc
    /**
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
    }*/

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
    // const router = useRouter();
    // if (error.response?.status === 401 && !error.config?.url?.includes("/login")) {
    //   router.push("/login");
    //   setTimeout(() => {
    //     window.location.href = '/login';
    //   }, 1000);
    // }

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

    console.error("commonAxios : " + error);
    return Promise.reject(error);
  },
);
