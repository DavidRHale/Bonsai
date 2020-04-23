import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Input } from '../../app/common/form/Input';
import { RootStoreContext } from '../../app/stores/rootStore';
import { IUserFormValues } from '../../app/models/user';
import ErrorMessage from '../../app/common/form/ErrorMessage';
import { AxiosResponse } from 'axios';

type FormData = {
  email: string;
  username: string;
  displayName: string;
  password: string;
}

const RegisterForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { registerUser } = rootStore.userStore;
  const { register, handleSubmit, errors } = useForm<FormData>();

  const [submitError, setSubmitError] = useState<AxiosResponse | null>(null);

  const onSubmit = handleSubmit((values: IUserFormValues) => {
    registerUser(values)
      .catch(error => setSubmitError(error));
  });

  return (
    <form onSubmit={onSubmit}>
      <h2>Register</h2>
      <Input
        name='email'
        placeholder='Email'
        label='Email'
        formRef={register({ required: true })}
      />
      {errors.email && 'Email is required'}
      <Input
        name='username'
        placeholder='Username'
        label='Username'
        formRef={register({ required: true })}
      />
      {errors.username && 'Username is required'}
      <Input
        name='displayName'
        placeholder='Display Name'
        label='Display Name'
        formRef={register({ required: true })}
      />
      {errors.displayName && 'Display Name is required'}
      <Input
        type='password'
        name='password'
        placeholder='Password'
        label='Password'
        formRef={register({ required: true })}
      />
      {errors.password && 'Password is required'}
      <br />
      <button type='submit'>
        Register
      </button>
      {submitError && <ErrorMessage error={submitError} />}
    </form >
  )
};

export default RegisterForm;