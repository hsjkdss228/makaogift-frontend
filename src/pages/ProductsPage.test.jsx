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
        { id: 1,
          maker: 'ASUS',
          name: 'Zenbook',
          price: 1390000,
          description:
          'Compact and Light',
        },
        { id: 2,
          maker: 'Apple',
          name: 'Macbook Air M1',
          price: 1690000,
          description: 'The M1 Chip',
        },
        { id: 3,
          maker: 'ASUS2',
          name: 'Zenbook',
          price: 1390000,
          description:
            'Compact and Light',
        },
        { id: 4,
          maker: 'Apple2',
          name: 'Macbook Air M1',
          price: 1690000,
          description: 'The M1 Chip',
        },
        { id: 5,
          maker: 'ASUS3',
          name: 'Zenbook',
          price: 1390000,
          description:
              'Compact and Light',
        },
        { id: 6,
          maker: 'Apple3',
          name: 'Macbook Air M1',
          price: 1690000,
          description: 'The M1 Chip',
        },
        { id: 7,
          maker: 'ASUS4',
          name: 'Zenbook',
          price: 1390000,
          description:
                'Compact and Light',
        },
        { id: 8,
          maker: 'Apple4',
          name: 'Macbook Air M1',
          price: 1690000,
          description: 'The M1 Chip',
        },
      ];
      pagesCount = 3;
      currentPage = 1;
    });

    it('ProductStore의 상품 목록 가져오기, 현재 페이지 설정 함수 호출', () => {
      renderProductsPage();

      expect(fetchProducts).toBeCalledWith(1);
      expect(setCurrentPage).toBeCalledWith(1);
    });

    it('상품 제조사, 이름, 가격 표출', () => {
      renderProductsPage();

      expect(screen.getAllByText(/Apple/).length).toBe(4);
      expect(screen.getAllByText(/ASUS/).length).toBe(4);
      screen.getByRole('button', { name: 1 });
      screen.getByRole('button', { name: 2 });
      screen.getByRole('button', { name: 3 });
    });

    context('상품 클릭 시', () => {
      it('상품 상세 페이지 이동 함수 (navigate) 호출', () => {
        renderProductsPage();

        fireEvent.click(screen.getByText('Apple'));
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

        fireEvent.click(screen.getByRole('button', { name: 1 }));
        expect(fetchProducts).toBeCalledWith(1);
        expect(setCurrentPage).toBeCalledWith(1);
      });
    });
  });

  context('상품이 없을 때', () => {
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
