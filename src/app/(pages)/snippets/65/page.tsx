'use client'

import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
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
const BASE_URL = 'http://localhost:3010';

export default function KakaoLoginPage() {
  const [loginData, setLoginData] = useState<{
    code?: string;
    tokenData?: KakaoTokenData;
    userData?: KakaoUserData;
  }>({});

  const handleKakaoLogin = () => {
    const REDIRECT_URI = `${BASE_URL}/auth/kakao/callback`;
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    window.location.href = kakaoURL;
  };

  const handleKakaoLoginPopup = () => {
    const REDIRECT_URI = `${BASE_URL}/auth/kakao/popupCallback`;
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    const width = 500;
    const height = 600;
    const left = (window.screen.width / 2) - (width / 2);
    const top = (window.screen.height / 2) - (height / 2);

    window.open(
      kakaoURL,
      '카카오 로그인',
      `width=${width},height=${height},left=${left},top=${top},location=no,status=no,scrollbars=yes`
    );
  };

  const getKakaoToken = async (code: string): Promise<KakaoTokenData> => {
    const response = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: KAKAO_CLIENT_ID,
        redirect_uri: `${BASE_URL}/auth/kakao/popupCallback`,
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
    const handleMessage = async (event: MessageEvent) => {
      if (event.data.type === 'KAKAO_LOGIN_SUCCESS') {
        try {
          const code = event.data.code;
          const tokenData = await getKakaoToken(code);
          const userData = await getKakaoUserInfo(tokenData.access_token);

          setLoginData({
            code,
            tokenData,
            userData,
          });
        } catch (error) {
          console.error('로그인 처리 중 오류:', error);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className={styles.container}>
      <Button
        className={styles.kakaoButton}
        onClick={handleKakaoLogin}
        variant="contained"
      >
        카카오 로그인
      </Button>

      <Button
        className={styles.kakaoButton}
        onClick={handleKakaoLoginPopup}
        variant="contained"
      >
        카카오 로그인 (팝업)
      </Button>

      {loginData.code && (
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
      )}
    </div>
  );
}