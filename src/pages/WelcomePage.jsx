import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import PrimaryButton from '../components/ui/PrimaryButton';

const Container = styled.article`
  height: ${(props) => props.theme.pageSize.height};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    font-size: 1.5em;
    margin-bottom: .25em;
  }

  p:nth-child(3) {
    margin-bottom: 1em;
  }
`;

const Heading = styled.h2`
  font-size: 3em;
  font-weight: bold;
  padding: .1em 2em;
  margin-bottom: .5em;
`;

export default function WelcomePage() {
  const navigate = useNavigate();

  const handleClickLogin = () => {
    navigate('/login');
  };

  return (
    <Container>
      <Heading>회원가입 완료</Heading>
      <p>마카오 선물하기 회원가입이 완료되었습니다.</p>
      <p>정상적인 서비스 이용을 위해 로그인을 진행해주세요.</p>
      <PrimaryButton
        type="button"
        onClick={handleClickLogin}
      >
        로그인하기
      </PrimaryButton>
    </Container>
  );
}
