/* eslint-disable max-len */
/* eslint-disable object-curly-newline */

import { fireEvent, render, screen } from '@testing-library/react';

import context from 'jest-plugin-context';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';

import ProductsPage from './ProductsPage';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  // useNavigate() {
  //   return navigate;
  // },
  useNavigate: () => (
    navigate
  ),
}));

let products;
let pagesCount;
let currentPage;
const fetchProducts = jest.fn();
const setCurrentPage = jest.fn();

jest.mock('../hooks/useProductStore', () => () => ({
  products,
  pagesCount,
  currentPage,
  fetchProducts,
  setCurrentPage,
}));

describe('ProductsPage', () => {
  function renderProductsPage() {
    render((
      <ThemeProvider theme={theme}>
        <ProductsPage />
      </ThemeProvider>
    ));
  }

  context('상품이 존재하는 경우', () => {
    beforeEach(() => {
      products = [
        ...Array(8).fill({}).map((_, index) => (
          {
            id: 1 + index,
            maker: '더 리터',
            name: `아메리카노 ${1 + index}`,
            price: 1500,
            description: '밤샘에는 역시 1L 아메리카노에 샷추가',
            imageUrl: 'Americano Image Url',
          }
        )),
      ];
      pagesCount = 3;
      currentPage = 1;
    });

    it('ProductStore 상품 목록 갱신, 현재 페이지 설정 함수 호출', () => {
      jest.clearAllMocks();
      renderProductsPage();

      expect(fetchProducts).toBeCalledWith(1);
      expect(setCurrentPage).toBeCalledWith(1);
    });

    it('상품 제조사, 이름, 가격, 페이지 넘버링 버튼 표출', () => {
      renderProductsPage();

      expect(screen.getAllByText(/아메리카노/).length).toBe(8);
      screen.getByRole('button', { name: 1 });
      screen.getByRole('button', { name: 2 });
      screen.getByRole('button', { name: 3 });
    });

    context('상품 클릭 시', () => {
      it('상품 상세 페이지 이동 함수 (navigate) 호출', () => {
        jest.clearAllMocks();
        renderProductsPage();

        fireEvent.click(screen.getByText('아메리카노 2'));
        expect(navigate).toBeCalledWith('/products/2', {
          state: {
            productId: 2,
          },
        });
      });
    });

    context('페이지 버튼 클릭 시', () => {
      it('Store의 products 상태 업데이트 함수 (fetchProducts) 및'
        + '현재 페이지 상태 변경 함수 (setCurrentPage) 호출', () => {
        renderProductsPage();
        jest.clearAllMocks();

        fireEvent.click(screen.getByRole('button', { name: 1 }));
        expect(fetchProducts).toBeCalledWith(1);
        expect(setCurrentPage).toBeCalledWith(1);
      });
    });
  });

  context('상품이 존재하지 않는 경우', () => {
    beforeEach(() => {
      products = [];
      pagesCount = 0;
      currentPage = 0;
    });

    it('상품이 존재하지 않는다는 메세지 출력', () => {
      renderProductsPage();

      screen.getByText(/상품이 존재하지 않습니다./);
    });
  });
});
