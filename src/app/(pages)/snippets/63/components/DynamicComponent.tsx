import React, { Suspense } from 'react';
import { componentMap } from '../lib/ComponentMap';

export const DynamicComponent = ({ component, props = {} }) => {
  const Component = componentMap[component] || componentMap['NotFound'];
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <Component {...props} />
    </Suspense>
  );
};
