import React, { useContext, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import BonsaiStore from '../../../app/stores/bonsaiStore';
import Loader from '../../../app/layout/Loader';
import { observer } from 'mobx-react-lite';

interface DetailParams {
  id: string
}

const BonsaiDetails: React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {
  const bonsaiStore = useContext(BonsaiStore);
  const { bonsai, loadBonsai, loadingInitial } = bonsaiStore;

  useEffect(() => {
    loadBonsai(match.params.id).catch(() => history.push('/notfound'))
  }, [loadBonsai, match.params.id, history]);


  if (loadingInitial || !bonsai) {
    return <Loader content='Loading bonsai...' />
  }

  if (!bonsai) {
    return <h2>Bonsai not found</h2>;
  }

  return (
    <div>
      <h1>{bonsai.name}</h1>
    </div>
  )
}

export default observer(BonsaiDetails);
