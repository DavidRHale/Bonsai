import React, { useContext, useEffect } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import Loader from '../../../app/layout/Loader';
import { manageBonsaiRoute } from '../../../app/layout/appRoutes';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { JobList } from '../jobs/JobList';

interface DetailParams {
  id: string;
}

const BonsaiDetails: React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {
  const rootStore = useContext(RootStoreContext);
  const { bonsai, loadBonsai, loadingInitial } = rootStore.bonsaiStore;

  useEffect(() => {
    loadBonsai(match.params.id);
  }, [loadBonsai, match.params.id, history]);

  if (loadingInitial) {
    return <Loader />;
  }

  if (!bonsai) {
    return <h2>Bonsai not found</h2>;
  }

  return (
    <div id='bonsaiDetails' className='container'>
      <h1>{bonsai.name}</h1>
      <p>{bonsai.species}</p>
      <Link to={manageBonsaiRoute(bonsai.id)} className='btn btn-secondary'>
        Manage Bonsai
      </Link>
      <JobList bonsai={bonsai} />
    </div>
  );
};

export default observer(BonsaiDetails);
