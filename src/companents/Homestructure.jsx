import React, { useState } from 'react';

const MAX_UPLOAD_SIZE_BYTES = 5 * 1024 * 1024;

function formatBytesToMegabytes(bytes) {
  return (bytes / (1024 * 1024)).toFixed(2);
}

export default function Homestructure() {
  const [selectedFileName, setSelectedFileName] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');

  const handleFileChange = (event) => {
    const [file] = event.target.files || [];

    if (!file) {
      setSelectedFileName('');
      setUploadError('');
      setUploadSuccess('');
      return;
    }

    if (file.size > MAX_UPLOAD_SIZE_BYTES) {
      setSelectedFileName('');
      setUploadSuccess('');
      setUploadError(
        `File exceeds the maximum upload size of ${formatBytesToMegabytes(MAX_UPLOAD_SIZE_BYTES)} MB.`
      );
      return;
    }

    setSelectedFileName(file.name);
    setUploadError('');
    setUploadSuccess(`"${file.name}" is ready to upload.`);
  };

  return (
    <section style={{ padding: '1rem' }}>
      <h2>Upload file</h2>
      <p>Maximum upload size: {formatBytesToMegabytes(MAX_UPLOAD_SIZE_BYTES)} MB</p>
      <label htmlFor="file-upload-input">Choose file</label>
      <input
        id="file-upload-input"
        type="file"
        onChange={handleFileChange}
        aria-describedby="upload-size-hint"
      />
      <small id="upload-size-hint" style={{ display: 'block', marginTop: '0.5rem' }}>
        Files larger than {formatBytesToMegabytes(MAX_UPLOAD_SIZE_BYTES)} MB are rejected.
      </small>
      {uploadError ? (
        <p role="alert" style={{ color: '#b00020' }}>
          {uploadError}
        </p>
      ) : null}
      {uploadSuccess ? (
        <p role="status" style={{ color: '#0b5e20' }}>
          {uploadSuccess}
        </p>
      ) : null}
      {selectedFileName ? <p>Selected file: {selectedFileName}</p> : null}
    </section>
  );
}
