import React from 'react'
import { List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { IBonsai } from '../../../app/models/bonsai';

const ActivityListItem: React.FC<{ bonsai: IBonsai }> = ({ bonsai }) => {
  return (
    <List.Item>
      <List.Content>
        <List.Header>{bonsai.name}</List.Header>
        <List.Description>
          {`${bonsai.age} year old ${bonsai.species}`}
        </List.Description>
      </List.Content>
    </List.Item>
  );
}

export default observer(ActivityListItem);
