/**
 * @fileoverview Token 관련 Cookie 저장 로직 관리
 * @description
 * 로그인 후 accessToken 저장 및 삭제시 사용
 * 1. TokenManager는 주로 client 에서 쿠키를 세팅하는 경우 사용
 * 2. setSErverSideRefreshToken 는 server에서 httpOnly 쿠키 생성시 사용
 *    - next/headers는 await import로 실행하는 경우에만 사용
 * 3. 쿠키는 httpOnly로 설정하여 클라이언트에서 접근할 수 없도록 함
 *
 * @author 안성현
 * @date 2025-06-25
 * @lastModified 2025-06-25
 */

import Cookies from 'js-cookie';

export const TokenManager = {
  setAccessToken: (token: string) => {
    Cookies.set('accessToken', token, {
      expires: 1/48, // 30분
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
  },

  getAccessToken: () => {
    return Cookies.get('accessToken');
  },

  removeAccessToken: () => {
    Cookies.remove('accessToken', { path: '/' });
    // httpOnly cookie 는 삭제되지 않음.
    Cookies.remove('refreshToken', { path: '/' });
  },
};

export const setServerSideRefreshToken = async (refreshToken: string) => {
  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();
  cookieStore.set('refreshToken', refreshToken, { httpOnly: true });
};

export const getServerSideAccessToken = async (): Promise<string> => {
  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();
  return cookieStore.get('accessToken')?.value as string;
};