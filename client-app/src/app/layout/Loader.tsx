import React from 'react';

interface IProps {
    hide?: boolean;
    style?: object;
}

const Loader: React.FC<IProps> = ({ hide, style }) => {
    if (hide == true) {
        return null;
    }

    return (
        <div className='d-flex justify-content-center' style={style}>
            <div className='d-flex flex-column'>
                <div className='spinner-border' role='status'></div>
            </div>
        </div>
    );
};
export default Loader;
