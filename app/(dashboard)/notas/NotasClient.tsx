'use client'

import { useState } from 'react'
import { BookOpen, Download, Sparkles } from 'lucide-react'
import type { Estudiante, Nota } from '@/types'
import { calculateAverage, getNotaColor, getNotaLabel } from '@/lib/utils'

interface Props {
  estudiantes: Estudiante[]
  notas: Nota[]
  role: string
}

export default function NotasClientPage({ estudiantes, notas, role }: Props) {
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState<1 | 2 | 3 | 4>(1)
  const [estudianteSeleccionado, setEstudianteSeleccionado] = useState<string>(
    estudiantes[0]?.id || ''
  )
  const [narrativaIA, setNarrativaIA] = useState('')
  const [loadingIA, setLoadingIA] = useState(false)

  const estudiante = estudiantes.find((e) => e.id === estudianteSeleccionado)

  const notasFiltradas = notas.filter(
    (n) => n.estudiante_id === estudianteSeleccionado && n.periodo === periodoSeleccionado
  )

  const promedio = calculateAverage(notasFiltradas.map((n) => n.nota))

  const handleNarrativaIA = async () => {
    if (!estudiante || notasFiltradas.length === 0) return
    setLoadingIA(true)
    setNarrativaIA('')
    try {
      const res = await fetch('/api/ai/boletin-narrativa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombreEstudiante: `${estudiante.nombres} ${estudiante.apellidos}`,
          grado: estudiante.grado,
          notas: notasFiltradas.map((n) => ({
            materia: (n.materia as { nombre: string })?.nombre || 'Materia',
            nota: n.nota,
            periodo: n.periodo,
          })),
        }),
      })
      const data = await res.json()
      setNarrativaIA(data.narrativa || 'No se pudo generar la narrativa.')
    } catch {
      setNarrativaIA('Error al generar la narrativa. Por favor intente de nuevo.')
    }
    setLoadingIA(false)
  }

  return (
    <div className="max-w-4xl animate-fade-in">
      <div className="flex items-center gap-3 mb-8">
        <BookOpen className="w-6 h-6" style={{ color: '#1B3A6B' }} />
        <h1 className="text-2xl font-extrabold" style={{ color: '#1B3A6B' }}>
          {role === 'docente' ? 'Gestión de Notas' : 'Notas y Boletín'}
        </h1>
      </div>

      {/* Selectores */}
      <div className="flex flex-wrap gap-3 mb-6">
        {estudiantes.length > 1 && (
          <select
            value={estudianteSeleccionado}
            onChange={(e) => setEstudianteSeleccionado(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none"
          >
            {estudiantes.map((est) => (
              <option key={est.id} value={est.id}>
                {est.nombres} {est.apellidos} - {est.grado}
              </option>
            ))}
          </select>
        )}

        <div className="flex gap-2">
          {([1, 2, 3, 4] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriodoSeleccionado(p)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                periodoSeleccionado === p ? 'text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-[#1B3A6B]'
              }`}
              style={periodoSeleccionado === p ? { backgroundColor: '#1B3A6B' } : {}}
            >
              Período {p}
            </button>
          ))}
        </div>
      </div>

      {/* Info estudiante */}
      {estudiante && (
        <div className="p-4 rounded-xl mb-5 text-white flex items-center gap-4" style={{ backgroundColor: '#1B3A6B' }}>
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-sm">
            {estudiante.nombres[0]}{estudiante.apellidos[0]}
          </div>
          <div>
            <p className="font-bold">{estudiante.nombres} {estudiante.apellidos}</p>
            <p className="text-white/70 text-xs">Grado {estudiante.grado} · Código {estudiante.codigo}</p>
          </div>
        </div>
      )}

      {/* Tabla de notas */}
      {notasFiltradas.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-10 text-center">
          <BookOpen className="w-10 h-10 mx-auto text-gray-200 mb-3" />
          <p className="text-gray-400 text-sm">No hay notas registradas para el período {periodoSeleccionado}.</p>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm mb-5">
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: '#F5F7FA' }}>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Materia</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Nota</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Desempeño</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Observación</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {notasFiltradas.map((nota) => (
                  <tr key={nota.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">
                      {(nota.materia as { nombre: string } | undefined)?.nombre || '—'}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`text-lg font-extrabold ${getNotaColor(nota.nota)}`}>
                        {nota.nota.toFixed(1)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center hidden sm:table-cell">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                        {getNotaLabel(nota.nota)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-xs text-gray-400 hidden md:table-cell">
                      {nota.observacion || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr style={{ backgroundColor: '#F5F7FA' }}>
                  <td colSpan={2} className="py-3 px-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-gray-700">Promedio general</span>
                      <span className={`text-xl font-extrabold ${getNotaColor(promedio)}`}>
                        {promedio.toFixed(2)}
                      </span>
                    </div>
                  </td>
                  <td colSpan={2} className="py-3 px-4 text-right hidden sm:table-cell">
                    <span className="text-sm font-medium text-gray-500">{getNotaLabel(promedio)}</span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Acciones */}
          <div className="flex flex-wrap gap-3">
            <a
              href={`/api/pdf/boletin?estudianteId=${estudianteSeleccionado}&periodo=${periodoSeleccionado}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors hover:opacity-90"
              style={{ backgroundColor: '#1B3A6B' }}
            >
              <Download className="w-4 h-4" />
              Descargar Boletín PDF
            </a>
            <button
              onClick={handleNarrativaIA}
              disabled={loadingIA}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors hover:opacity-90 disabled:opacity-70"
              style={{ backgroundColor: '#C8A951' }}
            >
              <Sparkles className="w-4 h-4" />
              {loadingIA ? 'Generando...' : 'Explicación con IA'}
            </button>
          </div>

          {/* Narrativa IA */}
          {narrativaIA && (
            <div className="mt-5 p-5 rounded-xl border" style={{ backgroundColor: '#F5F7FA', borderColor: '#C8A951' }}>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4" style={{ color: '#C8A951' }} />
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#C8A951' }}>
                  Análisis de IA
                </span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{narrativaIA}</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}
