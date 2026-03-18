import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Colegio San Felipe Neri - Bogotá',
  description: 'Portal oficial del Colegio San Felipe Neri, Bogotá. Educando Líderes desde 1965.',
  keywords: 'colegio, san felipe neri, bogotá, educación, secundaria, alcázares',
  openGraph: {
    title: 'Colegio San Felipe Neri - Bogotá',
    description: 'Portal oficial del Colegio San Felipe Neri. Educando Líderes desde 1965.',
    type: 'website',
    locale: 'es_CO',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="es">
        <body className={`${inter.className} antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
