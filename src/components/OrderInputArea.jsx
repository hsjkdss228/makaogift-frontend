import styled from 'styled-components';

const Container = styled.div`
  margin-bottom: 2em;
`;

const Label = styled.label`
  font-size: 1.1em;
  font-weight: bold;
  display: block;
  color: #A0A0A0;
  margin-bottom: .5em;

  span {
    font-weight: normal;
    color: #FF424D;
  }
`;

const Input = styled.input`
  width: 100%;
  color: #A0A0A0;
  padding: 1em;
  border: 1px solid #22DAAB;
  margin-bottom: .7em;
`;

const OrderInformationMessage = styled.p`
  ${({ message }) => (
    message === '3-7자까지 한글만 사용 가능합니다'
    || message === '성함을 입력해주세요'
    || message === '주소를 입력해주세요'
      ? 'color: #F00;'
      : 'color: #A0A0A0;'
  )}
`;

export default function OrderInputArea({
  id, label, inputRequired, type, value, onChange, informationMessage,
}) {
  return (
    <Container>
      <Label htmlFor={id}>
        {label}
        <span>{inputRequired ? '*' : null}</span>
      </Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event)}
      />
      <OrderInformationMessage
        message={informationMessage}
      >
        {informationMessage}
      </OrderInformationMessage>
    </Container>
  );
}
