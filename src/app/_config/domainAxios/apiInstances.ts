import { createAxiosInstance, createApiClient } from './createAxios';

/**
 * @fileoverview Axios 인스턴스 및 공통 HTTP 클라이언트 설정
 * @description
 * 프로젝트의 HTTP 통신을 위한 Axios 인스턴스를 구성하고 관리합니다.
 * 1. config.ts에 정의된 환경 설정을 기반으로 Axios 인스턴스를 생성합니다.
 * 2. config.ts에서 각 도메인 혹은 외부 API에 대한 Axios 인스턴스를 생성합니다.
 *  - ex) base, mock, ...
 * 3. Request/Response Interceptor는 기본적으로 공통으로 구현하되, 추후 외부 API에 처리가 필요한 경우 분리합니다.
 * 4. Client Comp 에서 내부 API는 Proxy 처리 ( NextJS ) 를 거쳐서 호출합니다.
 * 5. Client Comp 에서 외부(Third-Party API) 는 Proxy 없이 직접 호출합니다.
 * 6. Axios 인스턴스는 서버/클라이언트 사이드 모두 지원하도록 구현합니다.
 *
 * @author 안성현
 * @date 2025-06-23
 * @lastModified 2025-06-23
 */

// 기본 axios 인스턴스 생성
const baseAxios = createAxiosInstance('base');
const authAxios = createAxiosInstance('auth');
const paymentAxios = createAxiosInstance('payment');
const dummyAxios = createAxiosInstance('dummy');
const mockAxios = createAxiosInstance('mock');
const fakeAxios = createAxiosInstance('fake');

// API 클라이언트 생성
export const baseApi = createApiClient(baseAxios, 'base');
export const authApi = createApiClient(authAxios, 'auth');
export const paymentApi = createApiClient(paymentAxios, 'payment');
export const dummyApi = createApiClient(dummyAxios, 'dummy');
export const mockApi = createApiClient(mockAxios, 'mock');
export const fakeApi = createApiClient(fakeAxios, 'fake');