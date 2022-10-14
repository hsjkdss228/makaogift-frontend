/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */

import styled from 'styled-components';
import InputArea from './InputArea';

import FormHeading from './ui/FormHeading';
import PrimaryButton from './ui/PrimaryButton';
import UserForm from './ui/UserForm';

const Container = styled.div`
  height: ${(props) => props.theme.pageSize.height};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function SignUpForm({
  register, handleSubmit, callBackOnSubmit, errors, signUpErrors,
}) {
  const onSubmit = async (data, event) => {
    callBackOnSubmit(data, event);
  };

  return (
    <Container>
      <UserForm onSubmit={handleSubmit(onSubmit)}>
        <FormHeading>SIGN UP</FormHeading>
        <InputArea
          register={register}
          id="input-name"
          label="이름 :"
          showLabel
          type="text"
          placeholder={null}
          name="name"
          conditions={{
            required: { value: true, message: '이름을 입력해주세요' },
            pattern: { value: /^[가-힣]{3,7}$/, message: '이름을 다시 확인해주세요' },
          }}
          informationMessage={
            errors.name
              ? errors.name.message
              : Object.prototype.hasOwnProperty.call(signUpErrors, '1000')
                ? signUpErrors['1000']
                : Object.prototype.hasOwnProperty.call(signUpErrors, '1004')
                  ? signUpErrors['1004']
                  : '3-7자까지 한글만 사용 가능'

          }
        />
        <InputArea
          register={register}
          id="input-account"
          label="아이디 :"
          showLabel
          type="text"
          placeholder={null}
          name="account"
          conditions={{
            required: { value: true, message: '아이디를 입력해주세요' },
            pattern: {
              value: /^(?=.*[a-z])(?=.*\d)[a-z\d]{4,16}$/,
              message: '아이디를 다시 확인해주세요',
            },
          }}
          informationMessage={
            errors.account
              ? errors.account.message
              : Object.prototype.hasOwnProperty.call(signUpErrors, '1001')
                ? signUpErrors['1001']
                : Object.prototype.hasOwnProperty.call(signUpErrors, '1005')
                  ? signUpErrors['1005']
                  : Object.prototype.hasOwnProperty.call(signUpErrors, '1007')
                    ? signUpErrors['1007']
                    : '영문소문자/숫자, 4~16자만 사용 가능'
          }
        />
        <InputArea
          register={register}
          id="input-password"
          label="비밀번호 :"
          showLabel
          type="password"
          placeholder={null}
          name="password"
          conditions={{
            required: { value: true, message: '비밀번호를 입력해주세요' },
            pattern: {
              value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d(?=.*@$!%*#?&)]{8,}$/,
              message: '비밀번호를 다시 확인해주세요',
            },
          }}
          informationMessage={
            errors.password
              ? errors.password.message
              : Object.prototype.hasOwnProperty.call(signUpErrors, '1002')
                ? signUpErrors['1002']
                : Object.prototype.hasOwnProperty.call(signUpErrors, '1006')
                  ? signUpErrors['1006']
                  : '8글자 이상의 영문(대소문자), 숫자, 특수문자가 모두 포함되어야 함'
          }
        />
        <InputArea
          register={register}
          id="input-confirm-password"
          label="비밀번호 확인 :"
          showLabel
          type="password"
          placeholder={null}
          name="confirmPassword"
          conditions={{
            required: { value: true, message: '비밀번호 확인을 입력해주세요' },
          }}
          informationMessage={
            errors.confirmPassword
              ? errors.confirmPassword.message
              : Object.prototype.hasOwnProperty.call(signUpErrors, '1003')
                ? signUpErrors['1003']
                : Object.prototype.hasOwnProperty.call(signUpErrors, '1008')
                  ? signUpErrors['1008']
                  : null
          }
        />
        <PrimaryButton type="submit">
          회원가입
        </PrimaryButton>
      </UserForm>
    </Container>
  );
}
