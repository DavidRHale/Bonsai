import React, { useState, useEffect, Fragment } from 'react';
import { observer } from 'mobx-react-lite';

import { PhotoUploadDropzone } from './PhotoUploadDropzone';
import { PhotoCropper } from './PhotoCropper';
import Loader from '../../layout/Loader';

interface IProps {
    uploadPhoto: (file: Blob) => void;
    loading: boolean;
}

const PhotoUploadComponent: React.FC<IProps> = ({ uploadPhoto, loading }) => {
    const [files, setFiles] = useState<any[]>([]);
    const [image, setImage] = useState<Blob | null>(null);

    useEffect(() => {
        return () => {
            files.forEach((file) => URL.revokeObjectURL(file.preview));
        };
    });

    return (
        <div className='row'>
            <div className='col-4'>
                <h4>Step 1 - Add Photo</h4>
                <PhotoUploadDropzone setFiles={setFiles} />
            </div>
            <div className='col-4'>
                <h4>Step 2 - Resize image</h4>
                {files.length > 0 && <PhotoCropper setImage={setImage} imagePreview={files[0].preview} />}
            </div>
            <div className='col-4'>
                <h4>Step 3 - Preview and upload</h4>
                {files.length > 0 && (
                    <Fragment>
                        <div className='img-preview' style={{ minHeight: '200px', overflow: 'hidden' }} />
                        <div className='btn-group w-100' role='group'>
                            <button
                                className='btn btn-success'
                                onClick={() => uploadPhoto(image!)}
                                aria-label='Upload photo'
                            >
                                {loading ? <Loader /> : <i className='fa fa-check'></i>}
                            </button>
                            <button
                                className='btn btn-danger'
                                disabled={loading}
                                onClick={() => setFiles([])}
                                aria-label='Cancel upload photo'
                            >
                                <i className='fa fa-close'></i>
                            </button>
                        </div>
                    </Fragment>
                )}
            </div>
        </div>
    );
};

export const PhotoUpload = observer(PhotoUploadComponent);
