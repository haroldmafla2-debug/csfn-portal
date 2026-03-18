import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { supabaseAdmin } from '@/lib/supabase'
import { formatDate } from '@/lib/utils'
import { ArrowLeft, Calendar } from 'lucide-react'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const { data } = await supabaseAdmin
    .from('noticias')
    .select('titulo, resumen')
    .eq('slug', slug)
    .single()

  if (!data) return { title: 'Noticia no encontrada' }
  return {
    title: `${data.titulo} - Colegio San Felipe Neri`,
    description: data.resumen || undefined,
  }
}

export default async function NoticiaPage({ params }: Props) {
  const { slug } = await params
  const { data: noticia } = await supabaseAdmin
    .from('noticias')
    .select('*')
    .eq('slug', slug)
    .eq('publicada', true)
    .single()

  if (!noticia) notFound()

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F7FA' }}>
      {/* Hero image */}
      {noticia.imagen_url && (
        <div className="relative h-64 sm:h-80 lg:h-96 w-full">
          <Image src={noticia.imagen_url} alt={noticia.titulo} fill className="object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 py-10">
        <Link href="/noticias" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Volver a noticias
        </Link>

        <article className="bg-white rounded-2xl shadow-sm p-8">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(noticia.created_at)}</span>
          </div>

          <h1 className="text-3xl font-extrabold mb-4" style={{ color: '#1B3A6B' }}>
            {noticia.titulo}
          </h1>

          {noticia.resumen && (
            <p className="text-lg text-gray-500 mb-6 pb-6 border-b border-gray-100">
              {noticia.resumen}
            </p>
          )}

          <div
            className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: noticia.contenido }}
          />
        </article>
      </div>
    </div>
  )
}
