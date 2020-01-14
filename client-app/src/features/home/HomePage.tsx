import React from 'react';
import { Container, Segment, Header, Button, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { LIST_BONSAI_ROUTE } from '../../app/layout/appRoutes';

const HomePage = () => {
  return (
    <Segment inverted textAlign='center' vertical className='masthead' >
      <Container text>
        <Header as='h1' inverted>
          <Image size='massive' src='/assets/logo.png' alt='logo' style={{ marginBottom: 12 }} />
          Bonsai App
            </Header>
        <Header as='h2' inverted content='Welcome to Reactivities' />
        <Button as={Link} to={LIST_BONSAI_ROUTE} size='huge' inverted>
          Take me to the trees!
            </Button>
      </Container>
    </Segment>
  );
};

export default HomePage;