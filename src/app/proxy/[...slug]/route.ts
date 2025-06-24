import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server';
import { formatDate } from '@/utils/dateUtils';
import {
  baseApi,
  authApi,
  paymentApi,
  dummyApi,
  mockApi,
} from '@/app/_config/domainAxios/apiInstances';
import { dynamic } from '@/app/_config/domainAxios/config';

/**
 * @fileoverview Next.js API 라우트 핸들러
 * @description
 * Next.js의 API 라우트로, 클라이언트의 HTTP 요청을 백엔드 API로 프록시하는 역할을 합니다.
 * GET, POST, PUT, DELETE 메서드를 지원하며, 각 요청에 대한 공통 처리 로직을 포함합니다.
 *
 * @author 안성현
 * @date 2025-06-23
 * @lastModified 2025-06-23
 */

// axios 인스턴스 맵 생성
const axiosInstances = {
  base: baseApi,
  auth: authApi,
  payment: paymentApi,
  dummy: dummyApi,
  mock: mockApi
};

// 커스텀 헤더 이름 정의
const DOMAIN_TYPE_HEADER = 'x-domain-type';

// 공통 요청 데이터 추출 함수
const getCommonRequestData = (req: NextRequest) => {
  const query = req.nextUrl.searchParams;
  const queryObj = Object.fromEntries(query);
  // Headers 객체를 일반 객체로 변환, accept, content-type, authorization, user-agent
  const headersObj= Object.fromEntries(req.headers.entries());
  // RequestCookies 객체를 일반 객체로 변환
  const cookiesObj = Object.fromEntries(
    req.cookies.getAll().map(cookie => [cookie.name, cookie.value])
  );
  // 헤더에서 도메인 타입 추출
  // const domainType = getDomainTypeFromHeader(headersObj);
  const domainType = headersObj[DOMAIN_TYPE_HEADER];
  const apiPath = req.nextUrl.pathname.replace(dynamic[domainType].proxy.path, '');

  return { apiPath, queryObj, headersObj, cookiesObj, domainType };
};

// 필요한 헤더 키들을 상수로 정의
const REQUIRED_HEADERS = ['accept', 'cookie', 'referer', 'user-agent', 'content-type', 'x-domain-type'] as const;

// 필요한 헤더만 필터링하는 함수
const filterHeaders = (headers: Record<string, string>) => {
  return Object.fromEntries(
    Object.entries(headers)
      .filter(([key]) =>
        REQUIRED_HEADERS.includes(key.toLowerCase() as typeof REQUIRED_HEADERS[number])
      )
  );
};

// 에러 처리 공통 함수
const handleError = (error: any) => {
  console.error('API ROUTE: 에러 발생:', error);
  return NextResponse.json(
    { error: 'Internal Server Error' },
    { status: 500 }
  );
};


// 임시 토큰 생성 함수 추가 ( 실제 로그인 API 가 개발되기 전까지 임시로 사용 )
const generateToken = () => {
  const now = new Date();
  const dateTime = formatDate(now, 'YYYYMMDD_HHmmss');
  const randomChars = Array(10)
    .fill(0)
    .map(() => String.fromCharCode(65 + Math.floor(Math.random() * 26)))
    .join('');

  return `${dateTime}_KST_${randomChars}`;
};

// 공통 요청 처리 함수
const handleRequest = async (
  req: NextRequest,
  method: 'get' | 'post' | 'put' | 'delete',
  shouldGetBody = false
) => {
  try {
    const cookieStore = await cookies();
    const { apiPath, queryObj, headersObj, domainType } = getCommonRequestData(req);
    let refreshToken = cookieStore.get('refresh-token')?.value;

    // 특정 상황에만 요청시에만 토큰 생성
    if (!refreshToken) {
      refreshToken = generateToken();
      cookieStore.set('refresh-token', refreshToken, {
        httpOnly: true,
      });
    }

    // POST, PUT 요청 시 body를 가져옴
    const body = shouldGetBody ? await req.json().catch(() => ({})) : undefined;
    // 필요한 headers만 필터링
    const headers = filterHeaders(headersObj);

    // 요청 로깅
    console.log(`API ROUTE: ${method.toUpperCase()} 요청:`, {
      apiPath,
      queryObj,
      ...(body && { body }),
      headers
    });

    const requestConfig = {
      url: apiPath,
      params: queryObj,
      headers: {
        ...headers,
      },
      ...(body && { data: body }),
    };

    // console.log(`API ROUTE: ${method.toUpperCase()} 요청:`, requestConfig);

    // 해당 도메인의 axios 인스턴스 선택
    const axiosInstance = axiosInstances[domainType];

    const response = await axiosInstance[method](requestConfig);
    return NextResponse.json(response);
  } catch (error) {
    return handleError(error);
  }
};

// HTTP 메서드 핸들러
export const GET = (req: NextRequest) => handleRequest(req, 'get');
export const POST = (req: NextRequest) => handleRequest(req, 'post', true);
export const PUT = (req: NextRequest) => handleRequest(req, 'put', true);
export const DELETE = (req: NextRequest) => handleRequest(req, 'delete');


// export async function GET(req: NextRequest) {
//   try {
//     const cookieStore = await cookies();
//     const { apiPath, queryObj, headersObj, cookiesObj } = getCommonRequestData(req);
//     let refreshToken = cookieStore.get('refresh-token')?.value;
//
//
//     // 리프레시 토큰이 없는 경우 새로 생성
//     if (!refreshToken) {
//       refreshToken = generateToken();
//       cookieStore.set('refresh-token', refreshToken, {
//         httpOnly: true,
//         // secure: process.env.NODE_ENV === 'production',
//         // sameSite: 'strict',
//         // path: '/',
//         // maxAge: 60 * 60 * 24 // 1일
//       });
//     }
//
//     console.log('현재 로그 레벨:', process.env.LOG_LEVEL);
//     console.log('토큰 값:', refreshToken);
//     console.log('쿠키 설정:', cookieStore);
//     console.log('API ROUTE: GET 요청:', { apiPath, queryObj, headersObj, cookiesObj });
//
//     const response = await commonAxios.get({
//       url: apiPath,
//       params: queryObj,
//       headersObj,
//       cookies: {
//         ...cookiesObj,
//         'refresh-token': refreshToken,
//       },
//     });
//
//     return NextResponse.json(response);
//   } catch (error) {
//     return handleError(error);
//   }
// }
//
// export async function POST(req: NextRequest) {
//   try {
//     const cookieStore = await cookies();
//     const { apiPath, queryObj, headersObj, cookiesObj } = getCommonRequestData(req);
//     const body = await req.json().catch(() => ({}));
//     let refreshToken = cookieStore.get('refresh-token')?.value;
//
//     console.log('API ROUTE: POST 요청:', { apiPath, queryObj, body, headersObj, cookiesObj });
//
//     const response = await commonAxios.post({
//       url: apiPath,
//       params: queryObj,
//       data: body,
//       headersObj,
//       cookies: {
//         ...cookiesObj,
//         'refresh-token': refreshToken,
//       },
//     });
//
//     return NextResponse.json(response);
//   } catch (error) {
//     return handleError(error);
//   }
// }
//
// export async function PUT(req: NextRequest) {
//   try {
//     const cookieStore = await cookies();
//     const { apiPath, queryObj, headersObj, cookiesObj } = getCommonRequestData(req);
//     const body = await req.json().catch(() => ({}));
//     let refreshToken = cookieStore.get('refresh-token')?.value;
//
//     console.log('API ROUTE: PUT 요청:', { apiPath, queryObj, body });
//
//     const response = await commonAxios.put({
//       url: apiPath,
//       params: queryObj,
//       data: body,
//       headersObj,
//       cookies: {
//         ...cookiesObj,
//         'refresh-token': refreshToken,
//       },
//     });
//
//     return NextResponse.json(response);
//   } catch (error) {
//     return handleError(error);
//   }
// }
//
// export async function DELETE(req: NextRequest) {
//   try {
//     const cookieStore = await cookies();
//     const { apiPath, queryObj, headersObj, cookiesObj } = getCommonRequestData(req);
//     let refreshToken = cookieStore.get('refresh-token')?.value;
//
//     console.log('API ROUTE: DELETE 요청:', { apiPath, queryObj });
//
//     const response = await commonAxios.delete({
//       url: apiPath,
//       params: queryObj,
//       headersObj,
//       cookies: {
//         ...cookiesObj,
//         'refresh-token': refreshToken,
//       },
//     });
//
//     return NextResponse.json(response);
//   } catch (error) {
//     return handleError(error);
//   }
// }
