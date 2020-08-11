import React from 'react';
import { JobListItem } from './JobListItem';
import { IJob } from '../../../app/models/job';
import { IBonsai } from '../../../app/models/bonsai';
import { Link } from 'react-router-dom';
import { createJobRoute } from '../../../app/layout/appRoutes';

const renderJobs = (jobs?: IJob[]) => {
    if (jobs && jobs.length > 0) {
        return (
            <ul className='list-group'>
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
    <div className='card'>
        <div className='card-body'>
            <h3 className='card-title font-weight-light'>
                Jobs
                <Link to={createJobRoute(bonsai.id)} className='btn btn-primary' style={{ marginLeft: '10px' }}>
                    Add A Job
                </Link>
            </h3>
            {renderJobs(bonsai.jobs)}
        </div>
    </div>
);
