import React from 'react';
import { shallow } from 'enzyme';

import { TextAreaInput } from '../../../app/common/form/TextAreaInput';

describe('TextAreaInput', () => {
  it('should render a div', () => {
    const wrapper = shallow(<TextAreaInput />);
    const textInput = wrapper.find('.textAreaInput');

    expect(textInput.exists()).toBe(true);
    expect(textInput.type()).toBe('div');
  });

  it('should have a text area element', () => {
    const wrapper = shallow(<TextAreaInput />);
    const textArea = wrapper.find('textarea');

    expect(textArea.exists()).toBe(true);
  });

  it('should have name passed through props', () => {
    const wrapper = shallow(<TextAreaInput name='aName' />);
    const textArea = wrapper.find('textarea');

    expect(textArea.props().name).toBe('aName');
  });

  it('should have a placeholder passed through props', () => {
    const wrapper = shallow(<TextAreaInput placeholder='aPlaceholder' />);
    const textArea = wrapper.find('textarea');

    expect(textArea.props().placeholder).toBe('aPlaceholder');
  });

  it('should have a value passed through props', () => {
    const wrapper = shallow(<TextAreaInput value='aValue' />);
    const textArea = wrapper.find('textarea');

    expect(textArea.props().value).toBe('aValue');
  });

  it('should set the textArea id to be the same as the name', () => {
    const wrapper = shallow(<TextAreaInput name='aName' />);
    const textArea = wrapper.find('textarea');

    expect(textArea.props().id).toBe('aName');
  });

  it('should have a lable for the textArea', () => {
    const wrapper = shallow(<TextAreaInput name='aName' />);
    const label = wrapper.find('label');

    expect(label.props().htmlFor).toBe('aName');
  });

  it('should have a label with text from props', () => {
    const wrapper = shallow(<TextAreaInput label='Label Text' />);
    const label = wrapper.find('label');

    expect(label.text()).toBe('Label Text');
  });
});