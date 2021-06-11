import React from 'react';
import {Message} from './Message';

const DisplayMessages = ({messages, editMessage, handleDeleteMessage}) => {
    return (
        <div>
            {
                messages.map((message, i) => {
                    return (
                     <Message 
                        key={i} 
                        id={message.id} 
                        date={message.date}
                        edited={message.edited}
                        name={message.name} 
                        text={message.text} 
                        editMessage={editMessage} 
                        handleDeleteMessage={handleDeleteMessage} />
                    );
                })
            }
                 
        </div>
    );
}

export default DisplayMessages;