import React, { useState, useContext, Fragment } from 'react';

import { IPhoto } from '../../../app/models/photo';
import { PhotoUpload } from '../../../app/common/photoUpload/PhotoUpload';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { observer } from 'mobx-react-lite';
import Loader from '../../../app/layout/Loader';

interface IProps {
    photos?: IPhoto[];
}

const BonsaiPhotosComponent: React.FC<IProps> = ({ photos }) => {
    const rootStore = useContext(RootStoreContext);
    const { uploadingPhoto, uploadPhoto, deletingPhoto, deletePhoto } = rootStore.bonsaiStore;

    const [addPhotoMode, setAddPhotoMode] = useState(false);

    const [deleteTarget, setDeleteTarget] = useState('');

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
                                    {deletingPhoto && deleteTarget === photo.id ? (
                                        <Loader style={{ marginTop: '100px' }} />
                                    ) : (
                                        <Fragment>
                                            <img className='img-fluid img-thumbnail' src={photo.url} alt='bonsai' />
                                            <button
                                                onClick={() => {
                                                    deletePhoto(photo);
                                                    setDeleteTarget(photo.id);
                                                }}
                                                className='btn btn-danger'
                                                style={{
                                                    position: 'absolute',
                                                    top: '15px',
                                                    right: '25px',
                                                    height: '40px',
                                                    width: '40px',
                                                }}
                                            >
                                                <i className='fa fa-trash'></i>
                                            </button>
                                        </Fragment>
                                    )}
                                </div>
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export const BonsaiPhotos = observer(BonsaiPhotosComponent);
