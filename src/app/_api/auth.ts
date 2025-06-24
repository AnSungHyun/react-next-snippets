import { authApi } from "@/app/_config/domainAxios/apiInstances";

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

// 로그인 요청에 대한 매개변수 타입
export interface LoginRequest {
  username: string;
  password: string;
  expiresInMins?: number; // 선택적, 기본값 60
}

// 토큰 갱신 요청 타입
export interface RefreshTokenRequest {
  refreshToken: string;
  expiresInMins?: number;
}

// 현재 사용자 정보 타입
export interface UserProfile {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}


// 로그인 토큰 발급
export const postLoginApi = (data: LoginRequest): Promise<AuthResponse> => {
  return authApi.post({ url: '/auth/login', data: data });
};

// 현재 인증된 사용자 정보 조회 API
export const getCurrentUserApi = (): Promise<UserProfile> => {
  return authApi.get({ url: '/auth/me' });
};

// 인증 토큰 갱신 API
export const refreshTokenApi = (data: RefreshTokenRequest): Promise<AuthResponse> => {
  return authApi.post({ url: '/auth/refresh', data });
};

// 로그아웃 유틸리티 함수 (클라이언트에서 토큰 제거 용도)
export const logout = (): void => {
  // 여기에 토큰 제거 로직 구현
  // 예: localStorage나 쿠키에서 토큰 제거
};

