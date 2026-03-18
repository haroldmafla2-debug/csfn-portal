import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { supabaseAdmin } from '@/lib/supabase'
import { Bell, BookOpen, FileText, Calendar, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import type { UserRole, Estudiante, Circular, Evento } from '@/types'
import { formatDate } from '@/lib/utils'

export default async function DashboardPage() {
  const { userId, sessionClaims } = await auth()
  if (!userId) redirect('/sign-in')

  const role = (sessionClaims?.publicMetadata as { role?: string })?.role as UserRole
  const user = await currentUser()

  // Redirect admins to admin panel
  if (role === 'rector' || role === 'admin') redirect('/admin')

  // Fetch data para padre
  let estudiantes: Estudiante[] = []
  let circularesNoLeidas = 0
  let proximosEventos: Evento[] = []

  if (role === 'padre' || !role) {
    const [estudiantesRes, circularesRes, eventosRes] = await Promise.all([
      supabaseAdmin.from('estudiantes').select('*').eq('padre_clerk_id', userId).eq('activo', true),
      supabaseAdmin.from('circulares').select('id, confirmaciones_circulares!left(id)').eq('publicada', true),
      supabaseAdmin.from('eventos').select('*').gte('fecha_inicio', new Date().toISOString().split('T')[0]).order('fecha_inicio').limit(3),
    ])
    estudiantes = estudiantesRes.data || []

    // Contar no leídas (simplificado)
    const circulares = circularesRes.data || []
    circularesNoLeidas = circulares.length // En producción filtrar por confirmaciones

    proximosEventos = eventosRes.data || []
  }

  const nombrePadre = user?.firstName || 'Usuario'

  return (
    <div className="animate-fade-in max-w-5xl">
      {/* Saludo */}
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold" style={{ color: '#1B3A6B' }}>
          ¡Bienvenido, {nombrePadre}!
        </h1>
        <p className="text-gray-500 mt-1">
          {role === 'docente' ? 'Panel docente' : 'Portal de familias'} — Colegio San Felipe Neri
        </p>
      </div>

      {/* Cards de acceso rápido */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        <Link href="/dashboard/circulares" className="block">
          <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#1B3A6B' }}>
                <Bell className="w-5 h-5 text-white" />
              </div>
              {circularesNoLeidas > 0 && (
                <span className="px-2 py-0.5 rounded-full text-xs font-bold text-white" style={{ backgroundColor: '#C8A951' }}>
                  {circularesNoLeidas} nuevas
                </span>
              )}
            </div>
            <h3 className="font-bold text-gray-900">Circulares</h3>
            <p className="text-xs text-gray-400 mt-1">Comunicados del colegio</p>
            <ChevronRight className="w-4 h-4 text-gray-300 mt-3 ml-auto" />
          </div>
        </Link>

        <Link href="/dashboard/notas" className="block">
          <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: '#2E5FA3' }}>
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-bold text-gray-900">Notas y Boletín</h3>
            <p className="text-xs text-gray-400 mt-1">Rendimiento académico</p>
            <ChevronRight className="w-4 h-4 text-gray-300 mt-3 ml-auto" />
          </div>
        </Link>

        <Link href="/dashboard/documentos" className="block">
          <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: '#1B3A6B' }}>
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-bold text-gray-900">Documentos</h3>
            <p className="text-xs text-gray-400 mt-1">Manuales y formularios</p>
            <ChevronRight className="w-4 h-4 text-gray-300 mt-3 ml-auto" />
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Estudiantes vinculados */}
        {estudiantes.length > 0 && (
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-4">Mis hijos/acudidos</h2>
            <div className="space-y-3">
              {estudiantes.map((est) => (
                <div key={est.id} className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: '#F5F7FA' }}>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: '#1B3A6B' }}>
                    {est.nombres[0]}{est.apellidos[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{est.nombres} {est.apellidos}</p>
                    <p className="text-xs text-gray-400">Grado {est.grado} · Cód. {est.codigo}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Próximos eventos */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900">Próximos Eventos</h2>
            <Link href="/calendario" className="text-xs font-semibold" style={{ color: '#1B3A6B' }}>Ver todos</Link>
          </div>
          {proximosEventos.length === 0 ? (
            <p className="text-sm text-gray-400">No hay eventos próximos.</p>
          ) : (
            <div className="space-y-3">
              {proximosEventos.map((evento) => (
                <div key={evento.id} className="flex items-center gap-3 text-sm">
                  <Calendar className="w-4 h-4 flex-shrink-0 text-gray-300" />
                  <div>
                    <p className="font-medium text-gray-800">{evento.titulo}</p>
                    <p className="text-xs text-gray-400">{formatDate(evento.fecha_inicio)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
