// pages/ExternalServiceDemo.tsx
"use client"

import React from 'react';
// import { ExternalServiceContainer } from '../ExternalServiceContainer';
import styles from './page.module.css';
import { ExternalServiceContainer } from './ExternalServiceContainer';

const ExternalServiceDemo: React.FC = () => {
  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.mainTitle}>
        외부 서비스 통합 데모
      </h1>
      <p>
        - Shadow DOM을 사용하여 CSS 격리
      </p>
      <p>
        - .button 클래스를 외부, 내부에 동일하게 .button 으로 global 선언 하였으나, 각각 격리되어 다른 버튼을 표현할 수 있음.
      </p>
      <button
        className={styles.button}
      >
        내부 서비스 액션
      </button>

      <ExternalServiceContainer instanceId="A" />
      <ExternalServiceContainer instanceId="B" />
    </div>
  );
};

export default ExternalServiceDemo;