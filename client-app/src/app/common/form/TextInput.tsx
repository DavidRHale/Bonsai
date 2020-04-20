import React from 'react'

interface TextInputProps {
  name: string;
  placeholder: string;
  value: string;
  label: string;
}

export const TextInput: React.FC<TextInputProps> = ({ name, placeholder, value, label }) => (
  <div className='textInput'>
    <label htmlFor={name}>{label}</label>
    <input
      type='text'
      name={name}
      id={name}
      placeholder={placeholder}
      value={value}
    />
  </div>
);
