import './globals.css'
import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter } from 'next/font/google'

import Navbar from './Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Custom Form Field Editor',
  description: 'Edit custom form fields for Camunda Forms',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>

      <Navbar />
      {children}

      {/* This is needed for the mrflap extension to work */}
      <Script src="https://code.jquery.com/jquery-3.7.0.min.js"></Script>
      </body>
    </html>
  )
}
