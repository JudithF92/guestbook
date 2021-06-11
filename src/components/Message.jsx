import React from 'react';
import './Message.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';


export const Message = ({name, date, edited, id, text, editMessage, handleDeleteMessage}) => (
    <div className="messageWrapper">
        <p className="info"> 
            {name} 
            <span className="date">{moment(date).format("YYYY-MM-DD  HH:mm")}</span>
            <span className="icons">
                <button className="editMessage" onClick={(e) => editMessage(id, e)}><FontAwesomeIcon icon={faPen} /></button> 
                <button className="deleteMessage" onClick={(e) => handleDeleteMessage(id, e)}><FontAwesomeIcon icon={faTrash} /></button> 
            </span>
        </p>
        <div className="textWrapper">
            <p>
                {text}
            </p>
        </div>
        {edited ? <p className="edited">Last edited: {moment(edited).format("YYYY-MM-DD  HH:mm")}</p> 
                : <p className="transparent">Last edited:</p>}
    </div>
);