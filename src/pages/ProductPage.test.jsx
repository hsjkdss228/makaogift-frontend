/* eslint-disable max-len */
/* eslint-disable object-curly-newline */

import { fireEvent, render, screen } from '@testing-library/react';

import context from 'jest-plugin-context';
import { ThemeProvider } from 'styled-components';

import theme from '../styles/theme';

import ProductPage from './ProductPage';

const navigate = jest.fn();
let productId;

jest.mock('react-router-dom', () => ({
  useNavigate: () => (
    navigate
  ),
  useLocation: () => ({
    state: {
      productId,
    },
  }),
}));

let product;
let selectedCount;
let totalCost;
let canBuy;
const fetchProduct = jest.fn();
const resetCountAndCost = jest.fn();
const addCountAndTotalCost = jest.fn();
const reduceCountAndTotalCost = jest.fn();
const discontinuePurchase = jest.fn();

let amount;

jest.mock('../hooks/useProductStore', () => () => ({
  product,
  selectedCount,
  totalCost,
  canBuy,
  fetchProduct,
  resetCountAndCost,
  addCountAndTotalCost,
  reduceCountAndTotalCost,
  discontinuePurchase,
}));

jest.mock('../hooks/useUserStore', () => () => ({
  amount,
}));

describe('ProductPage', () => {
  function renderProductPage() {
    render((
      <ThemeProvider theme={theme}>
        <ProductPage />
      </ThemeProvider>
    ));
  }

  context('링크로부터 상품 id가 주어지는 경우', () => {
    beforeEach(() => {
      productId = 1;
      product = {
        id: 1,
        maker: '수진아쿠아리움',
        name: '[이벤트 30% 할인!!!] NAS 45큐브 프리미엄 8T 크리스탈 올디아망 어항',
        price: 270000,
        description: '네이처아쿠아 프리미엄 수조는 최고 품질의 Diamant 유리로 만들어집니다.',
      };
    });

    it('ProductStore에 상품 상세정보 상태 갱신 요청 함수 호출', () => {
      renderProductPage();

      expect(fetchProduct).toBeCalledWith(productId);
    });

    context('선택한 상품의 개수가 1개인 경우', () => {
      beforeEach(() => {
        selectedCount = 1;
        totalCost = product.price * selectedCount;
      });

      it('상품 내역을 화면에 표출', () => {
        renderProductPage();

        screen.getByText(/이벤트 30% 할인!!!/);
        expect(screen.getAllByText(/270,000원/).length).toBe(2);
      });

      context('+ 버튼을 누를 경우', () => {
        it('Store의 상품 개수 증가 함수 호출', () => {
          renderProductPage();

          fireEvent.click(screen.getByText('+'));
          expect(addCountAndTotalCost).toBeCalled();
        });
      });

      context('- 버튼을 누를 경우', () => {
        it('Store의 상품 개수 감소 함수를 호출하지 않음', () => {
          renderProductPage();

          fireEvent.click(screen.getByText('-'));
          expect(reduceCountAndTotalCost).not.toBeCalled();
        });
      });

      context('선물하기 버튼을 누르는 경우', () => {
        context('accessToken이 없는 경우', () => {
          beforeEach(() => {
            localStorage.setItem('accessToken', JSON.stringify(''));
          });

          it('로그인 화면으로 이동하는 navigate 함수 호출', () => {
            renderProductPage();

            fireEvent.click(screen.getByRole('button', { name: '선물하기' }));
            expect(navigate).toBeCalledWith('/login');
          });
        });

        context('accessToken이 있는 경우', () => {
          beforeEach(() => {
            localStorage.setItem('accessToken', JSON.stringify('TOKEN'));
          });

          context('보유한 잔액이 총 가격보다 클 경우', () => {
            beforeEach(() => {
              amount = 10000000;
            });

            it('주문하기 페이지로 이동하는 navigate 함수 호출', () => {
              renderProductPage();

              fireEvent.click(screen.getByRole('button', { name: '선물하기' }));
              expect(navigate).toBeCalledWith('/order', {
                state: {
                  product,
                  selectedCount,
                  totalCost,
                },
              });
            });
          });

          context('보유한 잔액이 총 가격보다 적을 경우', () => {
            beforeEach(() => {
              amount = 10;
            });

            it('잔액 부족 메세지 출력 상태를 활성화하는 Store 함수 호출', () => {
              renderProductPage();

              fireEvent.click(screen.getByRole('button', { name: '선물하기' }));
              expect(discontinuePurchase).toBeCalled();
            });
          });

          it('로그인 화면으로 이동하는 navigate 함수 호출', () => {
            renderProductPage();

            fireEvent.click(screen.getByRole('button', { name: '선물하기' }));
            expect(navigate).toBeCalledWith('/login');
          });
        });
      });
    });

    context('선택한 상품의 개수가 2개인 경우', () => {
      beforeEach(() => {
        selectedCount = 3;
        totalCost = product.price * selectedCount;
      });

      it('상품 가격에 맞는 상품 내역을 화면에 표출', () => {
        renderProductPage();

        screen.getAllByText(/810,000원/);
      });

      context('- 버튼을 누를 경우', () => {
        it('Store의 상품 개수 감소 함수 호출', () => {
          renderProductPage();

          fireEvent.click(screen.getByText('-'));
          expect(reduceCountAndTotalCost).toBeCalled();
        });
      });
    });
  });
});
