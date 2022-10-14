import useStore from './useStore';

import { transactionStore } from '../stores/TransactionStore';

export default function useTransactionStore() {
  return useStore(transactionStore);
}
