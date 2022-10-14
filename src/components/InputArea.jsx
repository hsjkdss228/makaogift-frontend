/* eslint-disable react/jsx-props-no-spreading */

import styled from 'styled-components';
import InformationMessage from './ui/InformationMessage';

const InputAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin: 1em 0 .3em;
  color: #A0A0A0;
  ${({ showLabel }) => (
    !showLabel
      ? 'font-size: 0;'
      : 'font-size: 1em;'
  )}
`;

// TODO: 에러 시 Input 외곽선 색상도 맞춰줘야 함

const Input = styled.input`
  font-size: 1.2em;
  width: 24em;
  padding: 1em .75em;
  margin-bottom: .125em;
`;

export default function InputArea({
  register, id, label, showLabel, type,
  name, conditions, placeholder, informationMessage,
}) {
  return (
    <InputAreaContainer>
      <Label
        showLabel={showLabel}
        htmlFor={id}
      >
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(name, conditions)}
      />
      <InformationMessage
        message={informationMessage}
      >
        {informationMessage}
      </InformationMessage>
    </InputAreaContainer>
  );
}
