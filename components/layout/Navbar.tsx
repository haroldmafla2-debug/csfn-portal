'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, GraduationCap } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/noticias', label: 'Noticias' },
  { href: '/galeria', label: 'Galería' },
  { href: '/calendario', label: 'Calendario' },
  { href: '/contacto', label: 'Contacto' },
  { href: '/matriculas', label: 'Matrículas' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white',
      scrolled ? 'shadow-md' : 'shadow-sm'
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: '#1B3A6B' }}>
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-bold leading-tight" style={{ color: '#1B3A6B' }}>Colegio</p>
              <p className="text-xs font-semibold leading-tight" style={{ color: '#C8A951' }}>San Felipe Neri</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  pathname === link.href
                    ? 'text-white'
                    : 'text-gray-600 hover:text-white hover:bg-[#1B3A6B]'
                )}
                style={pathname === link.href ? { backgroundColor: '#1B3A6B' } : {}}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth button */}
          <div className="flex items-center gap-3">
            <Link
              href="/sign-in"
              className="hidden sm:inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold text-white transition-colors hover:opacity-90"
              style={{ backgroundColor: '#1B3A6B' }}
            >
              Ingresar
            </Link>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-md text-gray-600"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Menú"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-3">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'block px-3 py-2 rounded-md text-sm font-medium',
                  pathname === link.href ? 'text-white' : 'text-gray-600'
                )}
                style={pathname === link.href ? { backgroundColor: '#1B3A6B' } : {}}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/sign-in"
              className="block px-3 py-2 rounded-md text-sm font-semibold text-white text-center mt-2"
              style={{ backgroundColor: '#1B3A6B' }}
              onClick={() => setIsOpen(false)}
            >
              Ingresar al Portal
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
