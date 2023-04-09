import { render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';
import OrderDetail from './OrderDetail';

describe('OrderDetail', () => {
  context('상품 주문 목록의 내용 하나를 전달받아', () => {
    const transaction = {
      id: 50,
      maker: '하이트진로',
      name: '진로 소주병 바디필로우 100cm',
      purchaseCount: 2,
      purchaseCost: 79800,
      receiver: '이찬승',
      address: '서울 광진구',
      messageToSend: '오늘 이렇게 우연히 만나다니 반가웠어!',
      createdAt: '2022-10-14',
    };

    it('화면에 출력', () => {
      render((
        <ThemeProvider theme={theme}>
          <OrderDetail transaction={transaction} />
        </ThemeProvider>
      ));

      screen.getByText(/하이트진로/);
      screen.getByText(/진로 소주병 바디필로우 100cm/);
      screen.getByText('구매수량');
      screen.getByText('2');
      screen.getByText('총 상품금액');
      screen.getByText(/79,800원/);
      screen.getByText('구매일');
      screen.getByText(/2022-10-14/);
      screen.getByText('받는 분');
      screen.getByText(/이찬승/);
      screen.getByText('받는 분 주소');
      screen.getByText(/서울 광진구/);
      screen.getByText('받는 분께 보내는 메세지');
      screen.getByText(/오늘 이렇게 우연히 만나다니 반가웠어!/);
    });
  });
});
