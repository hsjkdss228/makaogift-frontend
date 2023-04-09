/* eslint-disable jsx-a11y/alt-text */

import styled from 'styled-components';

const homePageHero = require('../assets/images/HomePageHero2.jpeg');

const Container = styled.article`
  height: 1080px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)),
    url(${(props) => props.homePageHero});
  opacity: 100%;
  background-size: 100%;
  background-repeat: no-repeat;
  opacity: 1;  
  font-weight: bold;
  display: flex;
  align-items: center;

  section {
    margin: 0 17vw;
  }

  p:first-child {
    font-size: 1.5em;
    margin-bottom: 2em;
    color: #FCBE2C;
  }

  p:nth-child(2), p:nth-child(3) {
    color: #FFF;
    font-size: 2.5em;
    margin-block: 0.3em;
  }

  p:last-child {
    color: #FFF;
    font-size: 1em;
    margin-top: 3em;
  }
`;

export default function HomePage() {
  return (
    <Container
      homePageHero={homePageHero}
    >
      <section>
        <p>무얼 선물할 지 고민이라면</p>
        <p>특별한</p>
        <p>관상어들을 전하세요</p>
        <p>마카오 선물하기에서만 볼 수 있는 특별한 관상어들</p>
      </section>
      {/* <img
        src={homePageHero}
      /> */}
    </Container>
  );
}
