'use client';

import { useRef } from 'react';
import { useProductStore } from './store';

export default function ProductStoreInitializer({
                                                  products,
                                                }: {
  products: any[];
}) {
  const initialized = useRef(false);

  if (!initialized.current) {
    useProductStore.setState({ products, initialized: true });
    initialized.current = true;
  }

  return null;
}