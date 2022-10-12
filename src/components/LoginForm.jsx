/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */

import styled from 'styled-components';

import InputArea from './InputArea';

import FormHeading from './ui/FormHeading';
import InformationMessage from './ui/InformationMessage';
import PrimaryButton from './ui/PrimaryButton';
import UserForm from './ui/UserForm';

const Container = styled.article`
  height: ${(props) => props.theme.pageSize.height};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SignUpButton = styled.button`
  font-size: 1.25em;
  border: none;
  margin-top: 2.5em;
  background: none;
`;

export default function LoginForm({
  register, handleSubmit, callBackOnSubmit, navigateToRegister, errors, loginError,
}) {
  const onSubmit = async (data, event) => {
    callBackOnSubmit(data, event);
  };

  const handleClickRegister = () => {
    navigateToRegister('/signup');
  };

  return (
    <Container>
      <UserForm onSubmit={handleSubmit(onSubmit)}>
        <FormHeading>USER LOGIN</FormHeading>
        <InputArea
          register={register}
          id="input-account"
          label="아이디"
          showLabel={false}
          type="text"
          placeholder="아이디"
          name="account"
          conditions={{
            required: { value: true, message: '아이디를 입력해주세요' },
          }}
          informationMessage={null}
        />
        <InputArea
          register={register}
          id="input-password"
          label="비밀번호"
          showLabel={false}
          type="password"
          placeholder="비밀번호"
          name="password"
          conditions={{
            required: { value: true, message: '비밀번호를 입력해주세요' },
          }}
          informationMessage={null}
        />
        <InformationMessage
          hasErrors
        >
          {errors.account
            ? errors.account.message
            : errors.password
              ? errors.password.message
              : loginError || null}
        </InformationMessage>
        <PrimaryButton type="submit">
          로그인하기
        </PrimaryButton>
      </UserForm>
      <SignUpButton
        type="button"
        onClick={handleClickRegister}
      >
        회원가입
      </SignUpButton>
    </Container>
  );
}
