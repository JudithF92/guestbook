import React from 'react';
import './Message.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faSpinner, faCheckSquare, faTimes } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

const switchFunction = (onStoreMessageStatus, onTryAgain) => {
    switch (onStoreMessageStatus) {
        case 'sending':
            return <p><FontAwesomeIcon icon={faSpinner} spin /> Storing Message...</p>;
        case 'succeeded':
            return <p><FontAwesomeIcon icon={faCheckSquare} color="green" /> Message Stored</p>;
        case 'failed':
            return <p><FontAwesomeIcon icon={faTimes} color="red" /> An error occurred. <span className="tryAgain" onClick={onTryAgain}><i>Try again?</i></span></p>;
        default:
            return <p />;
    }
}

export const Message = ({name, date, edited, id, text, onEditMessage, onDeleteMessage, onStoreMessageStatus, onTryAgain}) => (
    <div className="messageWrapper">
        <p className="info"> 
            <span className="nameSpan">{name}</span>
            <span className="date">{moment(date).format("YYYY-MM-DD  HH:mm")}</span>
            <span className="icons">
                <button className="editMessage" onClick={(e) => onEditMessage(id, e)}><FontAwesomeIcon icon={faPen} /></button> 
                <button className="deleteMessage" onClick={(e) => onDeleteMessage(id, e)}><FontAwesomeIcon icon={faTrash} /></button> 
            </span>
        </p>
        <div className="textWrapper">
            <p>
                {text}
            </p>
        </div>
        <div className="messageBottom">
            {switchFunction(onStoreMessageStatus, onTryAgain)}

            {edited ? <p className="edited">Last edited: {moment(edited).format("YYYY-MM-DD  HH:mm")}</p> 
                    : <p className="transparent">Last edited:</p>}
        </div>
    </div>
);