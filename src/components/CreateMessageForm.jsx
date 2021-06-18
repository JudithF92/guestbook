import React from 'react';
import './CreateMessageForm.css';

const UserInput = ({onNameChange, onTextChange, onSubmitInput, onCancel}) => {        
    return(
        <div className="overlayNewMessage">
            <div className="userInputWrapper">
                <h3>Enter New Message</h3>
                Name <br/>
                <input className="name" type="text" onChange={onNameChange} /><br />
                Message <br/>
                <textarea className="enterMessage" onChange={onTextChange} />
                <button id="submitInput" onClick={onSubmitInput}>Send Message</button>
                <button id="cancel" onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
};

export default UserInput;