import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { observer } from 'mobx-react-lite';
import { useForm } from 'react-hook-form';

import { BonsaiFormValues } from '../../../app/models/bonsai';
import { RouteComponentProps } from 'react-router';
import { Input } from '../../../app/common/form/Input';
import { detailBonsaiRoute, LIST_BONSAI_ROUTE } from '../../../app/layout/appRoutes';
import { useRootStoreContext } from '../../../app/stores/rootStore';

interface FormParams {
  id: string;
}

type FormData = {
  name: string;
  species: string;
};

export const BonsaiFormComponent: React.FC<RouteComponentProps<FormParams>> = ({ match, history }) => {
  const { register, handleSubmit, errors } = useForm<FormData>();

  const onSubmit = handleSubmit(({ name, species }) => {
    if (!bonsai.id) {
      const newBonsai = {
        id: uuid(),
        name,
        species,
      };
      createBonsai(newBonsai);
    } else {
      editBonsai({ id: bonsai.id, name, species });
    }
  });

  const rootStore = useRootStoreContext();
  const { createBonsai, editBonsai, loadBonsai } = rootStore.bonsaiStore;

  const [bonsai, setBonsai] = useState(new BonsaiFormValues());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
      loadBonsai(match.params.id)
        .then((bonsai) => setBonsai(new BonsaiFormValues(bonsai)))
        .finally(() => setLoading(false));
    }
  }, [loadBonsai, match.params.id]);

  const title = match.params.id ? 'Edit Bonsai' : 'Create Bonsai';

  return (
    <div className='container'>
      <h3>{title}</h3>
      <form onSubmit={onSubmit}>
        <Input
          name='name'
          placeholder='Name'
          defaultValue={bonsai.name}
          label='Name'
          formRef={register({ required: true })}
          error={errors.name && 'Name is required'}
        />
        <Input
          name='species'
          placeholder='Species'
          defaultValue={bonsai.species}
          label='Species'
          formRef={register({ required: true })}
          error={errors.species && 'Species is required'}
        />
        <input type='submit' value='Submit' className='btn btn-primary' style={{ marginRight: '10px' }} />
        <button
          disabled={loading}
          onClick={bonsai.id ? () => history.push(detailBonsaiRoute(bonsai.id!)) : () => history.push(LIST_BONSAI_ROUTE)}
          type='button'
          className='btn btn-secondary'
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export const BonsaiForm = observer(BonsaiFormComponent);
