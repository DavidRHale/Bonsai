import React, { useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { LIST_BONSAI_ROUTE } from '../../app/layout/appRoutes';
import { RootStoreContext } from '../../app/stores/rootStore';
import LoginForm from '../user/LoginForm';
import RegisterForm from '../user/RegisterForm';

const HomePage = () => {
  const rootStore = useContext(RootStoreContext);
  const { isLoggedIn, user } = rootStore.userStore;
  const { openModal } = rootStore.modalStore;

  return (
    <Fragment>
      <div>
        <h1>
          <img src='/assets/logo.png' alt='logo' style={{ marginBottom: 12 }} />
          Bonsai App
      </h1>
        {
          isLoggedIn && user ? (
            <div>
              <h2>{`Welcome back ${user.displayName}`}</h2>
              <Link to={LIST_BONSAI_ROUTE}>
                See your bonsai!
            </Link>
            </div>
          ) : (
              <div>
                <h2>Welcome to Bonsai App</h2>
                <button onClick={() => openModal(<LoginForm />)}>
                  Log In
              </button>
                <button onClick={() => openModal(<RegisterForm />)}>
                  Register
              </button>
              </div>
            )
        }
      </div>
    </Fragment>
  );
};

export default HomePage;