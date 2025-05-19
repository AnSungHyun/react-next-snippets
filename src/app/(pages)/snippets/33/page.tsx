'use client';

import { useState } from 'react';
import CodeBlock from "@/app/_component/CodeBlock";

interface SessionData {
  key: string;
  value: string;
}

const SessionStorageManager: React.FC = () => {
  const [sessionKey, setSessionKey] = useState<string>('');
  const [sessionValue, setSessionValue] = useState<string>('');
  const [sessions, setSessions] = useState<SessionData[]>([]);

  const exampleCodes = {
    setSessionExample:
      `// 세션 스토리지에 값 저장
sessionStorage.setItem('visibleCount', String(visibleCount));`,
    getSessionExample:
      `// 단일 값 조회
const value = sessionStorage.getItem('visibleCount');

// 모든 세션 스토리지 값 조회
const all = { ...sessionStorage };`,
    removeSessionExample:
      `// 단일 값 삭제
sessionStorage.removeItem('visibleCount');

// 전체 삭제
sessionStorage.clear();`
  };

  // 모든 세션 스토리지 값 조회
  const getAllSessions = () => {
    const sessionArray: SessionData[] = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key) {
        sessionArray.push({ key, value: sessionStorage.getItem(key) ?? '' });
      }
    }
    setSessions(sessionArray);
  };

  // 세션 스토리지에 값 저장
  const setSession = () => {
    if (sessionKey && sessionValue) {
      sessionStorage.setItem(sessionKey, sessionValue);
      getAllSessions();
      setSessionKey('');
      setSessionValue('');
    } else {
      alert('세션 키와 값을 모두 입력해주세요.');
    }
  };

  // 특정 세션 값 삭제
  const removeSession = (key: string) => {
    sessionStorage.removeItem(key);
    setSessions(prev => prev.filter(session => session.key !== key));
  };

  // 전체 세션 스토리지 값 삭제
  const clearAllSessions = () => {
    if (window.confirm('모든 세션 스토리지 값을 삭제하시겠습니까?')) {
      sessionStorage.clear();
      setSessions([]);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">세션 스토리지 관리</h2>

      <div className="space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={sessionKey}
            onChange={(e) => setSessionKey(e.target.value)}
            placeholder="세션 키를 입력하세요"
            className="border p-2 rounded flex-1"
          />
          <input
            type="text"
            value={sessionValue}
            onChange={(e) => setSessionValue(e.target.value)}
            placeholder="세션 값을 입력하세요"
            className="border p-2 rounded flex-1"
          />
        </div>

        <div className="space-x-2">
          <button
            onClick={setSession}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            세션 저장
          </button>
          <button
            onClick={getAllSessions}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            모든 세션 조회
          </button>
          <button
            onClick={clearAllSessions}
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            전체 삭제
          </button>
        </div>

        {sessions.length > 0 && (
          <div className="mt-4">
            <h3 className="font-bold mb-2">저장된 세션 목록:</h3>
            <div className="space-y-2">
              {sessions.map((session) => (
                <div
                  key={session.key}
                  className="flex items-center justify-between bg-gray-50 p-3 rounded"
                >
                  <div>
                    <span className="font-semibold">{session.key}:</span> {session.value}
                  </div>
                  <button
                    onClick={() => removeSession(session.key)}
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

      {/* 세션 스토리지 설명 섹션 */}
      <div className="mb-8 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">💾 세션 스토리지 작업 가이드</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-blue-600 mb-2">
              1. 값 저장
            </h3>
            <CodeBlock
              language="javascript"
              value={exampleCodes.setSessionExample}
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-green-600 mb-2">
              2. 값 조회
            </h3>
            <CodeBlock
              language="javascript"
              value={exampleCodes.getSessionExample}
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-red-600 mb-2">
              3. 값 삭제
            </h3>
            <CodeBlock
              language="javascript"
              value={exampleCodes.removeSessionExample}
            />
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-yellow-700 mb-2">
              ⚠️ 주의사항
            </h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-yellow-800">
              <li>세션 스토리지는 클라이언트 사이드에서만 접근 가능</li>
              <li>브라우저 탭/창을 닫으면 데이터가 사라짐</li>
              <li>민감한 정보는 저장하지 않는 것이 좋음</li>
              <li>용량 제한(약 5MB)이 있음</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionStorageManager;