import React from 'react';

interface IProps {
  options: JSX.Element[];
  name: string;
  formRef?: any;
  error?: string;
}

export const Select: React.FC<IProps> = ({ options, name, formRef, error }) => {
  const selectClassName = error ? 'custom-select is-invalid' : 'custom-select';

  return (
    <div className='form-group'>
      <select className={selectClassName} name={name} ref={formRef}>
        {options}
      </select>
      {error && <div className='invalid-feedback'>{error}</div>}
    </div>
  );
};
