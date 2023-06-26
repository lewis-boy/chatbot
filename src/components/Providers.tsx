"use client"

//This is a client component that will encapsulate all context providers we have in our application
import { FC, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface ProvidersProps {
    children: ReactNode
}


const Providers: FC<ProvidersProps> = ({ children }) => {
    const queryClient = new QueryClient();
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default Providers;