import React, { useContext } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Button, Header } from 'semantic-ui-react';
import { Input } from '../../app/common/form/Input';
import { RootStoreContext } from '../../app/stores/rootStore';
import { IUserFormValues } from '../../app/models/user';
import { FORM_ERROR } from 'final-form';
import { combineValidators, isRequired } from 'revalidate';
import ErrorMessage from '../../app/common/form/ErrorMessage';

const validate = combineValidators({
  email: isRequired('email'),
  username: isRequired('username'),
  displayName: isRequired('displayName'),
  password: isRequired('password'),
})

const RegisterForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { register } = rootStore.userStore;

  return (
    <FinalForm
      onSubmit={(values: IUserFormValues) => register(values).catch(error => ({
        [FORM_ERROR]: error
      }))
      }
      validate={validate}
      render={({ handleSubmit, submitting, form, submitError, invalid, pristine, dirtySinceLastSubmit }) => (
        <Form onSubmit={handleSubmit} error>
          <Header
            as='h2'
            content='Register'
            color='teal'
            textAlign='center'
          />
          {/* <Field
            name='email'
            placeholder='Email'
            component={TextInput}
          />
          <Field
            name='username'
            placeholder='Username'
            component={TextInput}
          />
          <Field
            name='displayName'
            placeholder='Display Name'
            component={TextInput}
          />
          <Field
            name='password'
            type='password'
            placeholder='Password'
            component={TextInput}
          /> */}
          {submitError && !dirtySinceLastSubmit && (
            <ErrorMessage error={submitError} />
          )
          }
          <br />
          <Button
            disabled={(invalid && !dirtySinceLastSubmit) || pristine}
            loading={submitting}
            content='Register'
            color='teal'
            fluid
          />
        </Form >
      )}
    />
  );
};

export default RegisterForm;