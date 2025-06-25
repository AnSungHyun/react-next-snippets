// 별도의 서버 사이드 유틸리티 함수로 분리
// import { cookies } from 'next/headers';
export const setServerSideRefreshToken = async (refreshToken: string) => {
  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();
  // const token = cookieStore.get("x-access-token")?.value;
  cookieStore.set("refreshToken", refreshToken, {
    httpOnly: true,
  });
  console.log("토큰생성완료 : ", refreshToken);
};
