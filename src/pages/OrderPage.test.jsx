import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import context from 'jest-plugin-context';
import { ThemeProvider } from 'styled-components';
import OrderPage from './OrderPage';
import theme from '../styles/theme';

let product;
let selectedCount;
let totalCost;
const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => (
    navigate
  ),
  useLocation: () => ({
    state: ({
      product,
      selectedCount,
      totalCost,
    }),
  }),
}));

let receiver;
let address;
let messageToSend;
let errorCodesAndMessages;
const initialize = jest.fn();
const order = jest.fn();

jest.mock('../hooks/useOrderStore', () => () => ({
  receiver,
  address,
  messageToSend,
  errorCodesAndMessages,
  initialize,
  order,
}));

const fetchUserAmount = jest.fn();

jest.mock('../hooks/useUserStore', () => () => ({
  fetchUserAmount,
}));

describe('OrderPage', () => {
  function renderOrderPage() {
    render((
      <ThemeProvider theme={theme}>
        <OrderPage />
      </ThemeProvider>
    ));
  }

  context('상품 상세 목록 페이지에서 정보를 받아오는 경우', () => {
    beforeEach(() => {
      product = {
        id: 1,
        maker: '기아자동차',
        name: 'K-511',
        price: 74000000,
        description: '두돈반 나가신다!',
      };
      selectedCount = 3;
      totalCost = product.price * selectedCount;
      receiver = '김정환 중사';
      address = '영종도';
      messageToSend = '신차 몇 대 넣어드립니다~~';
      errorCodesAndMessages = {};
    });

    it('OrderStore의 현재 상품 상태 초기화 함수 호출', () => {
      renderOrderPage();

      expect(initialize).toBeCalledWith({
        product,
        purchaseCount: selectedCount,
        purchaseCost: totalCost,
      });
    });

    it('선물하기 컴포넌트 구성요소들을 화면에 표출', () => {
      renderOrderPage();

      screen.getByText(/기아자동차/);
      screen.getByText(/K-511/);
      screen.getByText('구매수량:');
      screen.getByText('3');
      screen.getByText('총 상품금액:');
      screen.getByText('222,000,000원');

      expect(screen.getByLabelText('받는 분 성함*').value).toContain('김정환 중사');
      expect(screen.getByLabelText('받는 분 주소*').value).toContain('영종도');
      expect(screen.getByLabelText('받는 분께 보내는 메세지').value)
        .toContain('신차 몇 대 넣어드립니다~~');
    });

    // TODO: mockReturnValue에 대해 정리

    context('양식을 입력하고 선물하기 버튼을 누를 경우', () => {
      it('OrderStore의 작성된 폼의 내용을 서버에 등록하도록 요청하는 함수 호출', () => {
        renderOrderPage();

        fireEvent.click(screen.getByRole('button', { name: '선물하기' }));
        expect(order).toBeCalled();
      });

      context('상품이 정상적으로 등록되어 등록 id가 반환되었을 경우', () => {
        beforeEach(() => {
          const orderId = 100;
          order.mockReturnValueOnce(orderId);
          fetchUserAmount.mockClear();
          navigate.mockClear();
        });

        it('UserStore의 사용자의 잔액 상태를 갱신하는 함수 호출 및 주문 목록 페이지로 이동', async () => {
          renderOrderPage();

          fireEvent.click(screen.getByRole('button', { name: '선물하기' }));

          await waitFor(() => {
            expect(fetchUserAmount).toBeCalled();
            expect(navigate).toBeCalledWith('/orders');
          });
        });
      });

      context('등록 id가 반환되지 않았을 경우', () => {
        beforeEach(() => {
          order.mockReturnValueOnce('');
          fetchUserAmount.mockClear();
          navigate.mockClear();
        });

        it('UserStore의 사용자의 잔액 상태를 갱신하거나 주문 목록 페이지로 이동하지 않음', async () => {
          renderOrderPage();

          fireEvent.click(screen.getByRole('button', { name: '선물하기' }));

          await waitFor(() => {
            expect(fetchUserAmount).not.toBeCalled();
            expect(navigate).not.toBeCalledWith('/orders');
          });
        });
      });
    });
  });
});
