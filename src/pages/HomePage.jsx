/* eslint-disable jsx-a11y/alt-text */

import styled from 'styled-components';

const homePageHero = require('../assets/images/HomePageHero.png');

const Container = styled.article`
  height: ${(props) => props.theme.pageSize.height};
  margin: 0 20em;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;

  p:first-child {
    font-size: 1.5em;
    margin-bottom: 2em;
    color: #FCBE2C;
  }

  p:nth-child(2), p:nth-child(3) {
    font-size: 2.5em;
    margin-block: 0.3em;
  }

  p:last-child {
    font-size: 1em;
    margin-top: 3em;
  }
`;

export default function HomePage() {
  return (
    <Container>
      <section>
        <p>무얼 선물할 지 고민이라면</p>
        <p>특별한</p>
        <p>아이템을 전하세요</p>
        <p>마카오 선물하기에서만 볼 수 있는 특별한 아이템</p>
      </section>
      <img
        src={homePageHero}
      />
    </Container>
  );
}
