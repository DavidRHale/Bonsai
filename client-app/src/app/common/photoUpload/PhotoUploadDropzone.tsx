import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface IProps {
    setFiles: (files: object[]) => void;
}

const dropzoneStyles = {
    border: 'dashed 3px',
    borderColor: '#eee',
    borderRadius: '5px',
    paddingTop: '30px',
    textAlign: 'center' as 'center',
    height: '200px',
};

const dropzoneActive = {
    borderColor: 'green',
};

export const PhotoUploadDropzone: React.FC<IProps> = ({ setFiles }) => {
    const onDrop = useCallback(
        (acceptedFiles) => {
            setFiles(
                acceptedFiles.map((file: object) => {
                    return Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    });
                })
            );
        },
        [setFiles]
    );
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div {...getRootProps()} style={isDragActive ? { ...dropzoneStyles, ...dropzoneActive } : dropzoneStyles}>
            <input {...getInputProps()} />
            <i className='fa fa-upload fa-7x'></i>
            <h4 className='mt-2'>Drop image here</h4>
        </div>
    );
};
