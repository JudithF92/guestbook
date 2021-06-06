import React from 'react';
import {Message} from './Message';

const DisplayMessages = ({messages}) => {
    return (
        <div>
            {
                messages.map((message, i) => {
                    return (
                     <Message key={i} name={message.name} text={message.text} />
                    );
                })
            }
                 
        </div>
    );
}

export default DisplayMessages;