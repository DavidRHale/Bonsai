import React, { useEffect, useContext } from 'react'
import { Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';

import Loader from '../../../app/layout/Loader';
import BonsaiStore from '../../../app/stores/bonsaiStore';

const BonsaiDashboard: React.FC = () => {
  const bonsaiStore = useContext(BonsaiStore);

  useEffect(() => {
    bonsaiStore.loadBonsais();
  }, [bonsaiStore]);

  if (bonsaiStore.loadingInitial) {
    return <Loader content='Loading activities...' />;
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        {/* <ActivityList /> */}
        {bonsaiStore.allBonsais.map(bonsai => {
          return (
            <h1>{bonsai.name}</h1>
          );
        })}
      </Grid.Column>
      <Grid.Column width={6}>
        {/* <h2>Activity Filters</h2> */}
      </Grid.Column>
    </Grid>
  )
};

export default observer(BonsaiDashboard);
