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
      <div className='row'>
        <div className='col-sm-6'>
          <div className='card'>
            <div className='card-body'>
              <h4 className='card-title'>{bonsai.name}</h4>
              <p className='card-text'>Species: {bonsai.species}</p>
              <p className='card-text'>Other details: Other details go here</p>
              <p className='card-text'>Other details: Other details go here</p>
              <p className='card-text'>Other details: Other details go here</p>
              <p className='card-text'>Other details: Other details go here</p>
              <Link to={manageBonsaiRoute(bonsai.id)} className='btn btn-primary'>
                Manage Bonsai
              </Link>
            </div>
          </div>
        </div>

        <div className='col-sm-6'>
          <JobList bonsai={bonsai} />
        </div>
      </div>
    </div>
  );
};

export default observer(BonsaiDetails);
