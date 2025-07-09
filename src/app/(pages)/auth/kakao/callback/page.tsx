
'use client'

import React, { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import styles from './page.module.css';

interface KakaoTokenData {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
}

interface KakaoUserData {
  id: number;
  properties?: {
    nickname?: string;
  };
  kakao_account?: {
    email?: string;
  };
}

const KAKAO_CLIENT_ID = '636ed71092f07f282925dc588846411a';
const BASE_URL = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3010';

const KakaoCallbackPage: React.FC = () => {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loginData, setLoginData] = useState<{
    code?: string;
    tokenData?: KakaoTokenData;
    userData?: KakaoUserData;
  }>({});

  const code = searchParams.get('code');
  const errorParam = searchParams.get('error');
  const error_description = searchParams.get('error_description');

  const getKakaoToken = async (code: string): Promise<KakaoTokenData> => {
    const response = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: KAKAO_CLIENT_ID,
        redirect_uri: `${BASE_URL}/auth/kakao/callback`,
        code,
      }),
    });

    if (!response.ok) {
      throw new Error('토큰 발급에 실패했습니다.');
    }

    return response.json();
  };

  const getKakaoUserInfo = async (accessToken: string): Promise<KakaoUserData> => {
    const response = await fetch('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('사용자 정보 조회에 실패했습니다.');
    }

    return response.json();
  };

  useEffect(() => {
    const fetchData = async () => {
      if (errorParam) {
        setError(error_description || '로그인 중 오류가 발생했습니다.');
        setLoading(false);
        return;
      }

      if (!code) {
        setError('인가 코드가 없습니다.');
        setLoading(false);
        return;
      }

      try {
        const tokenData = await getKakaoToken(code);
        const userData = await getKakaoUserInfo(tokenData.access_token);

        setLoginData({
          code,
          tokenData,
          userData,
        });
      } catch (error) {
        setError(error instanceof Error ? error.message : '로그인 처리 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [code, errorParam, error_description]);

  if (loading) {
    return <div className={styles.container}>로딩 중...</div>;
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.resultContainer}>
          <div className={styles.resultTitle}>로그인 오류</div>
          <div className={styles.resultItem}>
            <span className={styles.resultValue}>{error}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.resultContainer}>
        <div className={styles.resultTitle}>카카오 로그인 결과</div>

        <div className={styles.resultItem}>
          <span className={styles.resultLabel}>인증 코드:</span>
          <span className={styles.resultValue}>{loginData.code}</span>
        </div>

        {loginData.tokenData && (
          <div className={styles.resultItem}>
            <span className={styles.resultLabel}>액세스 토큰:</span>
            <span className={styles.resultValue}>
              {`${loginData.tokenData.access_token.substring(0, 10)}...`}
            </span>
          </div>
        )}

        {loginData.userData && (
          <>
            <div className={styles.resultItem}>
              <span className={styles.resultLabel}>사용자 ID:</span>
              <span className={styles.resultValue}>{loginData.userData.id}</span>
            </div>
            <div className={styles.resultItem}>
              <span className={styles.resultLabel}>닉네임:</span>
              <span className={styles.resultValue}>
                {loginData.userData.properties?.nickname || '없음'}
              </span>
            </div>
            <div className={styles.resultItem}>
              <span className={styles.resultLabel}>이메일:</span>
              <span className={styles.resultValue}>
                {loginData.userData.kakao_account?.email || '없음'}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default KakaoCallbackPage;