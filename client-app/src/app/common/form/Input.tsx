import React from 'react';

interface TextInputProps {
  type?: string;
  name: string;
  placeholder?: string;
  defaultValue?: string;
  label: string;
  formRef?: any;
  error?: string;
}

export const Input: React.FC<TextInputProps> = ({ type, name, placeholder, defaultValue, label, formRef, error }) => {
  const inputClassName = error ? 'form-control is-invalid' : 'form-control';

  return (
    <div className='form-group textInput'>
      <label htmlFor={name}>{label}</label>
      <input type={type} name={name} id={name} placeholder={placeholder} defaultValue={defaultValue} ref={formRef} className={inputClassName} />
      {error && <div className='invalid-feedback'>{error}</div>}
    </div>
  );
};

Input.defaultProps = {
  type: 'text',
};
