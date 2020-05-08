import React, { useContext, useEffect } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import Loader from '../../../app/layout/Loader';
import { manageBonsaiRoute, createJobRoute } from '../../../app/layout/appRoutes';
import { RootStoreContext } from '../../../app/stores/rootStore';

interface DetailParams {
  id: string;
}

const BonsaiDetails: React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {
  const rootStore = useContext(RootStoreContext);
  const { bonsai, loadBonsai, loadingInitial } = rootStore.bonsaiStore;

  useEffect(() => {
    loadBonsai(match.params.id);
  }, [loadBonsai, match.params.id, history]);

  if (loadingInitial) {
    return <Loader />;
  }

  if (!bonsai) {
    return <h2>Bonsai not found</h2>;
  }

  const renderJobs = () => {
    const { jobs } = bonsai;
    if (jobs && jobs.length > 0) {
      return (
        <ul>
          {jobs.map((job) => (
            <li key={job.id}>{job.jobType}</li>
          ))}
        </ul>
      );
    }

    return <p>No jobs for this bonsai</p>;
  };

  return (
    <div id="bonsaiDetails" className="container">
      <h1>{bonsai.name}</h1>
      <p>{bonsai.species}</p>
      <Link to={manageBonsaiRoute(bonsai.id)} className="btn btn-secondary">
        Manage Bonsai
      </Link>
      <h3>Jobs</h3>
      {renderJobs()}
      <Link to={createJobRoute(bonsai.id)} className="btn btn-secondary">
        Add A Job
      </Link>
    </div>
  );
};

export default observer(BonsaiDetails);
