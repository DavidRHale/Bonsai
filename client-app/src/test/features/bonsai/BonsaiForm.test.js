import React from 'react';
import { shallow } from 'enzyme';

import { BonsaiForm } from '../../../features/bonsai/form/BonsaiForm';

describe('BonsaiForm', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BonsaiForm />);
  });

  it('should render a form', () => {
    const form = wrapper.find(`form[id="bonsaiForm"]`);
    expect(form).not.toBeNull();
  });
});