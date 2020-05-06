import React, { useEffect, useContext } from 'react';
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
    return <Loader />;
  }

  return (
    <div id="bonsaiDashboard" className="container">
      <BonsaiList />
    </div>
  );
};

export default observer(BonsaiDashboard);
