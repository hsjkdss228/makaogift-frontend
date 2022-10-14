import context from 'jest-plugin-context';
import { apiService } from '../services/ApiService';
import TransactionStore from './TransactionStore';

jest.mock('../services/PagingService', () => ({
  pagingService: {
    calculatePageCount: ({ pageSize, totalPageSize }) => {
      if (pageSize === 1 && totalPageSize === 3) {
        return 1;
      }

      if (pageSize === 8 && totalPageSize === 64) {
        return 8;
      }

      return 0;
    },
  },
}));

describe('주문 내역 목록 조회', () => {
  const transactionStore = new TransactionStore();
  apiService.setAccessToken('TOKEN');

  context('한번에 8개의 주문 내역을 출력하고, 총 주문 내역이 3개인 상태에서 1번째 페이지를 확인하는 경우', () => {
    it('3개의 주문 내역에 대한 상태 저장', async () => {
      await transactionStore.fetchTransactions(1);
      transactionStore.setCurrentPage(1);

      expect(transactionStore.transactions.length).toBe(3);
      expect(transactionStore.transactions[0].receiver).toBe('서상원');
      expect(transactionStore.transactions[1].receiver).toBe('박기윤');
      expect(transactionStore.transactions[2].receiver).toBe('김도헌');
      expect(transactionStore.pagesCount).toBe(1);
      expect(transactionStore.currentPage).toBe(1);
    });
  });

  context('한번에 8개의 상품을 출력하고, 총 주문 내역이 64개인 상태에서 7번째 페이지를 확인하는 경우', () => {
    it('8개의 주문 내역에 대한 상태 저장', async () => {
      await transactionStore.fetchTransactions(7);
      transactionStore.setCurrentPage(7);

      expect(transactionStore.transactions.length).toBe(8);
      expect(transactionStore.transactions[0].address).toBe('주소 49');
      expect(transactionStore.transactions[1].address).toBe('주소 50');
      expect(transactionStore.transactions[2].address).toBe('주소 51');
      expect(transactionStore.transactions[3].address).toBe('주소 52');
      expect(transactionStore.transactions[4].address).toBe('주소 53');
      expect(transactionStore.transactions[5].address).toBe('주소 54');
      expect(transactionStore.transactions[6].address).toBe('주소 55');
      expect(transactionStore.transactions[7].address).toBe('주소 56');
      expect(transactionStore.pagesCount).toBe(8);
      expect(transactionStore.currentPage).toBe(7);
    });
  });
});

describe('상세 주문 내역 조회', () => {
  const transactionStore = new TransactionStore();

  context('특정 id에 해당하는 상세 주문 내역을 불러올 경우', () => {
    it('transaction 상태에 데이터를 저장', async () => {
      await transactionStore.fetchTransaction(1);

      expect(transactionStore.transaction.id).toBe(1);
      expect(transactionStore.transaction.purchaseCount).toBe(2);
      expect(transactionStore.transaction.purchaseCost).toBe(2800000);
      expect(transactionStore.transaction.receiver).toBe('황인우');
      expect(transactionStore.transaction.address).toBe('자양전통시장');
      expect(transactionStore.transaction.messageToSend).toBe('자전거 두대');
    });
  });
});
