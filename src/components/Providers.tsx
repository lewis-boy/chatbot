"use client"

//This is a client component that will encapsulate all context providers we have in our application
import { FC, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MessagesProvider } from '@/context/messages';

interface ProvidersProps {
    children: ReactNode
}


const Providers: FC<ProvidersProps> = ({ children }) => {
    const queryClient = new QueryClient();
    return <QueryClientProvider client={queryClient}>
        <MessagesProvider>{children}</MessagesProvider>
    </QueryClientProvider>
}

export default Providers;