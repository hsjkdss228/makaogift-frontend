import { Link, useNavigate } from 'react-router-dom';

import { useLocalStorage } from 'usehooks-ts';

import useUserStore from '../hooks/useUserStore';

import numberFormat from '../utils/numberFormat';

export default function Header() {
  const navigate = useNavigate();

  const [accessToken, setAccessToken] = useLocalStorage('accessToken', '');

  const userStore = useUserStore();

  const handleClickRegister = () => {
    // TODO: 회원가입으로 보내야 함
    navigate('/');
  };

  const handleClickLogin = () => {
    navigate('/login');
  };

  const handleClickLogout = () => {
    setAccessToken('');
    navigate('/');
  };

  return (
    <div>
      <nav>
        <h1>선물하기</h1>
        <Link to="/">
          홈
        </Link>
        <Link to="/products">
          스토어
        </Link>
        <Link to={accessToken ? '/orders' : '/login'}>
          주문조회
        </Link>
      </nav>
      <nav>
        {accessToken ? (
          <>
            <p>
              {
                /* TODO: 나도 잔액조회 새로고침 하면 0원 나옴
                   잔액 정보를 백엔드에서 받아와 갱신하도록 구조 수정할 것 */
              }
              내 잔액:
              {' '}
              {numberFormat(userStore.amount)}
              원
            </p>
            <button
              type="button"
              onClick={handleClickLogout}
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={handleClickRegister}
            >
              회원가입
            </button>
            <button
              type="button"
              onClick={handleClickLogin}
            >
              로그인
            </button>
          </>
        )}
      </nav>
    </div>
  );
}
