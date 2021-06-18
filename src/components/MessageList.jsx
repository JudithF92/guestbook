import React from 'react';
import {Message} from './Message';

const DisplayMessages = ({messages, onEditMessage, onDeleteMessage}) => {
    return (
        <div>
            {
                messages.map((message, i) => {
                    return (
                     <Message 
                        key={i} 
                        {...message} 
                        onEditMessage={onEditMessage} 
                        onDeleteMessage={onDeleteMessage} />
                    );
                })
            }
                 
        </div>
    );
}

export default DisplayMessages;