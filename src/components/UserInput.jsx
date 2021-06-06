import React from 'react';
import './UserInput.css';

const UserInput = ({onNameChange, onTextChange, onSubmitInput, onCancel}) => {        
    return(
        <div className="userInputWrapper">
            <h3>Enter New Message</h3>
            Name <br/>
            <input className="name" type="text" placeholder="Name" onChange={onNameChange} /><br />
            Message <br/>
            <textarea className="enterMessage" placeholder="Enter Message" onChange={onTextChange} />
            <button id="submitInput" onClick={onSubmitInput}>Send Message</button>
            <button id="cancel" onClick={onCancel}>Cancel</button>
        </div>
    );
};

export default UserInput;