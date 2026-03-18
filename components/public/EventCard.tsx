import { Calendar, Tag } from 'lucide-react'
import { Evento } from '@/types'
import { formatDateShort, TIPO_EVENTO_COLORS } from '@/lib/utils'

interface EventCardProps {
  evento: Evento
}

const tipoLabels: Record<string, string> = {
  academico: 'Académico',
  cultural: 'Cultural',
  deportivo: 'Deportivo',
  institucional: 'Institucional',
  festivo: 'Festivo',
}

export default function EventCard({ evento }: EventCardProps) {
  return (
    <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:border-[#1B3A6B]/30 transition-colors">
      {/* Fecha visual */}
      <div className="flex-shrink-0 w-12 text-center">
        <div
          className="rounded-lg p-2 text-white text-center"
          style={{ backgroundColor: '#1B3A6B' }}
        >
          <p className="text-xs font-medium">
            {new Date(evento.fecha_inicio + 'T00:00:00').toLocaleDateString('es-CO', { month: 'short' }).toUpperCase()}
          </p>
          <p className="text-xl font-extrabold leading-none">
            {new Date(evento.fecha_inicio + 'T00:00:00').getDate()}
          </p>
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-sm text-gray-900 truncate">{evento.titulo}</h4>
        {evento.descripcion && (
          <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{evento.descripcion}</p>
        )}
        <div className="flex items-center gap-2 mt-2">
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${TIPO_EVENTO_COLORS[evento.tipo] || 'bg-gray-100 text-gray-600'}`}>
            <Tag className="w-2.5 h-2.5" />
            {tipoLabels[evento.tipo] || evento.tipo}
          </span>
          {evento.fecha_fin && evento.fecha_fin !== evento.fecha_inicio && (
            <span className="text-xs text-gray-400">
              hasta {formatDateShort(evento.fecha_fin)}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
