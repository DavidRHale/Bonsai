import React, { useContext } from 'react'
import { Segment, Item, Button } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

import { IBonsai } from '../../../app/models/bonsai';
import { detailBonsaiRoute } from '../../../app/layout/appRoutes';
import { RootStoreContext } from '../../../app/stores/rootStore';

const BonsaiListItem: React.FC<{ bonsai: IBonsai }> = ({ bonsai }) => {
  const rootStore = useContext(RootStoreContext);
  const { deleteBonsai } = rootStore.bonsaiStore;

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
        <Button
          as={Link}
          to={detailBonsaiRoute(bonsai.id)}
          floated='right'
          content='View'
          color='blue'
        />
        <Button
          onClick={event => deleteBonsai(event, bonsai.id)}
          floated='right'
          content='Delete'
          color='red'
        />
      </Segment>
    </Segment.Group>
  );
}

export default observer(BonsaiListItem);
