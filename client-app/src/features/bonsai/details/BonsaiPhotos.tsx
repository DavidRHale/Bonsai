import React, { useState, useContext } from 'react';

import { IPhoto } from '../../../app/models/photo';
import { PhotoUpload } from '../../../app/common/photoUpload/PhotoUpload';
import { RootStoreContext } from '../../../app/stores/rootStore';
import Loader from '../../../app/layout/Loader';
import { observer } from 'mobx-react-lite';

interface IProps {
    photos?: IPhoto[];
}

const BonsaiPhotosComponent: React.FC<IProps> = ({ photos }) => {
    const rootStore = useContext(RootStoreContext);
    const { uploadingPhoto, uploadPhoto } = rootStore.bonsaiStore;

    const [addPhotoMode, setAddPhotoMode] = useState(false);

    const handleUploadPhoto = (photo: Blob) => {
        uploadPhoto(photo).then(() => setAddPhotoMode(false));
    };

    return (
        <div className='card mt-3'>
            <div className='card-body'>
                <h3 className='card-title font-weight-light mb-3'>
                    Photos
                    <button className='btn btn-primary float-right' onClick={() => setAddPhotoMode(!addPhotoMode)}>
                        {addPhotoMode ? 'Cancel' : 'Add Photo'}
                    </button>
                </h3>

                {addPhotoMode ? (
                    <PhotoUpload uploadPhoto={handleUploadPhoto} loading={uploadingPhoto} />
                ) : (
                    <div className='row'>
                        {photos &&
                            photos.map((photo) => (
                                <div key={photo.id} className='col-lg-3 col-md-4 col-6 mb-3'>
                                    <img className='img-fluid img-thumbnail' src={photo.url} alt='bonsai' />
                                </div>
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export const BonsaiPhotos = observer(BonsaiPhotosComponent);
