import React from 'react'

interface TextInputProps {
  name: string;
  placeholder: string;
  defaultValue: string;
  label: string;
  formRef: any;
}

export const TextInput: React.FC<TextInputProps> = ({ name, placeholder, defaultValue, label, formRef }) => (
  <div className='textInput'>
    <label htmlFor={name}>{label}</label>
    <input
      type='text'
      name={name}
      id={name}
      placeholder={placeholder}
      defaultValue={defaultValue}
      ref={formRef}
    />
  </div>
);
