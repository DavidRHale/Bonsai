import React, { useContext, Fragment } from 'react';
import { Container, Segment, Header, Button, Image } from 'semantic-ui-react';
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
    <Segment inverted textAlign='center' vertical className='masthead' >
      <Container text>
        <Header as='h1' inverted>
          <Image size='massive' src='/assets/logo.png' alt='logo' style={{ marginBottom: 12 }} />
          Bonsai App
        </Header>
        {isLoggedIn && user ? (
          <Fragment>
            <Header as='h2' inverted content={`Welcome back ${user.displayName}`} />
            <Button as={Link} to={LIST_BONSAI_ROUTE} size='huge' inverted>
              See your bonsai!
            </Button>
          </Fragment>
        ) : (
            <Fragment>
              <Header as='h2' inverted content={`Welcome to Bonsai App`} />
              <Button onClick={() => openModal(<LoginForm />)} size='huge' inverted>
                Log In
              </Button>
              <Button onClick={() => openModal(<RegisterForm />)} size='huge' inverted>
                Register
              </Button>
            </Fragment>
          )
        }
      </Container>
    </Segment>
  );
};

export default HomePage;