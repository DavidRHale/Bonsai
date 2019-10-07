import React, { Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { Route, withRouter, RouteComponentProps } from 'react-router-dom';

import NavBar from '../../features/nav/NavBar';
import HomePage from '../../features/home/HomePage';
import BonsaiDashboard from '../../features/bonsai/dashboard/BonsaiDashboard';
// import ActivityForm from '../../features/Activities/Form/ActivityForm';
// import ActivityDetails from '../../features/Activities/Details/ActivityDetails'

const App: React.FC<RouteComponentProps> = ({ location }) => {
  return (
    <Fragment>
      <Route exact path='/' component={HomePage} />

      <Route
        path={'/(.+)'}
        render={() => (
          <Fragment>
            <NavBar />}
            <Container style={{ marginTop: '7em' }}>
              <Route exact path='/activities' component={BonsaiDashboard} />
              {/* <Route exact path='/activities/:id' component={ActivityDetails} />
              <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm} /> */}
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));
