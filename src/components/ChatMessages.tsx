"use client"
//hooks can only be used in client side

import { MessagesContext } from '@/context/messages';
import { FC, HTMLAttributes } from 'react';

interface ChatMessagesProps extends HTMLAttributes<HTMLDivElement> {

}

//Ended here 1:58:20

const ChatMessages: FC<ChatMessagesProps> = ({ className, ...props }) => {
    const { messages } = useContext(MessagesContext)
    const inverseMessages = [...messages].reverse();

    return <div {...props}>ChatMessages</div>
}

export default ChatMessages