import useStore from './useStore';

import { productStore } from '../stores/ProductStore';

export default function useProductStore() {
  return useStore(productStore);
}
