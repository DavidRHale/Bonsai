import React, { useContext, useEffect } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import Loader from '../../../app/layout/Loader';
import { manageBonsaiRoute } from '../../../app/layout/appRoutes';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { JobList } from '../jobs/JobList';
import { BonsaiPhotos } from './BonsaiPhotos';

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

    const ageString = () => {
        if (bonsai.estimatedAge === 1) {
            return '1 year';
        }

        if (bonsai.estimatedAge > 0) {
            return `${bonsai.estimatedAge} years`;
        }
    };

    return (
        <div id='bonsaiDetails' className='container'>
            <div className='row'>
                <div className='col-sm-6'>
                    <div className='card'>
                        <div className='card-body'>
                            <h2 className='card-title font-weight-light'>{bonsai.name}</h2>
                            <p className='card-text'>Species: {bonsai.species}</p>
                            <p className='card-text'>Estimated age: {ageString()}</p>
                            <p className='card-text'>Pot type: {bonsai.potType}</p>
                            <p className='card-text'>Design: {bonsai.design}</p>
                            <Link to={manageBonsaiRoute(bonsai.id)} className='btn btn-primary'>
                                Manage Bonsai
                            </Link>
                        </div>
                    </div>
                </div>

                <div className='col-sm-6'>
                    <JobList bonsai={bonsai} />
                </div>
            </div>

            <BonsaiPhotos photos={bonsai.photos} />
        </div>
    );
};

export default observer(BonsaiDetails);
