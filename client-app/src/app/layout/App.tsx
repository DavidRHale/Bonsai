import React, { Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { Route, withRouter, RouteComponentProps, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import NavBar from '../../features/nav/NavBar';
import HomePage from '../../features/home/HomePage';
import BonsaiDashboard from '../../features/bonsai/dashboard/BonsaiDashboard';
import { LIST_BONSAI_ROUTE, DETAIL_BONSAI_ROUTE, MANAGE_ROUTE, CREATE_BONSAI_ROUTE } from './appRoutes';
import NotFound from './NotFound';
import BonsaiDetails from '../../features/bonsai/details/BonsaiDetails';
import BonsaiForm from '../../features/bonsai/form/BonsaiForm';

const App: React.FC<RouteComponentProps> = ({ location }) => {
  return (
    <Fragment>
      <ToastContainer position='bottom-right' />
      <Route exact path='/' component={HomePage} />

      <Route
        path={'/(.+)'}
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <Switch>
                <Route exact path={LIST_BONSAI_ROUTE} component={BonsaiDashboard} />
                <Route exact path={DETAIL_BONSAI_ROUTE} component={BonsaiDetails} />
                <Route key={location.key} path={[CREATE_BONSAI_ROUTE, MANAGE_ROUTE]} component={BonsaiForm} />
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
