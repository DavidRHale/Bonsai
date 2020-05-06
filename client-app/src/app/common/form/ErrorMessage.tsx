import React from 'react';
import { AxiosResponse } from 'axios';

interface IProps {
  error: AxiosResponse,
  text?: string
}

const ErrorMessage: React.FC<IProps> = ({ error, text }) => {
  return (
    <div>
      {error.data && Object.keys(error.data.errors).length > 0 && (
        <ul>
          {Object.values(error.data.errors).flat().map((err, index) => (
            <li key={index}>{err}</li>
          ))}
        </ul>
      )}
      {text}
    </div>
  );
};

export default ErrorMessage;