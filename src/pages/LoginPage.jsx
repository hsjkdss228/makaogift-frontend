import { useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';

import { useLocalStorage } from 'usehooks-ts';

import useUserStore from '../hooks/useUserStore';

import LoginForm from '../components/LoginForm';

export default function LoginPage() {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({ reValidateMode: 'onSubmit' });

  const [, setAccessToken] = useLocalStorage('accessToken', '');

  const userStore = useUserStore();

  const { loginError } = userStore;

  const onSubmit = async (data, event) => {
    event.preventDefault();

    const { account, password } = data;
    const accessToken = await userStore.login({ identification: account, password });
    if (accessToken) {
      setAccessToken(accessToken);
      navigate('/');
    }
    // TODO: 특정 지점에서 로그인하는 경우 홈이 아닌 해당 특정 지점으로 돌아가게 해줄 수 있을까?
    //  localStorage를 사용해볼 수 있을 것 같다.
  };

  const handleClickRegister = (path) => {
    navigate(path);
  };

  return (
    <LoginForm
      register={register}
      handleSubmit={handleSubmit}
      callBackOnSubmit={onSubmit}
      navigateToRegister={handleClickRegister}
      errors={errors}
      loginError={loginError}
    />
  );
}
