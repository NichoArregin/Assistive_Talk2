import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Icon from '../components/Icon';
import "../styles/AddClientPage.css";  /* Import the new CSS */

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
        setError('');  // Clear previous errors on successful load
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
    // Add the new client and navigate home
    onAddClient(name.trim(), imagePreview);
    navigate('/');
  };

  return (
    <div className="add-client-container">
      <h2>Add a New Client Profile</h2>
      <form onSubmit={handleSubmit} noValidate>  {/* disable default HTML validation */}
        {/* Client Name field */}
        <div className="form-field">
          <label htmlFor="clientName">Client Name</label>
          <input
            id="clientName"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (error) setError('');  // clear error when typing
            }}
            placeholder="Enter the client's name"
            className="form-input"
            required 
            aria-describedby={error ? 'form-error' : undefined}
          />
        </div>

        {/* Client Image field */}
        <div className="form-field image-field">
          <label>Client Image</label>
          <div className="image-upload-row">
            <div className="avatar-preview">
              {imagePreview ? (
                <img src={imagePreview} alt="Client preview" className="avatar-image" />
              ) : (
                <Icon name="user" className="avatar-icon" />
              )}
            </div>
            <button 
              type="button" 
              onClick={triggerFileSelect} 
              className="btn btn-gray"
            >
              Upload Image
            </button>
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageChange} 
            className="hidden-file-input" 
            accept="image/*" 
            aria-label="Upload client image" 
          />
        </div>

        {/* Error message display */}
        {error && (
          <p id="form-error" className="form-error">
            {error}
          </p>
        )}

        {/* Action buttons */}
        <div className="form-actions">
          <Link to="/" className="btn btn-gray">Cancel</Link>
          <button type="submit" className="btn btn-blue">Save Client</button>
        </div>
      </form>
    </div>
  );
};

export default AddClientPage;
