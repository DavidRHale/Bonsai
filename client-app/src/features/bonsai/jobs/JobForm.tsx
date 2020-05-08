import React from 'react';
import { useForm } from 'react-hook-form';

import { JobType } from '../../../app/enum/JobType';
import { getEnumValues } from '../../../app/enum/getEnumValues';
import { Input } from '../../../app/common/form/Input';
import { RouteComponentProps } from 'react-router-dom';

interface FormParams {
  bonsaiId: string;
}

type FormData = {
  jobType: JobType;
  dueBy: Date;
  customName?: string;
  bonsaiId: string;
};

export const JobForm: React.FC<RouteComponentProps<FormParams>> = ({ match }) => {
  const { register, handleSubmit, errors, watch } = useForm<FormData>();
  const jobType = watch('jobType');

  const onSubmit = handleSubmit((job) => {
    console.log(job);
    console.log(match.params.bonsaiId);
  });

  return (
    <div>
      <h1>Job Form</h1>
      <form onSubmit={onSubmit}>
        <select name="jobType" ref={register({ required: true })}>
          <option value="">Select job type...</option>
          {getEnumValues(JobType).map((jobType) => (
            <option key={jobType.value} value={jobType.value}>
              {jobType.name}
            </option>
          ))}
        </select>
        {+jobType === JobType.Other && <Input name="customName" label="Custom Name" placeholder="Custom Name" formRef={register({ required: false })} />}
        {errors.jobType && 'Job Type is required'}
        <Input name="dueBy" type="date" label="Due by" formRef={register({ required: true })} />
        {errors.dueBy && 'Due by date is required'}
        <input type="submit" value="Add job" />
      </form>
    </div>
  );
};
