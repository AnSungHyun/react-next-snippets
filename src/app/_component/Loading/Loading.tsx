// Loading.tsx
import React from 'react';
import styles from './Loading.module.css';

interface LoadingProps {
  minHeight?: string | number;
}

const Loading: React.FC<LoadingProps> = ({ minHeight }) => {
  return (
    <div
      className={styles.loaderContainer}
      style={minHeight ? { minHeight } : undefined}
    >
      <div className={styles.loader}></div>
    </div>
  );
};

export default Loading;