import React from 'react';
import {Message} from './Message';

const DisplayMessages = ({messages, editMessage, handleDeleteMessage}) => {
    return (
        <div>
            {
                messages.map((message, i) => {
                    return (
                     <Message key={i} position={i} name={message.name} text={message.text} editMessage={editMessage} handleDeleteMessage={handleDeleteMessage} />
                    );
                })
            }
                 
        </div>
    );
}

export default DisplayMessages;