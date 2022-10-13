/* eslint-disable object-property-newline */

import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import context from 'jest-plugin-context';
import theme from '../styles/theme';
import Orders from './Orders';

describe('Orders', () => {
  const handleClickOrderDetail = jest.fn();
  const handleClickPage = jest.fn();

  function renderOrders({ transactions, pagesCount, currentPage }) {
    render((
      <ThemeProvider theme={theme}>
        <Orders
          transactions={transactions}
          pagesCount={pagesCount}
          currentPage={currentPage}
          onClickOrderDetail={handleClickOrderDetail}
          onClickPage={handleClickPage}
        />
      </ThemeProvider>
    ));
  }

  context('주문 목록이 1페이지 이내로 존재할 때', () => {
    const transactions = [
      {
        id: 1, maker: '농협회사법인주식회사 청정인삼', name: '6년근 홍삼농축액 파워 100',
        purchaseCount: 3, purchaseCost: 600000,
        receiver: '길태호', address: '서울 송파구', messageToSend: '태호야 건강 잘챙겨라',
        createdAt: '2022-10-13',
      },
      {
        id: 2, maker: '농협회사법인주식회사 청정인삼', name: '6년근 홍삼농축액 파워 100',
        purchaseCount: 3, purchaseCost: 600000,
        receiver: '박준모', address: '충남 금산군', messageToSend: '준모는 워낙 건강해서 걱정없음ㅋ',
        createdAt: '2022-10-13',
      },
      {
        id: 3, maker: '종근당건강', name: '너에게 꼭 맞는 LACTO-FIT',
        purchaseCount: 5, purchaseCost: 500000,
        receiver: '김국별', address: '충남 금산군', messageToSend: '국별이 위장건강 잘챙기도록...',
        createdAt: '2022-10-13',
      },
    ];
    const pagesCount = 1;
    const currentPage = 1;

    it('목록만큼의 상품 제조사, 상품 이름, 받는 사람, 페이지 넘버 표출', () => {
      renderOrders({ transactions, pagesCount, currentPage });

      expect(screen.getAllByText(/청정인삼/).length).toBe(2);
      expect(screen.getAllByText(/6년근 홍삼농축액/).length).toBe(2);
      screen.getByText(/길태호/);
      screen.getByText(/박준모/);
      screen.getByText(/종근당건강/);
      screen.getByText(/LACTO-FIT/);
      screen.getByText(/김국별/);
      screen.getByRole('button', { name: 1 });
    });
  });

  context('주문 목록이 2페이지 이상 존재할 때', () => {
    const transactions = [
      ...Array(8).fill({}).map((_, index) => (
        {
          id: 25 + index, maker: '수복건강원', name: '홍삼 6년근 100% 마시는 홍삼액',
          purchaseCount: 1, purchaseCost: 60000,
          receiver: `받는사람 ${25 + index}`,
          address: `주소 ${25 + index}`,
          messageToSend: `받는 메세지 ${25 + index}`,
          createdAt: '2022-10-13',
        }
      )),
    ];
    const pagesCount = 5;
    const currentPage = 3;

    it('보여주는 페이지의 상품 제조사, 상품 이름, 받는 사람, 다른 모든 페이지 넘버 표출', () => {
      renderOrders({ transactions, pagesCount, currentPage });

      expect(screen.getAllByText(/수복건강원/).length).toBe(8);
      screen.getByRole('button', { name: 1 });
      screen.getByRole('button', { name: 5 });
    });

    context('상품 클릭 시', () => {
      it('주문 상세 내역 페이지 이동 이벤트 핸들러 호출', () => {
        jest.clearAllMocks();
        renderOrders({ transactions, pagesCount, currentPage });

        fireEvent.click(screen.getByText(/받는사람 30/));
        expect(handleClickOrderDetail).toBeCalledWith(30);
      });
    });

    context('페이지 버튼 클릭 시', () => {
      it('페이지 전환 이벤트 핸들러 호출', () => {
        jest.clearAllMocks();
        renderOrders({ transactions, pagesCount, currentPage });

        fireEvent.click(screen.getByRole('button', { name: 1 }));
        expect(handleClickPage).toBeCalled();
      });
    });
  });

  context('주문 목록이 존재하지 않을 때', () => {
    const transactions = [];
    const pagesCount = 0;
    const currentPage = 0;

    it('예외 메세지 출력', () => {
      renderOrders({ transactions, pagesCount, currentPage });

      screen.getByText('내가 주문한 내역이 없습니다');
    });
  });
});
