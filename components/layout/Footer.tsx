import Link from 'next/link'
import { GraduationCap, MapPin, Phone, Mail, Facebook, Youtube, Instagram } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer style={{ backgroundColor: '#1B3A6B' }} className="text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & descripción */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <GraduationCap className="w-6 h-6" style={{ color: '#C8A951' }} />
              </div>
              <div>
                <p className="font-bold text-base leading-tight">Colegio San Felipe Neri</p>
                <p className="text-xs text-white/70">Bogotá, Colombia</p>
              </div>
            </div>
            <p className="text-sm text-white/80 leading-relaxed">
              Institución educativa privada y católica. Formando líderes con valores desde 1965.
            </p>
            {/* Redes sociales */}
            <div className="flex gap-3 mt-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links rápidos */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4" style={{ color: '#C8A951' }}>
              Navegación
            </h3>
            <ul className="space-y-2">
              {[
                { href: '/nosotros', label: 'Nosotros' },
                { href: '/noticias', label: 'Noticias' },
                { href: '/galeria', label: 'Galería' },
                { href: '/calendario', label: 'Calendario' },
                { href: '/matriculas', label: 'Matrículas' },
                { href: '/contacto', label: 'Contacto' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/75 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Portal & servicios */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4" style={{ color: '#C8A951' }}>
              Portal Familias
            </h3>
            <ul className="space-y-2">
              {[
                { href: '/sign-in', label: 'Ingresar al Portal' },
                { href: '/dashboard', label: 'Mi Dashboard' },
                { href: '/dashboard/notas', label: 'Notas y Boletines' },
                { href: '/dashboard/circulares', label: 'Circulares' },
                { href: '/dashboard/documentos', label: 'Documentos' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/75 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4" style={{ color: '#C8A951' }}>
              Contacto
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-white/60" />
                <span className="text-sm text-white/80">
                  Cr. 27 C# 71-80 Barrio Alcázares, Bogotá D.C.
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0 text-white/60" />
                <div className="text-sm text-white/80">
                  <p>322 458 13 69 (Secretaría)</p>
                  <p>319 512 96 50 (WhatsApp)</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-white/60" />
                <div className="text-sm text-white/80">
                  <p>csfn@sanfelipeneribogota.edu.co</p>
                  <p className="text-xs text-white/60">secretariacsfn@colegiosanfelipeneribogota.edu.co</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-white/60">
            © {currentYear} Colegio San Felipe Neri. Todos los derechos reservados.
          </p>
          <p className="text-xs text-white/40">
            Educando Líderes desde 1965
          </p>
        </div>
      </div>
    </footer>
  )
}
