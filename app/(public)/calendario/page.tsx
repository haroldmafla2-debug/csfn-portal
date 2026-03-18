import type { Metadata } from 'next'
import { supabaseAdmin } from '@/lib/supabase'
import EventCard from '@/components/public/EventCard'
import { Calendar } from 'lucide-react'
import type { Evento } from '@/types'

export const metadata: Metadata = {
  title: 'Calendario Escolar - Colegio San Felipe Neri',
}

export const revalidate = 300

const TIPO_LABELS: Record<string, string> = {
  academico: 'Académico',
  cultural: 'Cultural',
  deportivo: 'Deportivo',
  institucional: 'Institucional',
  festivo: 'Festivo',
}

export default async function CalendarioPage() {
  const { data } = await supabaseAdmin
    .from('eventos')
    .select('*')
    .eq('visible_publico', true)
    .order('fecha_inicio', { ascending: true })

  const eventos: Evento[] = data || []

  const eventosDemo: Evento[] = eventos.length > 0 ? eventos : [
    { id: '1', titulo: 'Semana de Receso', descripcion: 'Semana Santa', fecha_inicio: '2026-03-30', fecha_fin: '2026-04-03', tipo: 'festivo', visible_publico: true, created_at: new Date().toISOString() },
    { id: '2', titulo: 'Entrega Boletines Período 1', descripcion: 'Reunión de padres y entrega de informes', fecha_inicio: '2026-04-11', fecha_fin: null, tipo: 'academico', visible_publico: true, created_at: new Date().toISOString() },
    { id: '3', titulo: 'Día del Idioma', descripcion: 'Actividades en honor al idioma español', fecha_inicio: '2026-04-23', fecha_fin: null, tipo: 'cultural', visible_publico: true, created_at: new Date().toISOString() },
    { id: '4', titulo: 'Semana Cultural CSFN', descripcion: 'Exposiciones, teatro y danzas', fecha_inicio: '2026-04-27', fecha_fin: '2026-05-01', tipo: 'cultural', visible_publico: true, created_at: new Date().toISOString() },
    { id: '5', titulo: 'Olimpiadas Deportivas', descripcion: 'Competencias internas por cursos', fecha_inicio: '2026-05-08', fecha_fin: '2026-05-09', tipo: 'deportivo', visible_publico: true, created_at: new Date().toISOString() },
    { id: '6', titulo: 'Día de la Madre', descripcion: 'Celebración institucional', fecha_inicio: '2026-05-10', fecha_fin: null, tipo: 'institucional', visible_publico: true, created_at: new Date().toISOString() },
    { id: '7', titulo: 'Fin Período 2', descripcion: 'Cierre del segundo período académico', fecha_inicio: '2026-06-19', fecha_fin: null, tipo: 'academico', visible_publico: true, created_at: new Date().toISOString() },
    { id: '8', titulo: 'Graduación Grado 11°', descripcion: 'Ceremonia de grado promoción 2026', fecha_inicio: '2026-11-20', fecha_fin: null, tipo: 'institucional', visible_publico: true, created_at: new Date().toISOString() },
  ]

  // Agrupar por mes
  const porMes = eventosDemo.reduce((acc, evento) => {
    const mes = new Date(evento.fecha_inicio + 'T00:00:00').toLocaleDateString('es-CO', { month: 'long', year: 'numeric' })
    const mesKey = mes.charAt(0).toUpperCase() + mes.slice(1)
    if (!acc[mesKey]) acc[mesKey] = []
    acc[mesKey].push(evento)
    return acc
  }, {} as Record<string, Evento[]>)

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F7FA' }}>
      <div className="py-12 px-4 text-white" style={{ background: 'linear-gradient(135deg, #1B3A6B, #2E5FA3)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-7 h-7" style={{ color: '#C8A951' }} />
            <h1 className="text-3xl font-extrabold">Calendario Escolar 2026</h1>
          </div>
          <p className="text-white/70">Fechas importantes y actividades del año académico</p>
        </div>
      </div>

      {/* Leyenda de tipos */}
      <div className="max-w-5xl mx-auto px-4 pt-8">
        <div className="flex flex-wrap gap-2">
          {Object.entries(TIPO_LABELS).map(([tipo, label]) => {
            const colors: Record<string, string> = {
              academico: 'bg-blue-100 text-blue-700',
              cultural: 'bg-purple-100 text-purple-700',
              deportivo: 'bg-green-100 text-green-700',
              institucional: 'bg-yellow-100 text-yellow-700',
              festivo: 'bg-red-100 text-red-700',
            }
            return (
              <span key={tipo} className={`px-3 py-1 rounded-full text-xs font-medium ${colors[tipo]}`}>
                {label}
              </span>
            )
          })}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {Object.entries(porMes).map(([mes, evts]) => (
          <div key={mes} className="mb-8">
            <h2 className="text-lg font-bold mb-4" style={{ color: '#1B3A6B' }}>{mes}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {evts.map((evento) => (
                <EventCard key={evento.id} evento={evento} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
