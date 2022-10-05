/* eslint-disable object-curly-newline */

import { render, screen } from '@testing-library/react';

import context from 'jest-plugin-context';

import Products from './Products';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('../hooks/useProductStore', () => () => ({
  products: [],
  pagesCount: 0,
}));

describe('Products', () => {
  context('상품이 존재하지 않을 때', () => {
    it('예외 메세지 출력', () => {
      render(<Products />);

      screen.getByText('상품이 존재하지 않습니다.');
    });
  });
});
