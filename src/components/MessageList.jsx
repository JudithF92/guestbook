import React from 'react';
import {Message} from './Message';

const DisplayMessages = ({messages, onEditMessage, onDeleteMessage, onStoreMessageStatus}) => {
    return (
        <div>
            {
                messages.map((message, i) => {
                    return (
                     <Message 
                        key={i} 
                        {...message} 
                        onEditMessage={onEditMessage} 
                        onDeleteMessage={onDeleteMessage}
                        onStoreMessageStatus={onStoreMessageStatus} />
                    );
                })
            }
                 
        </div>
    );
}

export default DisplayMessages;