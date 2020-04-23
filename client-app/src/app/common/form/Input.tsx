import React from 'react'

interface TextInputProps {
  type?: string;
  name: string;
  placeholder: string;
  defaultValue?: string;
  label: string;
  formRef: any;
}

export const Input: React.FC<TextInputProps> = ({ type, name, placeholder, defaultValue, label, formRef }) => (
  <div className='textInput'>
    <label htmlFor={name}>{label}</label>
    <input
      type={type}
      name={name}
      id={name}
      placeholder={placeholder}
      defaultValue={defaultValue}
      ref={formRef}
    />
  </div>
);


Input.defaultProps = {
  type: 'text'
};
