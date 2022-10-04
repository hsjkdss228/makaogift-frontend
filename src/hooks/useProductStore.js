import { useEffect } from 'react';

import useForceUpdate from './useForceUpdate';

import { productStore } from '../stores/ProductStore';

export default function useProductStore() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    productStore.subscribe(forceUpdate);

    return () => productStore.unsubscribe(forceUpdate);
  }, [forceUpdate]);

  return productStore;
}
