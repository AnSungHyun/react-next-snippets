// pages/api/proxy/route.ts
// import { NextRequest, NextResponse } from 'next';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import qs from 'qs';
import { ProductResponse } from '@/app/_api/GetProduct';
import commonAxios from '@/app/_config/axios/commonAxios';

const API_BASE_URL = 'https://dummyjson.com'; // Backend API URL 설정

export async function GET(req: NextRequest) {
  const apiPath = req.nextUrl.pathname.replace('/proxy', ''); // '/api/proxy' 부분 제거
  const query = req.nextUrl.searchParams; // 쿼리 파라미터 가져오기
  const queryObj = Object.fromEntries(query);
  // const queryString = qs.stringify(Object.fromEntries(query), { encode: true });
  // const apiUrl = `${API_BASE_URL}${apiPath}${queryString ? `?${queryString}` : ''}`; // 최종 API
  const body = await req.json().catch(() => ({})); // POST, PUT 요청의 경우 본문 데이터 가져오기
  const headers = req.headers;
  const customHeaderUserAgent = headers.get('user-agent') || 'ncp-android';
  const cookies = req.cookies;
  const accessToken = cookies['ncp-access-token']; // 특정 쿠키 값 가져오기

  //
  // // 클라이언트가 요청한 URL 경로를 가져옵니다.
  // // 예: /api/proxy/product/100001
  // const apiPath = req.url?.replace('/api/proxy', ''); // '/api/proxy' 부분 제거
  // const apiUrl = `${API_BASE_URL}${apiPath}`; // 최종 API URL 생성

  console.log('-------------------------------------------------------------------------------');
  console.log('apiPath', apiPath);
  // console.log('apiUrl', apiUrl);
  console.log('queryOrg', queryObj);
  // console.log('query', queryString);
  console.log('body', body);

  // console.log('method', method);
  // console.log('query', query);
  // console.log('body', body);
  console.log('-------------------------------------------------------------------------------');
  try {
    const response = await commonAxios.get({ url: apiPath, params: queryObj });
    // console.log('전체 응답:', response);
    return NextResponse.json(response);

  } catch (error) {
    console.error('에러 발생:', error);
    return NextResponse.json({'error': 'Internal Server Error'}, { status: 500 });
  }


  // return Response.json({ message: 'Hello, this is a proxy route!' });
  // try {
  //   // Axios를 통한 API 요청
  //   const response = await axios({
  //     method: method, // GET, POST, PUT, DELETE 등
  //     url: apiUrl, // 변환된 API URL
  //     data: body, // POST, PUT 요청의 경우 본문 데이터
  //     headers: {
  //       'Content-Type': 'application/json',
  //       ...req.headers, // 클라이언트의 헤더를 그대로 전달
  //     },
  //   });
  //
  //   // API 응답을 클라이언트에 전달
  //   res.status(response.status).json(response.data);
  // } catch (error) {
  //   // 오류 처리
  //   if (axios.isAxiosError(error)) {
  //     res.status(error.response?.status || 500).json(error.response?.data || { message: 'Internal Server Error' });
  //   } else {
  //     res.status(500).json({ message: 'Internal Server Error' });
  //   }
  // }
}


export async function POST(req: NextRequest, res: NextResponse) {
  const method = req.method;
  const apiPath = req.nextUrl.pathname.replace('/proxy', ''); // '/api/proxy' 부분 제거
  const query = req.nextUrl.searchParams; // 쿼리 파라미터 가져오기
  const queryString = qs.stringify(Object.fromEntries(query), { encode: true });
  const apiUrl = `${API_BASE_URL}${apiPath}${queryString ? `?${queryString}` : ''}`; // 최종 API
  const body = await req.json().catch(() => ({})); // POST, PUT 요청의 경우 본문 데이터 가져오기
  const headers = req.headers;
  const customHeaderUserAgent = headers.get('user-agent') || 'ncp-android';
  const cookies = req.cookies;
  const accessToken = cookies['ncp-access-token']; // 특정 쿠키 값 가져오기

  // const { method, query, body } = req;
  // const { path } = query; // path는 URL의 경로 매개변수로 사용됩니다.
  //
  // // 클라이언트가 요청한 URL 경로를 가져옵니다.
  // // 예: /api/proxy/product/100001
  // const apiPath = req.url?.replace('/api/proxy', ''); // '/api/proxy' 부분 제거
  // const apiUrl = `${API_BASE_URL}${apiPath}`; // 최종 API URL 생성

  console.log('-------------------------------------------------------------------------------');
  console.log('method', method);
  console.log('apiPath', apiPath);
  console.log('apiUrl', apiUrl);
  console.log('query', queryString);
  console.log('body', body);
  console.log('headers', headers);
  console.log('cookies', cookies);

  // console.log('method', method);
  // console.log('query', query);
  // console.log('body', body);
  console.log('-------------------------------------------------------------------------------');

  return Response.json({ message: 'Hello, this is a proxy route!' });
  // try {
  //   // Axios를 통한 API 요청
  //   const response = await axios({
  //     method: method, // GET, POST, PUT, DELETE 등
  //     url: apiUrl, // 변환된 API URL
  //     data: body, // POST, PUT 요청의 경우 본문 데이터
  //     headers: {
  //       'Content-Type': 'application/json',
  //       ...req.headers, // 클라이언트의 헤더를 그대로 전달
  //     },
  //   });
  //
  //   // API 응답을 클라이언트에 전달
  //   res.status(response.status).json(response.data);
  // } catch (error) {
  //   // 오류 처리
  //   if (axios.isAxiosError(error)) {
  //     res.status(error.response?.status || 500).json(error.response?.data || { message: 'Internal Server Error' });
  //   } else {
  //     res.status(500).json({ message: 'Internal Server Error' });
  //   }
  // }
}