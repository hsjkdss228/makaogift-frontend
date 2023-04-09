import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useLocalStorage } from 'usehooks-ts';

import useUserStore from '../hooks/useUserStore';

import numberFormat from '../utils/numberFormat';
import HeaderNavigation from './ui/HeaderNavigation';

const Container = styled.header`
  padding: 2em 0;
  border-bottom: 1px solid #D9D9D9;
  display: grid;
  grid-template-columns: 3fr 2fr;
`;

const H1 = styled.h1`
  font-size: 1.5em;
  font-weight: bold;
`;

const PageNavigation = styled(HeaderNavigation)`
  margin-left: 15vw;
  gap: 4em;

  a:hover {
    border-bottom: 3px solid #22DAAB;
  }
`;

const UserNavigation = styled(HeaderNavigation)`
  margin-right: 20vw;
  flex-direction: row-reverse;
  gap: 3em;

  p, button {
    font-size: 1em;
    border: none;
    background: none;
  }
`;

export default function Header() {
  const navigate = useNavigate();

  const [accessToken, setAccessToken] = useLocalStorage('accessToken', '');

  const userStore = useUserStore();

  const handleClickRegister = () => {
    navigate('/signup');
  };

  const handleClickLogin = () => {
    navigate('/login');
  };

  const handleClickLogout = () => {
    setAccessToken('');
    navigate('/');
  };

  return (
    <Container>
      <PageNavigation>
        <H1>선물하기</H1>
        <Link to="/">
          홈
        </Link>
        <Link to="/products">
          스토어
        </Link>
        <Link to={accessToken ? '/orders' : '/login'}>
          주문조회
        </Link>
      </PageNavigation>
      <UserNavigation>
        {accessToken ? (
          <>
            <button
              type="button"
              onClick={handleClickLogout}
            >
              로그아웃
            </button>
            <p>
              내 잔액:
              {' '}
              {numberFormat(userStore.amount)}
              원
            </p>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={handleClickLogin}
            >
              로그인
            </button>
            <button
              type="button"
              onClick={handleClickRegister}
            >
              회원가입
            </button>
          </>
        )}
      </UserNavigation>
    </Container>
  );
}
