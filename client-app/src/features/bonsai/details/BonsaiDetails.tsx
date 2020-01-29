import React, { useContext, useEffect } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';

import BonsaiStore from '../../../app/stores/bonsaiStore';
import Loader from '../../../app/layout/Loader';
import { observer } from 'mobx-react-lite';
import { Button } from 'semantic-ui-react';
import { manageRoute } from '../../../app/layout/appRoutes';

interface DetailParams {
  id: string
}

const BonsaiDetails: React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {
  const bonsaiStore = useContext(BonsaiStore);
  const { bonsai, loadBonsai, loadingInitial } = bonsaiStore;

  useEffect(() => {
    loadBonsai(match.params.id)
  }, [loadBonsai, match.params.id, history]);

  if (loadingInitial) {
    return <Loader content='Loading bonsai...' />
  }

  if (!bonsai) {
    return <h2>Bonsai not found</h2>;
  }

  return (
    <div>
      <h1>{bonsai.name}</h1>
      <Button
        as={Link}
        to={manageRoute(bonsai.id)}
        color='orange'
        floated='right'
      >
        Manage Bonsai
      </Button>
    </div>
  )
}

export default observer(BonsaiDetails);
