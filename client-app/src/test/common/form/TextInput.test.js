import React from 'react';
import { shallow } from 'enzyme';

import { TextInput } from '../../../app/common/form/TextInput';

describe('TextInput', () => {
  it('should render a div', () => {
    const wrapper = shallow(<TextInput />);
    const textInput = wrapper.find('.textInput');

    expect(textInput.exists()).toBe(true);
    expect(textInput.type()).toBe('div');
  });

  it('should have an input of type text', () => {
    const wrapper = shallow(<TextInput />);
    const input = wrapper.find('input');

    expect(input.exists()).toBe(true);
    expect(input.props().type).toBe('text');
  });

  it('should have name passed through props', () => {
    const wrapper = shallow(<TextInput name='aName' />);
    const input = wrapper.find('input');

    expect(input.props().name).toBe('aName');
  });

  it('should have a placeholder passed through props', () => {
    const wrapper = shallow(<TextInput placeholder='aPlaceholder' />);
    const input = wrapper.find('input');

    expect(input.props().placeholder).toBe('aPlaceholder');
  });

  it('should have a value passed through props', () => {
    const wrapper = shallow(<TextInput value='aValue' />);
    const input = wrapper.find('input');

    expect(input.props().value).toBe('aValue');
  });

  it('should set the input id to be the same as the name', () => {
    const wrapper = shallow(<TextInput name='aName' />);
    const input = wrapper.find('input');

    expect(input.props().id).toBe('aName');
  });

  it('should have a lable for the input', () => {
    const wrapper = shallow(<TextInput name='aName' />);
    const label = wrapper.find('label');

    expect(label.props().htmlFor).toBe('aName');
  });

  it('should have a label with text from props', () => {
    const wrapper = shallow(<TextInput label='Label Text' />);
    const label = wrapper.find('label');

    expect(label.text()).toBe('Label Text');
  });
});