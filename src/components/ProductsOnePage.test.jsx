/* eslint-disable object-curly-newline */

import { render, screen } from '@testing-library/react';

import Products from './Products';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('../hooks/useProductStore', () => () => ({
  products: [
    { id: 1, maker: '메이커', name: '네임', price: 100, description: '디스크립션' },
  ],
  pagesCount: 1,
}));

const context = describe;

describe('Products', () => {
  context('상품이 1페이지 이내로 존재할 때', () => {
    it('상품 제조사, 이름, 가격 표출', () => {
      render(<Products />);

      screen.getByText('메이커');
      screen.getByText('네임');
      screen.getByText('100원');
    });
  });
});
