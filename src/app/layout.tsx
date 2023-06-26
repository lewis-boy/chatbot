import Chat from '@/components/Chat'
import './globals.css'
import { Inter } from 'next/font/google'
import Providers from '@/components/Providers'

// You can't add context to a server component
//This is a server component by default

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Book chat buddy',
  description: 'Your bookstore for novels all around the world!!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>
          <Chat />
          {children}
        </body>
      </Providers>
    </html>
  )
}
