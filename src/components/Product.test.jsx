/* eslint-disable max-len */
/* eslint-disable object-curly-newline */

import { fireEvent, render, screen } from '@testing-library/react';

import context from 'jest-plugin-context';

import Product from './Product';

describe('Products', () => {
  const handleClickAdd = jest.fn();
  const handleClickReduce = jest.fn();
  const handleClickBuy = jest.fn();

  function renderProduct({
    product, selectedCount, totalCost, canBuy,
  }) {
    render((
      <Product
        product={product}
        selectedCount={selectedCount}
        totalCost={totalCost}
        canBuy={canBuy}
        onClickAdd={handleClickAdd}
        onClickReduce={handleClickReduce}
        onClickBuy={handleClickBuy}
      />
    ));
  }

  context('상품의 상세 내역을 전달받을 경우', () => {
    const product = {
      id: 1,
      maker: '랄라아쿠아',
      name: '[이벤트 수초] 하이그로필라 베트남 3촉',
      price: 10000,
      description: '베트남 원산의 하이그로필라 종류.'
      + ' 환경에 따라 잎의 끝단이 붉은 갈색으로 변화하는 자태를 뽐낸다.',
    };

    context('선택한 상품의 개수가 1개인 경우', () => {
      const selectedCount = 1;
      const totalCost = product.price * selectedCount;

      it('화면에 상품명, 상품 가격, 제조사명, 구매수량, 상품설명, 총 상품금액을 표출', () => {
        renderProduct({ product, selectedCount, totalCost, canBuy: true });

        screen.getByText(/하이그로필라 베트남 3촉/);
        screen.getByText(/랄라아쿠아/);
        screen.getByText('1');
        screen.getByText(/베트남 원산의 하이그로필라 종류/);
        screen.getByText(/총 상품금액/);
        screen.getByRole('button', { name: '선물하기' });
        expect(screen.getAllByText(/10,000원/).length).toBe(2);
      });

      context('+ 버튼을 누를 경우', () => {
        it('상품 개수 증가 이벤트 핸들러 호출', () => {
          renderProduct({ product, selectedCount, totalCost, canBuy: true });

          fireEvent.click(screen.getByText('+'));
          expect(handleClickAdd).toBeCalled();
        });
      });

      context('- 버튼을 누를 경우', () => {
        it('상품 개수 감소 이벤트 핸들러를 호출하지 않음', () => {
          renderProduct({ product, selectedCount, totalCost, canBuy: true });

          fireEvent.click(screen.getByText('-'));
          expect(handleClickReduce).not.toBeCalled();
        });
      });

      context('선물하기 버튼을 누르는 경우', () => {
        it('선물하기 이벤트 핸들러 호출', () => {
          renderProduct({ product, selectedCount, totalCost, canBuy: true });

          fireEvent.click(screen.getByRole('button', { name: '선물하기' }));
          expect(handleClickBuy).toBeCalled();
        });
      });

      context('잔액이 부족해 선물이 불가능한 상태인 경우', () => {
        it('잔액이 부족해 선물할 수 없다는 안내 메세지 출력', () => {
          renderProduct({ product, selectedCount, totalCost, canBuy: false });

          screen.getByText(/잔액이 부족하여 선물하기가 불가합니다/);
        });
      });
    });

    context('선택한 상품의 개수가 2개 이상인 경우', () => {
      const selectedCount = 5;
      const totalCost = product.price * selectedCount;

      it('총 상품금액이 상품의 개수에 맞게 바뀌어 표출', () => {
        renderProduct({ product, selectedCount, totalCost, canBuy: true });

        screen.getByText(/50,000원/);
      });

      context('- 버튼을 누를 경우', () => {
        it('상품 개수 감소 이벤트 핸들러 호출', () => {
          renderProduct({ product, selectedCount, totalCost, canBuy: true });

          fireEvent.click(screen.getByText('-'));
          expect(handleClickReduce).toBeCalled();
        });
      });
    });
  });
});
