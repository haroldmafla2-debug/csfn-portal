import { supabaseAdmin } from '@/lib/supabase'
import { Users, Newspaper, Bell, BookOpen, TrendingUp } from 'lucide-react'

async function getMetrics() {
  const [estudiantesRes, noticiasRes, circularesRes, docentesRes] = await Promise.all([
    supabaseAdmin.from('estudiantes').select('id', { count: 'exact' }).eq('activo', true),
    supabaseAdmin.from('noticias').select('id', { count: 'exact' }).eq('publicada', true),
    supabaseAdmin
      .from('circulares')
      .select('id', { count: 'exact' })
      .eq('publicada', true)
      .gte('created_at', new Date(new Date().setDate(1)).toISOString()),
    supabaseAdmin.from('materias').select('docente_clerk_id').neq('docente_clerk_id', null),
  ])

  const docentes = new Set((docentesRes.data || []).map((m: { docente_clerk_id: string }) => m.docente_clerk_id)).size

  return {
    estudiantes: estudiantesRes.count || 0,
    noticias: noticiasRes.count || 0,
    circulares: circularesRes.count || 0,
    docentes,
  }
}

export default async function AdminPage() {
  const metrics = await getMetrics()

  const cards = [
    { icon: Users, label: 'Estudiantes activos', value: metrics.estudiantes, color: '#1B3A6B' },
    { icon: BookOpen, label: 'Docentes', value: metrics.docentes, color: '#2E5FA3' },
    { icon: Bell, label: 'Circulares este mes', value: metrics.circulares, color: '#C8A951' },
    { icon: Newspaper, label: 'Noticias publicadas', value: metrics.noticias, color: '#1B3A6B' },
  ]

  return (
    <div className="max-w-6xl animate-fade-in">
      <div className="flex items-center gap-3 mb-8">
        <TrendingUp className="w-6 h-6" style={{ color: '#1B3A6B' }} />
        <h1 className="text-2xl font-extrabold" style={{ color: '#1B3A6B' }}>Panel de Control</h1>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <div key={card.label} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: card.color }}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-3xl font-extrabold" style={{ color: card.color }}>{card.value}</p>
              <p className="text-xs text-gray-500 mt-1">{card.label}</p>
            </div>
          )
        })}
      </div>

      {/* Acciones rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <h2 className="font-bold text-gray-900 mb-4">Acciones Rápidas</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { href: '/admin/noticias', label: 'Crear Noticia', icon: Newspaper },
              { href: '/admin/circulares', label: 'Nueva Circular', icon: Bell },
              { href: '/admin/eventos', label: 'Agregar Evento', icon: BookOpen },
              { href: '/admin/documentos', label: 'Subir Documento', icon: BookOpen },
            ].map((action) => {
              const Icon = action.icon
              return (
                <a
                  key={action.label}
                  href={action.href}
                  className="flex items-center gap-2 p-3 rounded-lg text-sm font-medium text-gray-700 hover:text-white transition-all"
                  style={{ backgroundColor: '#F5F7FA' }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#1B3A6B'; e.currentTarget.style.color = 'white' }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#F5F7FA'; e.currentTarget.style.color = '#374151' }}
                >
                  <Icon className="w-4 h-4" />
                  {action.label}
                </a>
              )
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <h2 className="font-bold text-gray-900 mb-4">Estado del Sistema</h2>
          <div className="space-y-3">
            {[
              { label: 'Portal público', status: 'Activo' },
              { label: 'Portal familias', status: 'Activo' },
              { label: 'IA Chatbot', status: 'Activo' },
              { label: 'Generador de circulares', status: 'Activo' },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{item.label}</span>
                <span className="flex items-center gap-1.5 text-green-600 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
