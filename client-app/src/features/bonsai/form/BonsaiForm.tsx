import React, { useState, useContext, useEffect } from 'react'
import { Segment, Form, Button, Grid } from 'semantic-ui-react';
import { v4 as uuid } from 'uuid';
import { Form as FinalForm, Field } from 'react-final-form';
import { combineValidators, isRequired, isNumeric, composeValidators } from 'revalidate';

import { BonsaiFormValues } from '../../../app/models/bonsai';
import BonsaiStore from '../../../app/stores/bonsaiStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';
import TextInput from '../../../app/common/form/TextInput';

import { detailBonsaiRoute, LIST_BONSAI_ROUTE } from '../../../app/layout/appRoutes';

const validate = combineValidators({
  name: isRequired('Name'),
  species: isRequired('Species'),
  age: composeValidators(
    isRequired('Age'),
    isNumeric('Age')
  )(),
});

interface FormParams {
  id: string
}

const BonsaiForm: React.FC<RouteComponentProps<FormParams>> = ({ match, history }) => {
  const bonsaiStore = useContext(BonsaiStore);
  const { createBonsai, editBonsai, submitting, loadBonsai } = bonsaiStore;

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

  const handleFinalFormSubmit = (values: any) => {
    const formBonsai = {
      ...values,
      age: +values.age
    };

    if (!values.id) {
      const newBonsai = {
        ...formBonsai,
        id: uuid()
      };
      createBonsai(newBonsai);
    } else {
      editBonsai(formBonsai);
    }
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            initialValues={bonsai}
            onSubmit={handleFinalFormSubmit}
            validate={validate}
            render={({ handleSubmit, invalid, pristine }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
                <Field
                  name='name'
                  placeholder='Name'
                  value={bonsai.name}
                  component={TextInput}
                />
                <Field
                  name='species'
                  placeholder='Species'
                  value={bonsai.species}
                  component={TextInput}
                />
                <Field
                  component={TextInput}
                  name='age'
                  placeholder='Age'
                  value={'' + bonsai.age}
                />
                <Button
                  disabled={loading || invalid || pristine}
                  floated='right'
                  positive
                  type='submit'
                  content='Submit'
                  loading={submitting}
                />
                <Button
                  disabled={loading}
                  onClick={bonsai.id ? () => history.push(detailBonsaiRoute(bonsai.id!)) : () => history.push(LIST_BONSAI_ROUTE)}
                  floated='right'
                  type='button'
                  content='Cancel'
                />
              </Form>
            )}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  );
}

export default observer(BonsaiForm);
