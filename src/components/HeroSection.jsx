import styled from 'styled-components';

const backgroundImageUrl = require('../assets/images/ProductsPageHero.jpeg');

const Container = styled.section`
  height: 30vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)),
    url(${(props) => props.backgroundImageUrl});
  opacity: 100%;
  background-size: 150%;
  background-position: left 5% bottom 55%;
  background-repeat: no-repeat;
`;

const DescriptionArea = styled.div`
  height: 100%;
  width: 27em;
  padding-inline: 3em;
  margin: 0 55em 0 18em;
  color: #FFF;
  display: grid;
  grid-template-rows: 2fr 1fr 1fr 2fr;
  align-items: center;
  gap: 0.25em;

  p:nth-child(1), p:nth-child(2) {
    align-self: end;
  }

  p:nth-child(3), p:nth-child(4) {
    align-self: start;
  }

  p:first-child {
    font-weight: bold;
    margin-bottom: 0.25em;
    color: #F3A300;
  }

  p:nth-child(2), p:nth-child(3) {
    font-size: 1.25em;
    font-weight: bold;
  }

  p:last-child {
    margin-top: 0.25em;
  }
`;

export default function HeroSection() {
  return (
    <Container
      backgroundImageUrl={backgroundImageUrl}
    >
      <DescriptionArea>
        <p>평범한 선물은 주기도 민망하다구요?</p>
        <p>작정하고 준비한</p>
        <p>마카오톡 선물하기 아이템</p>
        <p>마카오톡 선물하기에서만 볼 수 있는 특별템 기획전</p>
      </DescriptionArea>
    </Container>
  );
}
