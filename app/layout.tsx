import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dezvoltare Web în Profunzime',
  description: 'Prezentare interactivă despre tehnologii web',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ro">
      <body className="bg-gradient-animated bg-grid min-h-screen">
        {children}
      </body>
    </html>
  )
}
