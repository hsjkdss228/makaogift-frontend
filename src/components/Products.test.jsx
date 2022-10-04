import { render, screen, waitFor } from '@testing-library/react';

import { productStore } from '../stores/ProductStore';

import Products from './Products';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

test('Products', async () => {
  productStore.fetchProducts();

  render(<Products />);

  screen.getByText(/평범한 선물은 주기도 민망하다구요?/);
  screen.getByText(/작정하고 준비한/);
  screen.getByText(/마카오톡 선물하기 아이템/);
  screen.getByText(/마카오톡 선물하기에서만 볼 수 있는 특별템 기획전/);
  screen.getByText(/인기선물을 한 자리에 모았어요/);

  await waitFor(() => {
    screen.getByText(/제조사 1/);
    screen.getByText(/제조사 3/);
    screen.getByText(/상품 옵션명 1/);
    screen.getByText(/상품 옵션명 3/);
    screen.getByText(/100원/);
    screen.getByText(/300원/);
  });
});
