import React from 'react';
import './ChangeMessage.css';

const ChangeMessage = ({ onTextChange, handleEditInput, onCancel}) => {
    return(
        <div className="changeMessageWrapper">
            <h3>Change Message</h3>
             Message <br/>
            <textarea className="enterMessage" placeholder="Enter Message" onChange={onTextChange} />
            <button id="submitChange" onClick={handleEditInput}>Edit Message</button>
            <button id="cancel" onClick={onCancel}>Cancel</button>
        </div>
    );
};

export default ChangeMessage;