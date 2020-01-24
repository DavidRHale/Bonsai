import React, { useEffect, useContext } from 'react'
import { Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';

import Loader from '../../../app/layout/Loader';
import BonsaiStore from '../../../app/stores/bonsaiStore';
import BonsaiList from './BonsaiList';

const BonsaiDashboard: React.FC = () => {
  const bonsaiStore = useContext(BonsaiStore);

  useEffect(() => {
    bonsaiStore.loadBonsais();
  }, [bonsaiStore]);

  if (bonsaiStore.loadingInitial) {
    return <Loader content='Loading your bonsai...' />;
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        <BonsaiList />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Bonsai Filters</h2>
      </Grid.Column>
    </Grid>
  )
};

export default observer(BonsaiDashboard);
