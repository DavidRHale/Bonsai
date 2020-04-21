import React, { Fragment, useContext, useEffect } from 'react';
import { Container, Loader } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { Route, withRouter, RouteComponentProps, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import NavBar from '../../features/nav/NavBar';
import HomePage from '../../features/home/HomePage';
import BonsaiDashboard from '../../features/bonsai/dashboard/BonsaiDashboard';
import { LIST_BONSAI_ROUTE, DETAIL_BONSAI_ROUTE, MANAGE_ROUTE, CREATE_BONSAI_ROUTE, LOG_IN_ROUTE, REGISTER_ROUTE } from './appRoutes';
import NotFound from './NotFound';
import BonsaiDetails from '../../features/bonsai/details/BonsaiDetails';
import { BonsaiForm } from '../../features/bonsai/form/BonsaiForm';
import LoginForm from '../../features/user/LoginForm';
import { RootStoreContext } from '../stores/rootStore';
import ModalContainer from '../common/modals/ModalContainer';
import RegisterForm from '../../features/user/RegisterForm';

const App: React.FC<RouteComponentProps> = ({ location }) => {
  const rootStore = useContext(RootStoreContext);
  const { setAppLoaded, token, appLoaded } = rootStore.commonStore;
  const { getUser } = rootStore.userStore;

  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded());
    } else {
      setAppLoaded();
    }
  }, [getUser, setAppLoaded, token]);

  if (!appLoaded) {
    return <Loader content='Loading...' />
  };

  return (
    <Fragment>
      <ModalContainer />
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
                <Route exact path={LOG_IN_ROUTE} component={LoginForm} />
                <Route exact path={REGISTER_ROUTE} component={RegisterForm} />
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
