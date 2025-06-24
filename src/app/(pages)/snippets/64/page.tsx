// app/64/page.tsx
'use client';

import { useEffect, useState } from 'react';
import {
  postLoginApi,
  getCurrentUserApi,
  refreshTokenApi,
  UserProfile,
  AuthResponse,
  LoginRequest,
} from '@/app/_api/auth';
import { TokenManager } from '@/utils/tokenManager';

export default function AuthTestPage() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [authResponse, setAuthResponse] = useState<AuthResponse | null>(null);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    // 페이지가 로드될 때 토큰을 확인하고 상태를 업데이트
    const token = TokenManager.getAccessToken();
    if (token) {
      setAccessToken(token);
    } else {
      setAccessToken(null);
    }
  },[])

  // 로그인 테스트
  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const loginData:LoginRequest = {
        username: "emilys",
        password: "emilyspass",
        expiresInMins: 30
      };
      const response = await postLoginApi(loginData);
      setAuthResponse(response);
      // TokenManager를 사용하여 accessToken 저장
      setAccessToken(response.accessToken);
      // TokenManager.setAccessToken(response.accessToken);
      // 공통 axios interceptor response 에서 토큰 저장
      setError('');
    } catch (err) {
      setError('로그인 실패: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setIsLoading(false);
    }
  };

  // 사용자 정보 조회 테스트
  const handleGetUserInfo = async () => {
    setIsLoading(true);
    try {
      // 토큰 존재 여부 확인
      const token = TokenManager.getAccessToken();
      if (!token) {
        throw new Error('접근 토큰이 없습니다. 먼저 로그인해주세요.');
      }

      const userInfo = await getCurrentUserApi();
      setUserProfile(userInfo);
      setError('');
    } catch (err) {
      setError('사용자 정보 조회 실패: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setIsLoading(false);
    }
  };

  // 로그아웃 처리
  const handleLogout = () => {
    try {
      TokenManager.removeAccessToken();
      setAuthResponse(null);
      setUserProfile(null);
      setAccessToken(null);
      setError('');
    } catch (err) {
      setError('로그아웃 실패: ' + (err instanceof Error ? err.message : String(err)));
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">인증 테스트 페이지</h1>

      {/* 테스트 버튼들 */}
      <div className="space-x-4 mb-4">
        {!accessToken ? (
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
          >
            {isLoading ? '처리 중...' : '로그인 테스트'}
          </button>
        ) : (
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            로그아웃
          </button>
        )}

        <button
          onClick={handleGetUserInfo}
          disabled={isLoading || !accessToken}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-green-300"
        >
          사용자 정보 조회
        </button>
      </div>

      {/* 현재 인증 상태 표시 */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          인증 상태: {accessToken ? '로그인됨' : '로그인되지 않음'}
        </p>
      </div>

      {/* 에러 메시지 */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* 인증 응답 정보 표시 */}
      {authResponse && (
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">인증 응답:</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-60">
            {JSON.stringify(authResponse, null, 2)}
          </pre>
        </div>
      )}

      {/* 사용자 프로필 정보 표시 */}
      {userProfile && (
        <div>
          <h2 className="text-xl font-bold mb-2">사용자 프로필:</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-60">
            {JSON.stringify(userProfile, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}