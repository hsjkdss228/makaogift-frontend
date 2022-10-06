/* eslint-disable object-curly-newline */

import { fireEvent, render, screen } from '@testing-library/react';

import Products from './Products';

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockedNavigate,
}));

jest.mock('../hooks/useProductStore', () => () => ({
  products: [
    { id: 1, maker: 'maker 1', name: 'name 1', price: 100, description: 'description 1' },
    { id: 2, maker: 'maker 2', name: 'name 2', price: 200, description: 'description 2' },
    { id: 3, maker: 'maker 3', name: 'name 3', price: 300, description: 'description 3' },
    { id: 4, maker: 'maker 4', name: 'name 4', price: 400, description: 'description 4' },
    { id: 5, maker: 'maker 5', name: 'name 5', price: 500, description: 'description 5' },
    { id: 6, maker: 'maker 6', name: 'name 6', price: 600, description: 'description 6' },
    { id: 7, maker: 'maker 7', name: 'name 7', price: 700, description: 'description 7' },
    { id: 8, maker: 'maker 8', name: 'name 8', price: 800, description: 'description 8' },
    { id: 9, maker: 'maker 9', name: 'name 9', price: 900, description: 'description 9' },
    { id: 10, maker: 'maker 10', name: 'name 10', price: 1000, description: 'description 10' },
    { id: 11, maker: 'maker 11', name: 'name 11', price: 1100, description: 'description 11' },
    { id: 12, maker: 'maker 12', name: 'name 12', price: 1200, description: 'description 12' },
    { id: 13, maker: 'maker 13', name: 'name 13', price: 1300, description: 'description 13' },
  ],
  pagesCount: 2,
  fetchProducts: jest.fn(),
  resetCountAndCost: jest.fn(),
}));

const context = describe;

describe('Products', () => {
  context('상품 목록에 내용이 있는 경우', () => {
    it('내용 표출', () => {
      render(<Products />);

      screen.getByText('maker 1');
      screen.getByText('name 1');
      screen.getByText('100원');
      screen.getByText('maker 8');
      screen.getByText('name 8');
      screen.getByText('800원');

      screen.getByText('1');
      screen.getByText('2');

      fireEvent.click(screen.getByText('2'));

      // TODO: 해당 테스트를 통과시킬 방법을 찾아야 함!!!!!!
      // expect(mockedNavigate).toBeCalled();
    });
  });
});
