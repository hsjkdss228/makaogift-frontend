import Store from './Store';

import { apiService } from '../services/ApiService';
import { pagingService } from '../services/PagingService';

export default class TransactionStore extends Store {
  constructor() {
    super();

    this.transactions = [];
    this.pagesCount = 0;
  }

  async fetchTransactions(page) {
    const {
      transactions, pageSize, totalTransactionsSize,
    } = await apiService.fetchTransactions(page);

    this.transactions = transactions;
    this.pagesCount = pagingService.calculatePageCount({
      pageSize, totalPageSize: totalTransactionsSize,
    });
    this.publish();
  }
}

export const transactionStore = new TransactionStore();
