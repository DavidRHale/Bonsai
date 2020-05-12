import React from 'react';
import { JobListItem } from './JobListItem';
import { IJob } from '../../../app/models/job';
import { IBonsai } from '../../../app/models/bonsai';
import { Link } from 'react-router-dom';
import { createJobRoute } from '../../../app/layout/appRoutes';

const renderJobs = (jobs?: IJob[]) => {
  if (jobs && jobs.length > 0) {
    return (
      <ul>
        {jobs.map((job) => (
          <JobListItem key={job.id} {...job}></JobListItem>
        ))}
      </ul>
    );
  }

  return <p>No jobs for this bonsai</p>;
};

interface IProps {
  bonsai: IBonsai;
}

export const JobList: React.FC<IProps> = ({ bonsai }) => (
  <div>
    <h3>Jobs</h3>
    {renderJobs(bonsai.jobs)}
    <Link to={createJobRoute(bonsai.id)} className='btn btn-secondary'>
      Add A Job
    </Link>
  </div>
);
