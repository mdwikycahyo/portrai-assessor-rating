import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PortrAI Assessor Mockup',
  description: 'Created by PortrAI',
  generator: 'Future of Work',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
