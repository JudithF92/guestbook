import React from 'react';
import {Message} from './Message';

const DisplayMessages = ({messages, onEditMessage, onDeleteMessage, onStoreMessageStatus, onTryAgain, messageIndex}) => {
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
                        onStoreMessageStatus={`${i===messageIndex ? onStoreMessageStatus : ''}`}
                        onTryAgain={onTryAgain} 
                    />
                    );
                })
            }
        </div>
    );
}

export default DisplayMessages;