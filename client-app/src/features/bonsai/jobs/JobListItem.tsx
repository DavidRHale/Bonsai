import React from 'react';
import { JobType, toPrettyString } from '../../../app/enum/JobType';

const toDisplayDate = (timestamp: string | Date) => {
  return new Date(timestamp).toDateString();
};

interface IProps {
  jobType: JobType;
  customName?: string;
  dueBy: Date;
}

export const JobListItem: React.FC<IProps> = ({ jobType, customName, dueBy }) => {
  return (
    <li className='card' style={{ marginBottom: '5px' }}>
      <div className='card-body'>
        <h6 className='card-title'>{jobType === JobType.Other ? customName : toPrettyString(jobType)}</h6>
        <p className='card-text'>Due by {toDisplayDate(dueBy)}</p>
      </div>
    </li>
  );
};
