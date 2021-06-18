import React from 'react';
import './ConfirmDeleteMessage.css';

const ConfirmDeleteMessage = ({onDeleteMessage, onCancel}) => (
    <div className="overlayConfirmDeleteMessage">
        <div className="changeMessageWrapper">
            <h3>Are you sure you want to delete this message?</h3>
            <button id="submitChange" onClick={onDeleteMessage}>Delete Message</button>
            <button id="cancel" onClick={onCancel} >Cancel</button>
        </div>
    </div>
);

export default ConfirmDeleteMessage;