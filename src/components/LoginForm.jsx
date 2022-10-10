/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */

import InputArea from './InputArea';

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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>USER LOGIN</h2>
        <InputArea
          register={register}
          id="input-account"
          label="아이디"
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
          type="password"
          placeholder="비밀번호"
          name="password"
          conditions={{
            required: { value: true, message: '비밀번호를 입력해주세요' },
          }}
          informationMessage={null}
        />
        <p>
          {errors.account
            ? errors.account.message
            : errors.password
              ? errors.password.message
              : loginError || null}
        </p>
        <button type="submit">
          로그인하기
        </button>
      </form>
      <button
        type="button"
        onClick={handleClickRegister}
      >
        회원가입
      </button>
    </div>
  );
}
