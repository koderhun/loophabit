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
        <main className="py-8">{children}</main>
      </body>
    </html>
  )
}
