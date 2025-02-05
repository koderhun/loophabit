import {Metadata} from '@/components'
import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Metadata />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
