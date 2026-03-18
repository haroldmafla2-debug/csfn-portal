import Link from 'next/link'
import Image from 'next/image'
import { Calendar, ArrowRight } from 'lucide-react'
import { Noticia } from '@/types'
import { formatDate } from '@/lib/utils'

interface NewsCardProps {
  noticia: Noticia
}

export default function NewsCard({ noticia }: NewsCardProps) {
  return (
    <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
      {/* Imagen */}
      <div className="relative h-48 bg-gray-100">
        {noticia.imagen_url ? (
          <Image
            src={noticia.imagen_url}
            alt={noticia.titulo}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #1B3A6B, #2E5FA3)' }}
          >
            <span className="text-white/40 text-4xl font-bold">CSFN</span>
          </div>
        )}
      </div>

      <div className="p-5">
        {/* Fecha */}
        <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
          <Calendar className="w-3.5 h-3.5" />
          <span>{formatDate(noticia.created_at)}</span>
        </div>

        {/* Título */}
        <h3 className="font-bold text-base text-gray-900 mb-2 line-clamp-2 group-hover:text-[#1B3A6B] transition-colors">
          {noticia.titulo}
        </h3>

        {/* Resumen */}
        {noticia.resumen && (
          <p className="text-sm text-gray-500 line-clamp-2 mb-4">
            {noticia.resumen}
          </p>
        )}

        <Link
          href={`/noticias/${noticia.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
          style={{ color: '#1B3A6B' }}
        >
          Leer más
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  )
}
