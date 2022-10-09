/* eslint-disable react/jsx-props-no-spreading */

import { useNavigate } from 'react-router-dom';

import { useLocalStorage } from 'usehooks-ts';

import { useForm } from 'react-hook-form';

import useUserStore from '../hooks/useUserStore';

export default function LoginForm() {
  // TODO: 상위 컴포넌트로 Store나 함수들을 올릴 필요가 있음

  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const [, setAccessToken] = useLocalStorage('accessToken', '');

  const userStore = useUserStore();

  const onSubmit = async (data) => {
    const { account, password } = data;
    const accessToken = await userStore.login({ identification: account, password });
    if (accessToken) {
      setAccessToken(accessToken);
      navigate('/');
    }
    // TODO 1: 예외처리 추가 필요
    // TODO 2: 특정 지점에서 로그인하는 경우 홈이 아닌 해당 특정 지점으로 돌아가게 해줄 수 있을까?
    //  localStorage를 사용해볼 수 있을 것 같다.
  };

  const handleClickRegister = () => {
    // TODO: 회원가입으로 보내야 함
    // navigate('/');
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>USER LOGIN</h2>
        <div>
          <label htmlFor="input-account">
            아이디(계좌번호)
          </label>
          <input
            id="input-account"
            type="text"
            placeholder="아이디(계좌번호)"
            {...register('account', { required: true })}
          />
        </div>
        <div>
          <label htmlFor="input-password">
            비밀번호
          </label>
          <input
            id="input-password"
            type="password"
            placeholder="비밀번호"
            {...register('password', { required: true })}
          />
        </div>
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
