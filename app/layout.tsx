import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

// Clerk is loaded conditionally so the site builds in demo mode without keys
const hasClerk = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  if (hasClerk) {
    const { ClerkProvider } = await import('@clerk/nextjs')
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

  return (
    <html lang="es">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}
