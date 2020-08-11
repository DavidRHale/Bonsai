import React from 'react';

interface IProps {
    style?: object;
}

const Loader: React.FC<IProps> = ({ style }) => (
    <div className='d-flex justify-content-center' style={style}>
        <div className='d-flex flex-column'>
            <div className='spinner-border' role='status'></div>
        </div>
    </div>
);
export default Loader;
