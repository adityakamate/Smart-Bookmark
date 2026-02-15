import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Aurora',
  description: 'Smart Bookmark Manager',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen`}>
        <main className="flex flex-col items-center py-10 min-h-screen px-4 max-w-4xl mx-auto w-full">
          {children}
        </main>
      </body>
    </html>
  )
}
