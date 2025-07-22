import React from 'react';
import '../styles/Modal.css';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h3>{title}</h3>
        <div className="modal-message">{message}</div>
        <div className="modal-buttons">
          <button onClick={onClose} className="btn btn-gray">Cancel</button>
          <button onClick={onConfirm} className="btn btn-red">Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
