/**
 * @fileoverview 서버 사이드 쿠키 refreshToken 저장
 * @description
 * createAxios.ts 에서 refreshToken 저장이 필요 한 경우 사용
 * 1. axios 는 client,server 같이 사용하는 모듈로 서버 전용 기능은 분리
 * 2. next/headers는 await import로 실행하는 경우에만 사용
 * 3. 쿠키는 httpOnly로 설정하여 클라이언트에서 접근할 수 없도록 함
 *
 * @author 안성현
 * @date 2025-06-25
 * @lastModified 2025-06-25
 */

export const setServerSideRefreshToken = async (refreshToken: string) => {
  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();
  cookieStore.set("refreshToken", refreshToken, {
    httpOnly: true,
  });
};
