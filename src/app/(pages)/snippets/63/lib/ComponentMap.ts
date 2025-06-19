import React from 'react';

export const componentMap: Record<string, React.ComponentType<any>> = {
  ProductCard: React.lazy(() => import('../components/ProductCard')),
  BannerBlock: React.lazy(() => import('../components/BannerBlock')),
  EventNotice: React.lazy(() => import('../components/EventNotice')),
  NotFound: React.lazy(() => import('../components/NotFound')),
};
