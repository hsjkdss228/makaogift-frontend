import { useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';

import useUserStore from '../hooks/useUserStore';

import SignUpForm from '../components/SignUpForm';

export default function SignUpPage() {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({ reValidateMode: 'onSubmit' });

  const userStore = useUserStore();

  const { signUpErrors } = userStore;

  const onSubmit = async (data, event) => {
    event.preventDefault();

    const {
      name, account, password, confirmPassword,
    } = data;
    const registeredName = await userStore.register({
      name, identification: account, password, confirmPassword,
    });
    if (registeredName) {
      navigate('/welcome');
    }
  };

  return (
    <SignUpForm
      register={register}
      handleSubmit={handleSubmit}
      callBackOnSubmit={onSubmit}
      errors={errors}
      signUpErrors={signUpErrors}
    />
  );
}
