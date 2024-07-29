import { useState } from 'react';

export default function FileUpload({ userId  }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userId);
    // formData.append('formType', formType)
    
    setUploading(true);
    setError(null);

    try {
      const response = await fetch('/api/upload-user-files', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('File upload failed');
      }

      const data = await response.json();
      console.log('File uploaded successfully', data);
    } catch (error) {
      setError(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit" disabled={uploading} className='my-5 border px-1 border-gray-400 rounded-sm bg-gray-200' >
        {uploading ? 'Uploading...' : 'Upload File'}
      </button>
      {error && <p>Error: {error}</p>}
    </form>
  );
}
