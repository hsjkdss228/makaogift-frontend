/* eslint-disable object-property-newline */
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

  function renderProducts({ products, pagesCount, currentPage }) {
    render((
      <ThemeProvider theme={theme}>
        <Products
          products={products}
          pagesCount={pagesCount}
          currentPage={currentPage}
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
    const currentPage = 1;

    it('목록만큼의 상품 제조사, 상품 이름, 가격, 페이지 넘버 표출', () => {
      renderProducts({ products, pagesCount, currentPage });

      screen.getByText('메이커');
      screen.getByText('네임');
      screen.getByText('100');
      screen.getByText('원');
      screen.getByRole('button', { name: 1 });
    });
  });

  context('상품이 2페이지 이상 존재할 때', () => {
    const products = [
      ...Array(5).fill({}).map((_, index) => (
        {
          id: 9 + index, maker: '롯데', name: `젤리 ${9 + index}`,
          price: 300, description: 'Candy Jelly Love~~~',
        }
      )),
    ];
    const pagesCount = 2;
    const currentPage = 2;

    it('보여주는 페이지의 상품 제조사, 상품 이름, 가격, 다른 모든 페이지 넘버 표출', () => {
      renderProducts({ products, pagesCount, currentPage });

      expect(screen.getAllByText(/젤리/).length).toBe(5);
      screen.getByRole('button', { name: 1 });
      screen.getByRole('button', { name: 2 });
    });

    context('상품 클릭 시', () => {
      it('상품 상세 페이지 이동 이벤트 핸들러 호출', () => {
        jest.clearAllMocks();
        renderProducts({ products, pagesCount, currentPage });

        fireEvent.click(screen.getByText(/젤리 13/));
        expect(handleClickProduct).toBeCalledWith(13);
      });
    });

    context('페이지 버튼 클릭 시', () => {
      it('페이지 전환 이벤트 핸들러 호출', () => {
        jest.clearAllMocks();
        renderProducts({ products, pagesCount, currentPage });

        fireEvent.click(screen.getByRole('button', { name: 1 }));
        expect(handleClickPage).toBeCalled();
      });
    });
  });

  context('상품이 존재하지 않을 때', () => {
    const products = [];
    const pagesCount = 0;
    const currentPage = 0;

    it('예외 메세지 출력', () => {
      renderProducts({ products, pagesCount, currentPage });

      screen.getByText('상품이 존재하지 않습니다.');
    });
  });
});
