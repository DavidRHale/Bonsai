import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';

import BonsaiListItem from './BonsaiListItem';
import { RootStoreContext } from '../../../app/stores/rootStore';

const BonsaiList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { allBonsais } = rootStore.bonsaiStore;

  return (
    <ul id='bonsai-list' className='list-group'>
      {allBonsais.map((bonsai) => (
        <BonsaiListItem key={bonsai.id} bonsai={bonsai} />
      ))}
    </ul>
  )
};

export default observer(BonsaiList);
