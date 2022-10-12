/* eslint-disable max-len */
/* eslint-disable object-curly-newline */

import { fireEvent, render, screen } from '@testing-library/react';

import context from 'jest-plugin-context';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';

import Products from './Products';

describe('Products', () => {
  const handleClickPage = jest.fn();
  const handleClickProduct = jest.fn();

  function renderProducts({ products, pagesCount }) {
    render((
      <ThemeProvider theme={theme}>
        <Products
          products={products}
          pagesCount={pagesCount}
          onClickPage={handleClickPage}
          onClickProduct={handleClickProduct}
        />
      </ThemeProvider>
    ));
  }

  context('상품이 1페이지 이내로 존재할 때', () => {
    const products = [
      { id: 1, maker: '메이커', name: '네임', price: 100, description: '디스크립션' },
    ];
    const pagesCount = 1;

    it('상품 제조사, 이름, 가격 표출', () => {
      renderProducts({ products, pagesCount });

      screen.getByText('메이커');
      screen.getByText('네임');
      screen.getByText('100');
      screen.getByText('원');
    });
  });

  context('상품이 2페이지 이상 존재할 때', () => {
    const products = [
      { id: 9, maker: 'maker 9', name: 'name 9', price: 900, description: 'description 9' },
      { id: 10, maker: 'maker 10', name: 'name 10', price: 1000, description: 'description 10' },
      { id: 11, maker: 'maker 11', name: 'name 11', price: 1100, description: 'description 11' },
      { id: 12, maker: 'maker 12', name: 'name 12', price: 1200, description: 'description 12' },
      { id: 13, maker: 'maker 13', name: 'name 13', price: 1300, description: 'description 13' },
    ];
    const pagesCount = 2;

    it('상품 제조사, 이름, 가격 표출', () => {
      renderProducts({ products, pagesCount });

      screen.getByText(/maker 9/);
      screen.getByText(/maker 13/);
      screen.getByRole('button', { name: 1 });
      screen.getByRole('button', { name: 2 });
    });

    context('상품 클릭 시', () => {
      it('상품 상세 페이지 이동 이벤트 핸들러 호출', () => {
        renderProducts({ products, pagesCount });

        fireEvent.click(screen.getByText(/maker 9/));
        expect(handleClickProduct).toBeCalled();
      });
    });

    context('페이지 버튼 클릭 시', () => {
      it('페이지 전환 이벤트 핸들러 호출', () => {
        renderProducts({ products, pagesCount });

        fireEvent.click(screen.getByRole('button', { name: 1 }));
        expect(handleClickProduct).toBeCalled();
      });
    });
  });

  context('상품이 존재하지 않을 때', () => {
    const products = [];
    const pagesCount = 0;

    it('예외 메세지 출력', () => {
      renderProducts({ products, pagesCount });

      screen.getByText('상품이 존재하지 않습니다.');
    });
  });
});
