import styled from 'styled-components';

const InformationMessage = styled.p`
  width: 100%;
  display: block;
  margin: .75em 0 1em;

  ${({ message }) => (
    message === '3-7자까지 한글만 사용 가능'
    || message === '영문소문자/숫자, 4~16자만 사용 가능'
    || message === '8글자 이상의 영문(대소문자), 숫자, 특수문자가 모두 포함되어야 함'
      ? 'color: #A0A0A0;'
      : 'color: #F00;'
  )}
`;

export default InformationMessage;
