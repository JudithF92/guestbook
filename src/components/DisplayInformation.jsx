import React from 'react';
import './DisplayInformation.css';

const DisplayInformation = ({displayInformation, onCancel}) => (
    <div className="overlayDisplayInformation">
        <div className="changeMessageWrapper displayInfo">
            <h3>{displayInformation}</h3>
            <button id="cancel" onClick={onCancel} >OK</button>
        </div>
    </div>
);

export default DisplayInformation;