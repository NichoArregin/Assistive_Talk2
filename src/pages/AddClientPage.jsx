import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Icon from '../components/Icon';

const AddClientPage = ({ onAddClient }) => {
  const [name, setName] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file (e.g., JPG, PNG, GIF).');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Client name cannot be empty.');
      return;
    }
    if (!imagePreview) {
      setError('Please upload an image for the client.');
      return;
    }
    // Create new client and navigate home
    onAddClient(name.trim(), imagePreview);
    navigate('/');
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add a New Client Profile</h2>
      <form onSubmit={handleSubmit}>
        {/* Client Name field */}
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Client Name</label>
          <input 
            type="text"
            value={name}
            onChange={(e) => { setName(e.target.value); if (error) setError(''); }}
            placeholder="Enter the client's name"
            className="form-input"
            required
            aria-describedby={error ? 'form-error' : undefined}
          />
        </div>
        {/* Client Image field */}
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Client Image</label>
          <div className="flex items-center gap-4">
            {imagePreview ? (
              <img 
                src={imagePreview} 
                alt="Client preview" 
                className="w-16 h-16 rounded-full object-cover" 
              />
            ) : (
              <Icon name="user" className="w-16 h-16 rounded-full bg-slate-600 flex-shrink-0" />
            )}
            <button type="button" onClick={triggerFileSelect} className="btn btn-blue">
              Upload Image
            </button>
          </div>
          <input 
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
            accept="image/*"
          />
        </div>
        {/* Error message */}
        {error && (
          <p id="form-error" className="text-red-500 mb-3">{error}</p>
        )}
        {/* Action buttons */}
        <div className="flex justify-end gap-3">
          <Link to="/" className="btn btn-gray">Cancel</Link>
          <button type="submit" className="btn btn-green">Save Client</button>
        </div>
      </form>
    </div>
  );
};

export default AddClientPage;
