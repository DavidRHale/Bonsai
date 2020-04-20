import React from 'react';

interface IProps {
  name: string;
  placeholder: string;
  value: string;
  label: string;
};

export const TextAreaInput: React.FC<IProps> = ({ name, placeholder, value, label }) => (
  <div className='textAreaInput'>
    <label htmlFor={name}>{label}</label>
    <textarea
      name={name}
      id={name}
      placeholder={placeholder}
      value={value}
    />
  </div>
);