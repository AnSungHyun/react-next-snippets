import {NextResponse} from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;

  const response = NextResponse.next();

  // CORS 헤더 추가
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

  // 보안 헤더 추가
  response.headers.set('X-Content-Type-Options', 'nosniff');

  // 세션이 필요한 경로
  const protectedPaths = ['/mypage', '/order'];
  // 세션이 없어야 하는 경로
  // const publicPaths = ['/login', '/signup'];
  const publicPaths = [];

  // 세션이 필요한 경로에 접근할 경우
  if (protectedPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL('/login', req.url)); // 로그인 페이지로 리다이렉트
  }
0
  // 세션이 없어야 하는 경로에 접근할 경우
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL('/', req.url)); // 홈 페이지로 리다이렉트
  }

  return NextResponse.next(); // 미들웨어를 통과
}

export const config = {
  // 전체 페이지를 받되, 정적 컨텐츠 css,js 같은 파일은 제외
  matcher: ['/:path*', '/((?!api|_next/static|_next/image|favicon.ico).*)'],
  // matcher: ["/:path*",], // 전체 페이지
  // matcher: ['/mypage/:path*'], // matcher는 개별 middleware 적용이 안되서 모든 요청을 기본적으로 받게함.
};
