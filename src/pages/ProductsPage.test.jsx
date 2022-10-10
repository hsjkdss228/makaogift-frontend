import { render, screen } from '@testing-library/react';

import context from 'jest-plugin-context';

import ProductsPage from './ProductsPage';

jest.mock('react-router-dom', () => ({
  useNavigate: () => ({
    navigate: jest.fn(),
  }),
}));

let products = [];
let pagesCount = 0;

jest.mock('../hooks/useProductStore', () => () => ({
  products,
  pagesCount,
  fetchProducts: jest.fn(),
}));

describe('ProductsPage', () => {
  context('상품이 없을 때', () => {
    beforeEach(() => {
      products = [];
      pagesCount = 0;
    });
  });
  render(<ProductsPage />);

  screen.getByText(/상품이 존재하지 않습니다./);
});
