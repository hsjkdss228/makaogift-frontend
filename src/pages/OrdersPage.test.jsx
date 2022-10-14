/* eslint-disable object-property-newline */
import { fireEvent, render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';
import OrdersPage from './OrdersPage';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => (
    navigate
  ),
}));

let transactions;
let pagesCount;
let currentPage;
const fetchTransactions = jest.fn();
const setCurrentPage = jest.fn();

jest.mock('../hooks/useTransactionStore', () => () => ({
  transactions,
  pagesCount,
  currentPage,
  fetchTransactions,
  setCurrentPage,
}));

describe('OrdersPage', () => {
  localStorage.setItem('accessToken', JSON.stringify('TOKEN'));

  function renderOrdersPage() {
    render((
      <ThemeProvider theme={theme}>
        <OrdersPage />
      </ThemeProvider>
    ));
  }

  context('주문 목록이 존재하는 경우', () => {
    beforeEach(() => {
      transactions = [
        ...Array(8).fill({}).map((_, index) => (
          {
            id: 1 + index, maker: '롯데삼강', name: `${1 + index}번 빠삐코`,
            purchaseCount: 1, purchaseCost: 100000,
            receiver: `받는사람 ${1 + index}`,
            address: `주소 ${1 + index}`,
            messageToSend: `받는 메세지 ${1 + index}`,
            createdAt: '2022-10-14',
          }
        )),
      ];
      pagesCount = 5;
      currentPage = 1;
    });

    it('TransactionStore 주문 목록 갱신, 현재 페이지 설정 함수 호출', () => {
      jest.clearAllMocks();
      renderOrdersPage();

      expect(fetchTransactions).toBeCalledWith(1);
      expect(setCurrentPage).toBeCalledWith(1);
    });

    it('상품 제조사, 이름, 받는 사람, 페이지 넘버링 버튼 표출', () => {
      renderOrdersPage();

      expect(screen.getAllByText(/빠삐코/).length).toBe(8);
      screen.getByRole('button', { name: 1 });
      screen.getByRole('button', { name: 5 });
    });

    context('주문 목록 중 하나를 클릭 시', () => {
      it('주문 상세 내역 페이지 이동 함수 (navigate) 호출', () => {
        renderOrdersPage();

        fireEvent.click(screen.getByText('8번 빠삐코'));
        expect(navigate).toBeCalledWith('/orders/8', {
          state: {
            orderId: 8,
          },
        });
      });
    });

    context('페이지 버튼 클릭 시', () => {
      it('Store의 transactions 상태 업데이트 함수 (fetchTransactions) 및'
        + '현재 페이지 상태 변경 함수 (setCurrentPage) 호출', () => {
        renderOrdersPage();
        jest.clearAllMocks();

        fireEvent.click(screen.getByRole('button', { name: 5 }));
        expect(fetchTransactions).toBeCalledWith(5);
        expect(setCurrentPage).toBeCalledWith(5);
      });
    });
  });

  context('상품이 존재하지 않는 경우', () => {
    beforeEach(() => {
      transactions = [];
      pagesCount = 0;
      currentPage = 0;
    });

    it('상품이 존재하지 않는다는 메세지 출력', () => {
      renderOrdersPage();

      screen.getByText(/내가 주문한 내역이 없습니다/);
    });
  });
});
