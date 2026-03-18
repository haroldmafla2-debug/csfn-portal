'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import {
  LayoutDashboard,
  Bell,
  BookOpen,
  FileText,
  User,
  Users,
  Newspaper,
  Calendar,
  Settings,
  GraduationCap,
  ChevronRight,
  Folder,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { UserRole } from '@/types'

const padreLinks = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/dashboard/circulares', icon: Bell, label: 'Circulares' },
  { href: '/dashboard/notas', icon: BookOpen, label: 'Notas y Boletín' },
  { href: '/dashboard/documentos', icon: FileText, label: 'Documentos' },
  { href: '/dashboard/perfil', icon: User, label: 'Mi Perfil' },
]

const docenteLinks = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/dashboard/notas', icon: BookOpen, label: 'Registrar Notas' },
  { href: '/dashboard/circulares', icon: Bell, label: 'Circulares' },
  { href: '/dashboard/documentos', icon: FileText, label: 'Documentos' },
  { href: '/dashboard/perfil', icon: User, label: 'Mi Perfil' },
]

const adminLinks = [
  { href: '/admin', icon: LayoutDashboard, label: 'Panel General' },
  { href: '/admin/usuarios', icon: Users, label: 'Usuarios' },
  { href: '/admin/noticias', icon: Newspaper, label: 'Noticias' },
  { href: '/admin/circulares', icon: Bell, label: 'Circulares' },
  { href: '/admin/notas', icon: BookOpen, label: 'Notas' },
  { href: '/admin/documentos', icon: Folder, label: 'Documentos' },
  { href: '/admin/eventos', icon: Calendar, label: 'Eventos' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const { user } = useUser()
  const role = (user?.publicMetadata?.role as UserRole) || 'padre'

  let links = padreLinks
  if (role === 'docente') links = docenteLinks
  if (role === 'rector' || role === 'admin') links = adminLinks

  return (
    <aside className="w-64 flex-shrink-0 hidden md:flex flex-col" style={{ backgroundColor: '#1B3A6B', minHeight: '100vh' }}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
        <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
          <GraduationCap className="w-5 h-5" style={{ color: '#C8A951' }} />
        </div>
        <div>
          <p className="text-white font-bold text-sm leading-tight">San Felipe Neri</p>
          <p className="text-xs capitalize" style={{ color: '#C8A951' }}>{role}</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {links.map((link) => {
            const Icon = link.icon
            const isActive = pathname === link.href || (link.href !== '/dashboard' && link.href !== '/admin' && pathname.startsWith(link.href))
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group',
                    isActive
                      ? 'bg-white/15 text-white'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  )}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{link.label}</span>
                  {isActive && <ChevronRight className="w-3 h-3 ml-auto" />}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-4 border-t border-white/10 pt-3">
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/10 transition-colors"
        >
          <Settings className="w-4 h-4" />
          <span>Sitio Público</span>
        </Link>
      </div>
    </aside>
  )
}
