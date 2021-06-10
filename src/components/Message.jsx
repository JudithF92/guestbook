import React from 'react';
import './Message.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';


export const Message = ({name, position, text, editMessage, handleDeleteMessage}) => (
    <div className="messageWrapper">
        <p className="info"> 
            {name} 
            <span className="date"> Mar 3 '18 at 20:49</span>
            <span className="icons">
                <button className="editMessage" onClick={(e) => editMessage(position, e)}><FontAwesomeIcon icon={faPen} /></button> 
                <button className="deleteMessage" onClick={(e) => handleDeleteMessage(position, e)}><FontAwesomeIcon icon={faTrash} /></button> 
            </span>
        </p>
        <div className="textWrapper">
            <p>
                {text}
            </p>
        </div>
        <p className="edited">Last edited: Mar 3 '18 at 20:49</p>
    </div>
);