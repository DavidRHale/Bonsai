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
      <Grid.Column>
        <BonsaiList />
      </Grid.Column>
    </Grid>
  )
};

export default observer(BonsaiDashboard);
