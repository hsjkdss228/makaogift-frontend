import { render, screen } from '@testing-library/react';

import Header from './Header';

jest.mock('react-router-dom', () => ({
  Link({ children, to }) {
    return (
      <a href={to}>
        {children}
      </a>
    );
  },
  useNavigate: () => ({
    navigate: jest.fn(),
  }),
}));

test('Header', () => {
  render(<Header />);

  screen.getByText(/선물하기/);
  screen.getByText(/홈/);
  screen.getByText(/스토어/);
  screen.getByText(/주문조회/);
  screen.getByText(/회원가입/);
  screen.getByText(/로그인/);

  // TODO: 링크를 클릭했을 때 링크로 이동되도록 하는
  // 어떤 트리거를 확인할 수 있는 테스트가 있는가?
});
