import React from 'react';
import './Message.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';


export const Message = ({name, text}) => (
    <div className="messageWrapper">
        <p className="info"> 
            {name} 
            <span className="date"> Mar 3 '18 at 20:49</span>
            <span className="icons"><FontAwesomeIcon icon={faPen} /> <FontAwesomeIcon icon={faTrash} /></span>
        </p>
        <div className="textWrapper">
            <p>
                {text}
            </p>
        </div>
        <p className="edited">Last edited: Mar 3 '18 at 20:49</p>
    </div>
);