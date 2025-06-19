import React from 'react';
import { componentMap } from '../lib/ComponentMap';

export const DynamicComponent = ({ component, props = {} }) => {
  const Component = componentMap[component] || componentMap['NotFound'];
  return <Component {...props} />;
};
