'use client'

import { useState } from 'react'
import { formatDate } from '@/lib/utils'
import { ChevronDown, ChevronUp, Download, CheckCircle, Clock } from 'lucide-react'
import type { Circular } from '@/types'
import { supabase } from '@/lib/supabase'

interface CircularCardProps {
  circular: Circular
  userId: string
}

export default function CircularCard({ circular, userId }: CircularCardProps) {
  const [expanded, setExpanded] = useState(false)
  const [leida, setLeida] = useState(circular.leida || false)

  const handleExpand = async () => {
    setExpanded(!expanded)
    if (!leida && !expanded) {
      // Marcar como leída
      await supabase.from('confirmaciones_circulares').upsert({
        circular_id: circular.id,
        padre_clerk_id: userId,
      }, { onConflict: 'circular_id,padre_clerk_id' })
      setLeida(true)
    }
  }

  return (
    <div className={`mb-3 bg-white rounded-xl border shadow-sm transition-all ${leida ? 'border-gray-100' : 'border-[#C8A951]/40'}`}>
      <button
        onClick={handleExpand}
        className="w-full flex items-start gap-3 p-4 text-left"
      >
        <div className="flex-shrink-0 mt-0.5">
          {leida ? (
            <CheckCircle className="w-4 h-4 text-green-400" />
          ) : (
            <Clock className="w-4 h-4" style={{ color: '#C8A951' }} />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-sm text-gray-900">{circular.titulo}</span>
            {!leida && (
              <span className="text-xs px-2 py-0.5 rounded-full font-bold text-white" style={{ backgroundColor: '#C8A951' }}>
                Nueva
              </span>
            )}
          </div>
          <p className="text-xs text-gray-400 mt-0.5">{formatDate(circular.created_at)}</p>
        </div>
        <div className="flex-shrink-0 text-gray-400">
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-4 border-t border-gray-50">
          <div className="pt-3 text-sm text-gray-700 leading-relaxed whitespace-pre-line">
            {circular.contenido}
          </div>
          {circular.archivo_url && (
            <a
              href={circular.archivo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-colors"
              style={{ backgroundColor: '#1B3A6B' }}
            >
              <Download className="w-4 h-4" />
              Descargar adjunto
            </a>
          )}
        </div>
      )}
    </div>
  )
}
