import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { List } from 'semantic-ui-react';

import BonsaiListItem from './BonsaiListItem';
import { RootStoreContext } from '../../../app/stores/rootStore';

const BonsaiList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { allBonsais } = rootStore.bonsaiStore;

  // TODO: List bonsai by species category to filter on
  return (
    <List>
      {allBonsais.map((bonsai) => (
        <BonsaiListItem key={bonsai.id} bonsai={bonsai} />
      ))}
    </List>
  )
};

export default observer(BonsaiList);
