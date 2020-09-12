import React, { useEffect, useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import InfiniteScroll from 'react-infinite-scroller';

import Loader from '../../../app/layout/Loader';
import { RootStoreContext } from '../../../app/stores/rootStore';
import BonsaiList from './BonsaiList';

const BonsaiDashboard: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const { loadBonsais, loadingInitial, setPage, page, totalPages } = rootStore.bonsaiStore;
    const [loadingNext, setLoadingNext] = useState(false);

    useEffect(() => {
        loadBonsais();
    }, [loadBonsais]);

    const handleLoadMore = () => {
        setLoadingNext(true);
        setPage(page + 1);
        loadBonsais().then(() => setLoadingNext(false));
    };

    if (loadingInitial && page === 0) {
        return <Loader />;
    }

    return (
        <div id='bonsaiDashboard' className='container'>
            <InfiniteScroll
                pageStart={0}
                loadMore={handleLoadMore}
                hasMore={!loadingNext && page + 1 < totalPages}
                initialLoad={false}
            >
                <BonsaiList />
            </InfiniteScroll>
            <Loader hide={!loadingNext} />
        </div>
    );
};

export default observer(BonsaiDashboard);
