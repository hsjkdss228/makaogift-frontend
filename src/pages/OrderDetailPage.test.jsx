import { render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';
import OrderDetailPage from './OrderDetailPage';

let orderId;

jest.mock('react-router-dom', () => ({
  useLocation: () => ({
    state: {
      orderId,
    },
  }),
}));

let transaction;
const fetchTransaction = jest.fn();

jest.mock('../hooks/useTransactionStore', () => () => ({
  transaction,
  fetchTransaction,
}));

describe('OrderDetailPage', () => {
  function renderOrderDetailPage() {
    render((
      <ThemeProvider theme={theme}>
        <OrderDetailPage />
      </ThemeProvider>
    ));
  }

  context('링크로부터 주문 상세 내역 id가 주어지는 경우', () => {
    beforeEach(() => {
      orderId = 3;
      transaction = {
        id: 3,
        maker: '꿀잠은행',
        name: '8시간 수면권',
        purchaseCount: 10,
        purchaseCost: 10000000,
        receiver: '황인우',
        address: '서울 광진구',
        messageToSend: '잠은 소중하다',
        createdAt: '2022-10-14',
      };
    });

    it('TransactionStore에 주문 상세 내역 상태 갱신 요청 함수 호출', () => {
      renderOrderDetailPage();

      expect(fetchTransaction).toBeCalledWith(orderId);
    });

    it('주문 상세 내역을 화면에 표출', () => {
      renderOrderDetailPage();

      screen.getByText(/10,000,000원/);
      screen.getByText(/잠은 소중하다/);
    });
  });
});
