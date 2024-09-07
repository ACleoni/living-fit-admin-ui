import React, { useRef } from 'react';
import { Form, Container } from 'react-bootstrap';

export const Dropzone = ({ dropzoneId, inputId, name, updateFormData, accept }) => {
    const dropzoneRef = useRef(null);
    const inputRef = useRef(null);

    const handleClick = () => {
        inputRef.current.click();
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        dropzoneRef.current.classList.add('dragover');
    };

    const handleDragLeave = () => {
        dropzoneRef.current.classList.remove('dragover');
    };

    const handleDrop = (e) => {
        e.preventDefault();
        dropzoneRef.current.classList.remove('dragover');
        const files = e.dataTransfer.files;
        if (files.length) {
            inputRef.current.files = files;
            dropzoneRef.current.textContent = files[0].name;
            updateFormData(files[0], inputRef.current.id);
        }
    };

    const handleChange = () => {
        const files = inputRef.current.files;
        if (files.length) {
            inputRef.current.files = files;
            dropzoneRef.current.textContent = files[0].name;
            updateFormData(files[0], inputRef.current.id);
        }
    };

    return (
        <Container
            id={dropzoneId}
            ref={dropzoneRef}
            onClick={handleClick}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className="dropzone p-3 mb-3"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
            </svg>
            <Form.Control
            id={inputId}
            ref={inputRef} 
            type="file" 
            name={name} 
            accept={accept}
            style={{ display: 'none' }} 
            required={true}
            onChange={handleChange}
            />
        </Container>
    );
};