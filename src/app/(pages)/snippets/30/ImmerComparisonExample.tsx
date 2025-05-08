"use client"

import { produce } from 'immer';
import { useState } from 'react';
import CodeBlock from "@/app/_component/CodeBlock";

interface DeepUser {
  id: number;
  name: string;
  address: {
    city: string;
    detail: {
      street: string;
      zipCode: string;
    }
  }
}

const ImmerComparisonExample = () => {
  // 중첩된 객체 구조를 가진 초기 상태
  const initialUser: DeepUser = {
    id: 1,
    name: "홍길동",
    address: {
      city: "서울",
      detail: {
        street: "강남대로",
        zipCode: "12345"
      }
    }
  };

  const [userWithImmer, setUserWithImmer] = useState<DeepUser>(initialUser);
  const [userWithoutImmer, setUserWithoutImmer] = useState<DeepUser>(initialUser);

  // Immer를 사용한 업데이트
  const updateWithImmer = () => {
    setUserWithImmer(
      produce(draft => {
        draft.address.detail.street = "삼성로";
        draft.address.city = "부산";
      })
    );
  };

  // Immer 없이 업데이트
  const updateWithoutImmer = () => {
    setUserWithoutImmer({
      ...userWithoutImmer,
      address: {
        ...userWithoutImmer.address,
        city: "부산",
        detail: {
          ...userWithoutImmer.address.detail,
          street: "삼성로"
        }
      }
    });
  };

  return (
    <div>
      <h2>Immer 사용 비교 예제</h2>

      <div style={{ marginBottom: '20px' }}>
        <h3>1. Immer를 사용한 코드</h3>
        <CodeBlock
          language="typescript"
          value={`
const updateWithImmer = () => {
  setUserWithImmer(
    produce(draft => {
      draft.address.detail.street = "삼성로";
      draft.address.city = "부산";
    })
  );
};`}
        />
        <button onClick={updateWithImmer}>Immer로 업데이트</button>
        <pre>{JSON.stringify(userWithImmer, null, 2)}</pre>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>2. Immer 없이 작성한 코드</h3>
        <CodeBlock
          language="typescript"
          value={`
const updateWithoutImmer = () => {
  setUserWithoutImmer({
    ...userWithoutImmer,
    address: {
      ...userWithoutImmer.address,
      city: "부산",
      detail: {
        ...userWithoutImmer.address.detail,
        street: "삼성로"
      }
    }
  });
};`}
        />
        <button onClick={updateWithoutImmer}>일반적인 방식으로 업데이트</button>
        <pre>{JSON.stringify(userWithoutImmer, null, 2)}</pre>
      </div>
    </div>
  );
};

export default ImmerComparisonExample;