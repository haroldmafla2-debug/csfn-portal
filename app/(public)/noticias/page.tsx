import type { Metadata } from 'next'
import { supabaseAdmin } from '@/lib/supabase'
import NewsCard from '@/components/public/NewsCard'
import { Newspaper } from 'lucide-react'
import type { Noticia } from '@/types'

export const metadata: Metadata = {
  title: 'Noticias - Colegio San Felipe Neri',
}

export const revalidate = 60

export default async function NoticiasPage() {
  const { data } = await supabaseAdmin
    .from('noticias')
    .select('*')
    .eq('publicada', true)
    .order('created_at', { ascending: false })
    .limit(20)

  const noticias: Noticia[] = data || []

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F7FA' }}>
      {/* Header */}
      <div className="py-12 px-4 text-white" style={{ background: 'linear-gradient(135deg, #1B3A6B, #2E5FA3)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Newspaper className="w-7 h-7" style={{ color: '#C8A951' }} />
            <h1 className="text-3xl font-extrabold">Noticias</h1>
          </div>
          <p className="text-white/70">Mantente al día con todo lo que pasa en el Colegio San Felipe Neri</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {noticias.length === 0 ? (
          <div className="text-center py-16">
            <Newspaper className="w-12 h-12 mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">No hay noticias publicadas aún.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {noticias.map((noticia) => (
              <NewsCard key={noticia.id} noticia={noticia} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
