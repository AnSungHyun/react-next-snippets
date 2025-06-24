// components/ExternalService/ExternalServiceContainer.tsx
import React from 'react';
import { ExternalService } from './ExternalService';
import styles from './page.module.css';

interface ExternalServiceContainerProps {
  instanceId: string;
}

export const ExternalServiceContainer: React.FC<ExternalServiceContainerProps> = ({
                                                                                    instanceId
                                                                                  }) => {
  const handleButtonClick = () => {
    console.log(`외부 서비스 버튼 클릭 - 인스턴스 ${instanceId}`);
  };

  const sampleItems = [
    '외부 서비스 항목 1',
    '외부 서비스 항목 2',
    '외부 서비스 항목 3'
  ];

  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>
        외부 서비스 인스턴스 {instanceId}
      </h3>
      <ExternalService
        title={`외부 서비스 ${instanceId}`}
        items={sampleItems}
        onButtonClick={handleButtonClick}
      />
    </div>
  );
};