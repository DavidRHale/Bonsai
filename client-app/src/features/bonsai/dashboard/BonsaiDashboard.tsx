import React, { useEffect, useContext } from 'react'
import { Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';

import Loader from '../../../app/layout/Loader';
import { RootStoreContext } from '../../../app/stores/rootStore';
import BonsaiList from './BonsaiList';

const BonsaiDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadBonsais, loadingInitial } = rootStore.bonsaiStore;

  useEffect(() => {
    loadBonsais();
  }, [loadBonsais]);

  if (loadingInitial) {
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
