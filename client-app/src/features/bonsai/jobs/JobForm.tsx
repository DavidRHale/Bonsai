import React from 'react';
import { useForm } from 'react-hook-form';

import { JobType, toPrettyString } from '../../../app/enum/JobType';
import { getEnumValues } from '../../../app/enum/getEnumValues';
import { Input } from '../../../app/common/form/Input';
import { RouteComponentProps } from 'react-router-dom';
import uuid from 'uuid';
import { useRootStoreContext } from '../../../app/stores/rootStore';
import { IJob } from '../../../app/models/job';
import { Select } from '../../../app/common/form/Select';

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

  const rootStore = useRootStoreContext();
  const { createJob } = rootStore.bonsaiStore;

  const onSubmit = handleSubmit((job: FormData) => {
    const newJob: IJob = {
      ...job,
      id: uuid(),
      jobType: +job.jobType,
      bonsaiId: match.params.bonsaiId,
    };
    createJob(newJob);
  });

  const options = getEnumValues(JobType).map((jobType) => (
    <option key={jobType.value} value={jobType.value}>
      {toPrettyString(jobType.value)}
    </option>
  ));
  options.unshift(<option value=''>Select job type...</option>);

  return (
    <div className='container'>
      <h3>Job Form</h3>
      <form onSubmit={onSubmit}>
        <Select options={options} name='jobType' formRef={register({ required: true })} error={errors.jobType && 'Job Type is required'} />
        {+jobType === JobType.Other && (
          <Input
            name='customName'
            label='Custom Name'
            placeholder='Custom Name'
            formRef={register({ required: +jobType === JobType.Other })}
            error={errors.customName && 'Custom Name is required'}
          />
        )}
        <Input name='dueBy' type='date' label='Due by' formRef={register({ required: true })} error={errors.dueBy && 'Due by date is required'} />
        <input type='submit' value='Add job' className='btn btn-primary' />
      </form>
    </div>
  );
};
