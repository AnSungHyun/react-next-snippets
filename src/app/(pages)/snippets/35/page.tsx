'use client';

import { useState, useEffect } from 'react';
import CodeBlock from '@/app/_component/CodeBlock';

interface StorageData {
  key: string;
  value: string;
}

const LocalStorageManager: React.FC = () => {
  const [storageKey, setStorageKey] = useState<string>('');
  const [storageValue, setStorageValue] = useState<string>('');
  const [storageItems, setStorageItems] = useState<StorageData[]>([]);

  const exampleCodes = {
    setStorageExample:
      `// localStorage 설정
localStorage.setItem('key', 'value');

// 객체 저장 시
const data = { name: 'John', age: 30 };
localStorage.setItem('userData', JSON.stringify(data));`,

    getStorageExample:
      `// 단일 항목 조회
const value = localStorage.getItem('key');

// 객체 조회 시
const userData = JSON.parse(localStorage.getItem('userData') || '{}');

// 모든 항목 조회
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  const value = localStorage.getItem(key);
}`,

    removeStorageExample:
      `// 단일 항목 삭제
localStorage.removeItem('key');

// 모든 항목 삭제
localStorage.clear();`
  };

  // 브라우저에서만 실행되도록 처리
  useEffect(() => {
    getAllItems();
  }, []);

  // 모든 localStorage 항목 조회
  const getAllItems = () => {
    const items: StorageData[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        const value = localStorage.getItem(key) || '';
        items.push({ key, value });
      }
    }
    setStorageItems(items);
  };

  // localStorage 항목 설정
  const setStorageItem = () => {
    if (storageKey && storageValue) {
      try {
        localStorage.setItem(storageKey, storageValue);
        getAllItems(); // 목록 갱신
        setStorageKey('');
        setStorageValue('');
      } catch (e) {
        alert('localStorage 저장 중 오류가 발생했습니다.');
      }
    } else {
      alert('키와 값을 모두 입력해주세요.');
    }
  };

  // localStorage 항목 삭제
  const removeStorageItem = (key: string) => {
    localStorage.removeItem(key);
    getAllItems(); // 목록 갱신
  };

  // 모든 항목 삭제
  const clearStorage = () => {
    if (window.confirm('모든 항목을 삭제하시겠습니까?')) {
      localStorage.clear();
      setStorageItems([]);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Local Storage 관리</h2>

      <div className="space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={storageKey}
            onChange={(e) => setStorageKey(e.target.value)}
            placeholder="키를 입력하세요"
            className="border p-2 rounded flex-1"
          />
          <input
            type="text"
            value={storageValue}
            onChange={(e) => setStorageValue(e.target.value)}
            placeholder="값을 입력하세요"
            className="border p-2 rounded flex-1"
          />
        </div>

        <div className="space-x-2">
          <button
            onClick={setStorageItem}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            저장
          </button>
          <button
            onClick={getAllItems}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            새로고침
          </button>
          <button
            onClick={clearStorage}
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            전체 삭제
          </button>
        </div>

        {storageItems.length > 0 && (
          <div className="mt-4">
            <h3 className="font-bold mb-2">저장된 항목 목록:</h3>
            <div className="space-y-2">
              {storageItems.map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between bg-gray-50 p-3 rounded"
                >
                  <div>
                    <span className="font-semibold">{item.key}:</span>{' '}
                    {item.value}
                  </div>
                  <button
                    onClick={() => removeStorageItem(item.key)}
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

      {/* 가이드 섹션 */}
      <div className="mt-8 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">💾 Local Storage 가이드</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-blue-600 mb-2">
              1. 데이터 저장
            </h3>
            <CodeBlock
              language="javascript"
              value={exampleCodes.setStorageExample}
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-green-600 mb-2">
              2. 데이터 조회
            </h3>
            <CodeBlock
              language="javascript"
              value={exampleCodes.getStorageExample}
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-red-600 mb-2">
              3. 데이터 삭제
            </h3>
            <CodeBlock
              language="javascript"
              value={exampleCodes.removeStorageExample}
            />
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-yellow-700 mb-2">
              ⚠️ 주의사항
            </h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-yellow-800">
              <li>클라이언트 사이드에서만 접근 가능 ('use client' 필요)</li>
              <li>저장 용량은 브라우저별로 약 5-10MB로 제한됨</li>
              <li>민감한 정보는 저장하지 않는 것이 좋음</li>
              <li>문자열만 저장 가능 (객체는 JSON.stringify 사용)</li>
              <li>동일 출처(Same Origin) 정책이 적용됨</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocalStorageManager;