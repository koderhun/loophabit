'use client'
import {Metadata, Header} from '@/components'
import './globals.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <Metadata />
      </head>
      <body>
        <Header />
        <main className="mx-auto max-w-screen-xl py-4">{children}</main>
      </body>
    </html>
  )
}
