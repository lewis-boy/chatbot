"use client"
//hooks can only be used in client side

import { MessagesContext } from '@/context/messages';
import { cn } from '@/lib/utils';
import { FC, HTMLAttributes, useContext } from 'react';

interface ChatMessagesProps extends HTMLAttributes<HTMLDivElement> {

}



const ChatMessages: FC<ChatMessagesProps> = ({ className, ...props }) => {
    const { messages } = useContext(MessagesContext)
    const inverseMessages = [...messages].reverse();

    //the tailwind will put the messages back in order, but we will end up
    //at the bottom of the messages instead of the top and having to scroll down

    return <div {...props} className={cn(className, 'flex flex-col-reverse gap-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch')}>
        <div className="flex-1 flex-grow" />
        {inverseMessages.map((message) => (
            <div key={`${message.id}`} className='chat-message'>
                <div className={cn('flex items-end', {
                    'justify-end': message.isUserMessage,
                })}>
                    <div className={cn('flex flex-col space-y-2 text-sm max-w-xs mx-2 overflow-x-hidden', {
                        'bg-blue-600 text-white': message.isUserMessage,
                        'bg-gray-200 text-gray-900': !message.isUserMessage,
                    })}>
                        <p className={cn('px-4 py-2 rounded-lg', {
                            'bg-blue-600 text-white': message.isUserMessage,
                            'bg-gray-200 text-gray-900': !message.isUserMessage,
                        })}>{message.text}</p>
                        {/* <MarkdownLite text={message.text} /> */}

                    </div>
                </div>
            </div>
        ))}
    </div>
}

export default ChatMessages