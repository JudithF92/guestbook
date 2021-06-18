import React from 'react';
import './ChangeMessageForm.css';

const ChangeMessage = ({ onTextChange, onEditMessage, onCancel}) => {
    return(
        <div className="overlayChangeMessage">
            <div className="changeMessageWrapper">
                <h3>Change Message</h3>
                Message <br/>
                <textarea className="enterMessage" onChange={onTextChange} />
                <button id="submitChange" onClick={onEditMessage}>Edit Message</button>
                <button id="cancel" onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
};

export default ChangeMessage;