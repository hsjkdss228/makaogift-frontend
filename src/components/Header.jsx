import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div>
      <nav>
        <h1>선물하기</h1>
        <Link to="/">
          홈
        </Link>
        <Link to="/">
          스토어
        </Link>
        <Link to="/">
          주문조회
        </Link>
      </nav>
      <nav>
        <Link to="/">
          회원가입
        </Link>
        <Link to="/">
          로그인
        </Link>
      </nav>
    </div>
  );
}
