"use client"
//a nextJS issue with trying to render on server rather than on client

import { cn } from '@/lib/utils'
import { FC, HTMLAttributes, useContext, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { useMutation } from '@tanstack/react-query';
import { nanoid } from 'nanoid';
import { Message } from '@/lib/validators/message';
import { MessagesContext } from '@/context/messages';

interface ChatInputProps extends HTMLAttributes<HTMLDivElement> {

}

//cn function just combines classNames together
const ChatInput: FC<ChatInputProps> = ({ className, ...props }) => {
    const [input, setInput] = useState<string>("");
    const { messages, addMessage, removeMessage, updateMessage, setIsMessageUpdating } = useContext(MessagesContext)

    //refs grants us access to a DOM node
    //we can now manipulate it programmatically 

    const textareaRef = useRef<null | HTMLTextAreaElement>(null);

    const { mutate: sendMessage, isLoading } = useMutation({
        mutationFn: async (message: Message) => {
            const response = await fetch('/api/message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ messages: [message] }),
            })

            return response.body;
        },
        onMutate(message) {
            addMessage(message);
        },
        onSuccess: async (stream) => {
            if (!stream) throw new Error("No stream found");

            const id = nanoid();
            const responseMessage: Message = {
                id,
                isUserMessage: false,
                text: ''
            };

            addMessage(responseMessage);
            setIsMessageUpdating(true);


            const reader = stream.getReader()
            const decoder = new TextDecoder();
            let done = false;

            while (!done) {
                const { value, done: doneReading } = await reader.read();
                done = doneReading;
                const chunkValue = decoder.decode(value);
                updateMessage(id, (prev) => prev + chunkValue);
            }

            //clean up
            setIsMessageUpdating(false);
            setInput('');
            //didn't work when accessed immediately, so we are using a Timeout
            setTimeout(() => {
                textareaRef.current?.focus();
            }, 10);
        }
    })

    // console.log(input);
    //mission: refocus the chatinput after being done, so the 
    //user can immediately writing a response or another question
    //we need a ref to do that
    return <div {...props} className={cn('border-t border-zinc-300', className)}>
        <div className="p-4 relative mt-4 rounded-lg border-none outline-none flex-1 overflow-hidden">
            <TextareaAutosize
                ref={textareaRef}
                rows={2}
                maxRows={4}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();

                        const message: Message = {
                            id: nanoid(),
                            isUserMessage: true,
                            text: input
                        }

                        sendMessage(message)
                    }
                }}
                autoFocus
                placeholder="Write a message..."
                className="peer disabled:opacity-50 pr-14 resize-none block w-full border-0 bg-zinc-100 py-1.5 text-gray-900 focus:ring-0 text-sm smile sm:leading-6" />
        </div>
    </div>
}

export default ChatInput