import React from 'react';
import { shallow } from 'enzyme';

import { Input } from '../../../app/common/form/Input';

describe('TextInput', () => {
  it('should render a div', () => {
    const wrapper = shallow(<Input />);
    const textInput = wrapper.find('.textInput');

    expect(textInput.exists()).toBe(true);
    expect(textInput.type()).toBe('div');
  });

  it('should have a default input of type text', () => {
    const wrapper = shallow(<Input />);
    const input = wrapper.find('input');

    expect(input.props().type).toBe('text');
  });

  if ('should override input type if passed as props', () => {
    const wrapper = shallow(<Input type='password' />);
    const input = wrapper.find('input');

    expect(input.props().type).toBe('password');
  })

    it('should have name passed through props', () => {
      const wrapper = shallow(<Input name='aName' />);
      const input = wrapper.find('input');

      expect(input.props().name).toBe('aName');
    });

  it('should have a placeholder passed through props', () => {
    const wrapper = shallow(<Input placeholder='aPlaceholder' />);
    const input = wrapper.find('input');

    expect(input.props().placeholder).toBe('aPlaceholder');
  });

  it('should have a defaultValue passed through props', () => {
    const wrapper = shallow(<Input defaultValue='aValue' />);
    const input = wrapper.find('input');

    expect(input.props().defaultValue).toBe('aValue');
  });

  it('should set the input id to be the same as the name', () => {
    const wrapper = shallow(<Input name='aName' />);
    const input = wrapper.find('input');

    expect(input.props().id).toBe('aName');
  });

  it('should have a label for the input', () => {
    const wrapper = shallow(<Input name='aName' />);
    const label = wrapper.find('label');

    expect(label.props().htmlFor).toBe('aName');
  });

  it('should have a label with text from props', () => {
    const wrapper = shallow(<Input label='Label Text' />);
    const label = wrapper.find('label');

    expect(label.text()).toBe('Label Text');
  });

  // todo test it gets the ref passed in
});