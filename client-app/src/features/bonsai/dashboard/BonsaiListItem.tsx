import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

import { IBonsai } from '../../../app/models/bonsai';
import { detailBonsaiRoute } from '../../../app/layout/appRoutes';
import { RootStoreContext } from '../../../app/stores/rootStore';

const BonsaiListItem: React.FC<{ bonsai: IBonsai }> = ({ bonsai }) => {
  const rootStore = useContext(RootStoreContext);
  const { deleteBonsai } = rootStore.bonsaiStore;

  return (
    <li id='bonsaiListItem' className='list-group-item card mb-3'>
      <div className='row card-body'>
        <div className='col'>
          <h3 className='card-title'>{bonsai.name}</h3>
          <p className='card-text'>{bonsai.species}</p>
        </div>

        <div className='col-2 btn-group-vertical'>
          <Link
            to={detailBonsaiRoute(bonsai.id)}
            className='btn btn-primary'
          >
            View
          </Link>
          <button
            onClick={event => deleteBonsai(event, bonsai.id)}
            className='btn btn-danger'
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}

export default observer(BonsaiListItem);
