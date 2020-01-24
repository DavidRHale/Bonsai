import React from 'react'
import { List, Segment, Item, Button } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

import { IBonsai } from '../../../app/models/bonsai';
import { detailBonsaiRoute } from '../../../app/layout/appRoutes';

const BonsaiListItem: React.FC<{ bonsai: IBonsai }> = ({ bonsai }) => {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size='tiny' circular src='/assets/user.png' />
            <Item.Content>
              <Item.Header as='a'>{bonsai.name}</Item.Header>
              <Item.Description>
                {bonsai.species}
              </Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment clearing>
        <span>{`${bonsai.age} year old ${bonsai.species}`}</span>
        <Button
          as={Link}
          to={`/bonsai/${bonsai.id}`}
          floated='right'
          content='View'
          color='blue'
        />
      </Segment>
    </Segment.Group>
  );
}

export default observer(BonsaiListItem);
