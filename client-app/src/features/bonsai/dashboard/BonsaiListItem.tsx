import React from 'react'
import { List } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

import { IBonsai } from '../../../app/models/bonsai';
import { detailBonsaiRoute } from '../../../app/layout/appRoutes';

const BonsaiListItem: React.FC<{ bonsai: IBonsai }> = ({ bonsai }) => {
  return (
    <List.Item>
      <List.Content>
        <List.Header>{bonsai.name}</List.Header>
        <List.Description>
          {`${bonsai.age} year old ${bonsai.species}`}
        </List.Description>
        <List.Content><Link to={detailBonsaiRoute(bonsai.id)}>{bonsai.id}</Link></List.Content>
      </List.Content>
    </List.Item>
  );
}

export default observer(BonsaiListItem);
