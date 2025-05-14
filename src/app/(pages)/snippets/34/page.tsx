'use client';

import { useState } from 'react';
import Cookies from 'js-cookie';
import CodeBlock from "@/app/_component/CodeBlock";

interface CookieData {
  key: string;
  value: string;
}

const CookieManager: React.FC = () => {
  const [cookieKey, setCookieKey] = useState<string>('');
  const [cookieValue, setCookieValue] = useState<string>('');
  const [cookies, setCookies] = useState<CookieData[]>([]);

  const exampleCodes = {
    setCookieExample:
      `// 쿠키 설정
Cookies.set('key', 'value', {
  expires: 7,     // 만료일 (일 단위)
  path: '/',      // 쿠키 경로
  secure: true,   // HTTPS 전용
  sameSite: 'strict'  // CSRF 보호
});`,
    getCookieExample:
      `// 단일 쿠키 조회
const value = Cookies.get('key');

// 모든 쿠키 조회
const allCookies = Cookies.get();`,
    removeCookieExample:
      `// 단일 쿠키 삭제
Cookies.remove('key', { path: '/' });

// 모든 쿠키 삭제
Object.keys(Cookies.get()).forEach(key => {
  Cookies.remove(key, { path: '/' });
});`

  };


  // 모든 쿠키 조회
  const getAllCookies = () => {
    const allCookies = Cookies.get();
    const cookieArray: CookieData[] = Object.entries(allCookies).map(([key, value]) => ({
      key,
      value
    }));
    setCookies(cookieArray);
  };

  // 쿠키 설정
  const setCookie = () => {
    if (cookieKey && cookieValue) {
      Cookies.set(cookieKey, cookieValue, {
        expires: 7,
        path: '/'
      });
      getAllCookies(); // 저장 후 목록 갱신
      // 입력 필드 초기화
      setCookieKey('');
      setCookieValue('');
    } else {
      alert('쿠키 키와 값을 모두 입력해주세요.');
    }
  };

  // 특정 쿠키 삭제
  const removeCookie = (key: string) => {
    Cookies.remove(key, { path: '/' });
    setCookies(prevCookies => prevCookies.filter(cookie => cookie.key !== key));
  };

  // 모든 쿠키 삭제
  const clearAllCookies = () => {
    if (window.confirm('모든 쿠키를 삭제하시겠습니까?')) {
      const allCookies = Cookies.get();
      Object.keys(allCookies).forEach(key => {
        Cookies.remove(key, { path: '/' });
      });
      setCookies([]);
    }
  };


  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">쿠키 관리</h2>

      <div className="space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={cookieKey}
            onChange={(e) => setCookieKey(e.target.value)}
            placeholder="쿠키 키를 입력하세요"
            className="border p-2 rounded flex-1"
          />
          <input
            type="text"
            value={cookieValue}
            onChange={(e) => setCookieValue(e.target.value)}
            placeholder="쿠키 값을 입력하세요"
            className="border p-2 rounded flex-1"
          />
        </div>

        <div className="space-x-2">
          <button
            onClick={setCookie}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            쿠키 저장
          </button>
          <button
            onClick={getAllCookies}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            모든 쿠키 조회
          </button>
          <button
            onClick={clearAllCookies}
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            전체 삭제
          </button>

        </div>

        {cookies.length > 0 && (
          <div className="mt-4">
            <h3 className="font-bold mb-2">저장된 쿠키 목록:</h3>
            <div className="space-y-2">
              {cookies.map((cookie) => (
                <div
                  key={cookie.key}
                  className="flex items-center justify-between bg-gray-50 p-3 rounded"
                >
                  <div>
                    <span className="font-semibold">{cookie.key}:</span> {cookie.value}
                  </div>
                  <button
                    onClick={() => removeCookie(cookie.key)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                  >
                    삭제
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 쿠키 설명 섹션 */}
      <div className="mb-8 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">🍪 쿠키 작업 가이드</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-blue-600 mb-2">
              1. 쿠키 설정
            </h3>
            <CodeBlock
              language="javascript"
              value={exampleCodes.setCookieExample}
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-green-600 mb-2">
              2. 쿠키 조회
            </h3>
            <CodeBlock
              language="javascript"
              value={exampleCodes.getCookieExample}
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-red-600 mb-2">
              3. 쿠키 삭제
            </h3>
            <CodeBlock
              language="javascript"
              value={exampleCodes.removeCookieExample}
            />
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-yellow-700 mb-2">
              ⚠️ 주의사항
            </h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-yellow-800">
              <li>클라이언트 사이드에서만 접근 가능 ('use client' 필요)</li>
              <li>민감한 정보는 쿠키에 저장하지 않는 것이 좋음</li>
              <li>쿠키 크기는 4KB로 제한됨</li>
              <li>보안이 중요한 경우 httpOnly, secure 옵션 사용 권장</li>
            </ul>
          </div>
        </div>
      </div>



    </div>
  );
};

export default CookieManager;