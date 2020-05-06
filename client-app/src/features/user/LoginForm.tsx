import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Input } from '../../app/common/form/Input';
import { RootStoreContext } from '../../app/stores/rootStore';
import { IUserFormValues } from '../../app/models/user';
import { Link } from 'react-router-dom';
import { REGISTER_ROUTE } from '../../app/layout/appRoutes';

type FormData = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { login } = rootStore.userStore;
  const { register, handleSubmit, errors } = useForm<FormData>();

  const [submitError, setSubmitError] = useState('');

  const onSubmit = handleSubmit((values: IUserFormValues) => {
    login(values).catch((error) => setSubmitError(error));
  });

  const clearSubmitError = () => submitError && setSubmitError('');

  return (
    <div>
      <form onSubmit={onSubmit} onChange={clearSubmitError}>
        <h2>Log In</h2>
        <Input name="email" placeholder="Email" label="Email" formRef={register({ required: true })} />
        {errors.email && 'Email is required'}
        <Input type="password" name="password" placeholder="Password" label="Password" formRef={register({ required: true })} />
        {errors.password && 'Password is required'}
        {submitError && 'Invalid email or password'}
        <br />
        <button type="submit">Log In</button>
      </form>
      <p>
        Don't have an accout? Sign up <Link to={REGISTER_ROUTE}>here</Link>
      </p>
    </div>
  );
};

export default LoginForm;
