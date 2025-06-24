// components/ExternalService/ExternalService.tsx
import React from 'react';
import styles from './ExternalService.module.css';

interface ExternalServiceProps {
  title: string;
  items: string[];
  onButtonClick?: () => void;
}

export const ExternalService: React.FC<ExternalServiceProps> = ({
                                                                  title,
                                                                  items,
                                                                  onButtonClick
                                                                }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title2}>{title}</h2>
      <h2 className={styles.title}>{title}</h2>
      <button
        className={styles.button}
        onClick={onButtonClick}
      >
        외부 서비스 액션
      </button>
      <div className={styles.content}>
        <ul className={styles.list}>
          {items.map((item, index) => (
            <li key={index} className={styles.listItem}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};