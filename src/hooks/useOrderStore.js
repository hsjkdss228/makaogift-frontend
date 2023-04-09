import useStore from './useStore';

import { orderStore } from '../stores/OrderStore';

export default function useOrderStore() {
  return useStore(orderStore);
}
