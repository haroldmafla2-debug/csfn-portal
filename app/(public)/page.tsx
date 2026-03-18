import Link from 'next/link'
import { supabaseAdmin } from '@/lib/supabase'
import HeroSection from '@/components/public/HeroSection'
import NewsCard from '@/components/public/NewsCard'
import EventCard from '@/components/public/EventCard'
import { Bell, Images, Phone, BookOpen, ExternalLink } from 'lucide-react'
import type { Noticia, Evento } from '@/types'

async function getHomeData() {
  const [noticiasRes, eventosRes] = await Promise.all([
    supabaseAdmin
      .from('noticias')
      .select('*')
      .eq('publicada', true)
      .order('created_at', { ascending: false })
      .limit(3),
    supabaseAdmin
      .from('eventos')
      .select('*')
      .eq('visible_publico', true)
      .gte('fecha_inicio', new Date().toISOString().split('T')[0])
      .order('fecha_inicio', { ascending: true })
      .limit(4),
  ])

  return {
    noticias: (noticiasRes.data || []) as Noticia[],
    eventos: (eventosRes.data || []) as Evento[],
  }
}

const quickAccess = [
  {
    icon: ExternalLink,
    label: 'Syscolegios',
    description: 'Plataforma académica institucional',
    href: 'https://syscolegios.com',
    external: true,
    color: '#2E5FA3',
  },
  {
    icon: Bell,
    label: 'Circulares',
    description: 'Comunicados y circulares',
    href: '/sign-in',
    external: false,
    color: '#1B3A6B',
  },
  {
    icon: Images,
    label: 'Galería',
    description: 'Fotos y eventos del colegio',
    href: '/galeria',
    external: false,
    color: '#1B3A6B',
  },
  {
    icon: Phone,
    label: 'Contáctenos',
    description: 'Secretaría y atención a padres',
    href: '/contacto',
    external: false,
    color: '#1B3A6B',
  },
]

export default async function HomePage() {
  const { noticias, eventos } = await getHomeData()

  // Fallback demo data when DB is not configured
  const demoNoticias: Noticia[] = noticias.length > 0 ? noticias : [
    {
      id: '1', titulo: 'Inicio del año escolar 2026', slug: 'inicio-ano-escolar-2026',
      resumen: 'El colegio inicia actividades académicas con nuevas estrategias pedagógicas.',
      contenido: '', imagen_url: null, publicada: true, autor_clerk_id: null,
      created_at: new Date().toISOString(),
    },
    {
      id: '2', titulo: 'Olimpiadas deportivas internas', slug: 'olimpiadas-deportivas-2026',
      resumen: 'Los estudiantes participarán en olimpiadas deportivas durante el mes de abril.',
      contenido: '', imagen_url: null, publicada: true, autor_clerk_id: null,
      created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
    },
    {
      id: '3', titulo: 'Actualización del Manual de Convivencia', slug: 'manual-convivencia-2026',
      resumen: 'Se socializa la actualización del Manual de Convivencia para el año 2026.',
      contenido: '', imagen_url: null, publicada: true, autor_clerk_id: null,
      created_at: new Date(Date.now() - 86400000 * 7).toISOString(),
    },
  ]

  const demoEventos: Evento[] = eventos.length > 0 ? eventos : [
    { id: '1', titulo: 'Entrega de boletines Período 1', descripcion: 'Reunión de entrega de informes académicos', fecha_inicio: '2026-04-05', fecha_fin: null, tipo: 'academico', visible_publico: true, created_at: new Date().toISOString() },
    { id: '2', titulo: 'Semana Cultural CSFN', descripcion: 'Actividades culturales y artísticas', fecha_inicio: '2026-04-20', fecha_fin: '2026-04-24', tipo: 'cultural', visible_publico: true, created_at: new Date().toISOString() },
    { id: '3', titulo: 'Día del Idioma', descripcion: 'Celebración del idioma español', fecha_inicio: '2026-04-23', fecha_fin: null, tipo: 'institucional', visible_publico: true, created_at: new Date().toISOString() },
    { id: '4', titulo: 'Olimpiadas Deportivas', descripcion: 'Competencias internas por cursos', fecha_inicio: '2026-05-08', fecha_fin: '2026-05-09', tipo: 'deportivo', visible_publico: true, created_at: new Date().toISOString() },
  ]

  return (
    <>
      <HeroSection />

      {/* Accesos rápidos */}
      <section className="py-10 px-4" style={{ backgroundColor: '#F5F7FA' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickAccess.map((item) => {
              const Icon = item.icon
              const content = (
                <div className="flex flex-col items-center text-center p-5 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-[#1B3A6B]/30 transition-all cursor-pointer group">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: item.color }}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="font-semibold text-sm text-gray-900">{item.label}</p>
                  <p className="text-xs text-gray-400 mt-1 hidden sm:block">{item.description}</p>
                </div>
              )
              return item.external ? (
                <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer">
                  {content}
                </a>
              ) : (
                <Link key={item.label} href={item.href}>
                  {content}
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Noticias recientes */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-extrabold" style={{ color: '#1B3A6B' }}>Últimas Noticias</h2>
              <p className="text-gray-500 mt-1">Mantente informado sobre la vida del colegio</p>
            </div>
            <Link
              href="/noticias"
              className="text-sm font-semibold hover:underline hidden sm:block"
              style={{ color: '#1B3A6B' }}
            >
              Ver todas →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {demoNoticias.map((noticia) => (
              <NewsCard key={noticia.id} noticia={noticia} />
            ))}
          </div>
          <div className="text-center mt-6 sm:hidden">
            <Link href="/noticias" className="text-sm font-semibold" style={{ color: '#1B3A6B' }}>
              Ver todas las noticias →
            </Link>
          </div>
        </div>
      </section>

      {/* Próximos eventos */}
      <section className="py-16 px-4" style={{ backgroundColor: '#F5F7FA' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-extrabold" style={{ color: '#1B3A6B' }}>Próximos Eventos</h2>
              <p className="text-gray-500 mt-1">Agenda escolar y actividades institucionales</p>
            </div>
            <Link
              href="/calendario"
              className="text-sm font-semibold hover:underline hidden sm:block"
              style={{ color: '#1B3A6B' }}
            >
              Ver calendario →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl">
            {demoEventos.map((evento) => (
              <EventCard key={evento.id} evento={evento} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Matrículas */}
      <section className="py-16 px-4 text-white text-center" style={{ background: 'linear-gradient(135deg, #1B3A6B, #2E5FA3)' }}>
        <div className="max-w-2xl mx-auto">
          <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-80" style={{ color: '#C8A951' }} />
          <h2 className="text-3xl font-extrabold mb-3">Proceso de Matrículas 2026</h2>
          <p className="text-white/80 text-lg mb-8">
            ¿Quieres que tu hijo/a haga parte de nuestra comunidad educativa?
            Conoce los requisitos y el proceso de matrícula.
          </p>
          <Link
            href="/matriculas"
            className="inline-flex items-center px-8 py-3 rounded-xl font-semibold text-base transition-all hover:scale-105"
            style={{ backgroundColor: '#C8A951', color: '#1B3A6B' }}
          >
            Información de Matrículas
          </Link>
        </div>
      </section>
    </>
  )
}
