"use client"
//a nextJS issue with trying to render on server rather than on client

import { cn } from '@/lib/utils'
import { FC, HTMLAttributes, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { useMutation } from '@tanstack/react-query';
import { nanoid } from 'nanoid';
import { Message } from '@/lib/validators/message';

interface ChatInputProps extends HTMLAttributes<HTMLDivElement> {

}

//cn function just combines classNames together
const ChatInput: FC<ChatInputProps> = ({ className, ...props }) => {
    const [input, setInput] = useState<string>("");
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
        onSuccess: async (stream) => {
            if (!stream) throw new Error("No stream found");

            const reader = stream.getReader()
            const decoder = new TextDecoder();
            let done = false;

            while (!done) {
                const { value, done: doneReading } = await reader.read();
                done = doneReading;
                const chunkValue = decoder.decode(value);
                console.log(chunkValue);
            }
        }
    })

    console.log(input);
    return <div {...props} className={cn('border-t border-zinc-300', className)}>
        <div className="p-4 relative mt-4 rounded-lg border-none outline-none flex-1 overflow-hidden">
            <TextareaAutosize
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