import React, { Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { Route, withRouter, RouteComponentProps, Switch } from 'react-router-dom';

import NavBar from '../../features/nav/NavBar';
import HomePage from '../../features/home/HomePage';
import BonsaiDashboard from '../../features/bonsai/dashboard/BonsaiDashboard';
import { LIST_BONSAI_ROUTE, DETAIL_BONSAI_ROUTE } from './appRoutes';
import NotFound from './NotFound';
import BonsaiDetails from '../../features/bonsai/details/BonsaiDetails';

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
              <Switch>
                <Route exact path={LIST_BONSAI_ROUTE} component={BonsaiDashboard} />
                <Route exact path={DETAIL_BONSAI_ROUTE} component={BonsaiDetails} />
                {/* <Route exact path='/activities/:id' component={ActivityDetails} />
              <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm} /> */}
                <Route component={NotFound} />
              </Switch>
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));
