import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { List } from 'semantic-ui-react';

import BonsaiListItem from './BonsaiListItem';
import BonsaiStore from '../../../app/stores/bonsaiStore';

const BonsaiList: React.FC = () => {
  const bonsaiStore = useContext(BonsaiStore);
  const { allBonsais } = bonsaiStore;

  return (
    <List>
      {allBonsais.map((bonsai) => (
        <BonsaiListItem key={bonsai.id} bonsai={bonsai} />
      ))}
    </List>
  )
};

export default observer(BonsaiList);
