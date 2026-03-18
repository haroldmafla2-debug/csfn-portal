import { supabaseAdmin } from '@/lib/supabase'
import { BookOpen } from 'lucide-react'
import { getNotaColor, getNotaLabel, GRADOS } from '@/lib/utils'

export default async function AdminNotasPage() {
  const { data: notas } = await supabaseAdmin
    .from('notas')
    .select('*, estudiante:estudiantes(*), materia:materias(*)')
    .order('created_at', { ascending: false })
    .limit(100)

  return (
    <div className="max-w-6xl animate-fade-in">
      <div className="flex items-center gap-3 mb-8">
        <BookOpen className="w-6 h-6" style={{ color: '#1B3A6B' }} />
        <h1 className="text-2xl font-extrabold" style={{ color: '#1B3A6B' }}>Supervisión de Notas</h1>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
          <p className="text-sm font-medium text-gray-500">Últimas {notas?.length || 0} notas registradas</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead style={{ backgroundColor: '#F5F7FA' }}>
              <tr>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Estudiante</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Grado</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Materia</th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Período</th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Nota</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Desempeño</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {(notas || []).map((nota: {
                id: string;
                nota: number;
                periodo: number;
                estudiante?: { nombres: string; apellidos: string; grado: string };
                materia?: { nombre: string };
              }) => (
                <tr key={nota.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">
                    {nota.estudiante?.nombres} {nota.estudiante?.apellidos}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{nota.estudiante?.grado}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{nota.materia?.nombre}</td>
                  <td className="py-3 px-4 text-center text-sm text-gray-600">{nota.periodo}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`font-extrabold text-base ${getNotaColor(nota.nota)}`}>{nota.nota.toFixed(1)}</span>
                  </td>
                  <td className="py-3 px-4 hidden md:table-cell">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">{getNotaLabel(nota.nota)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {(!notas || notas.length === 0) && (
            <div className="text-center py-10">
              <p className="text-gray-400 text-sm">No hay notas registradas aún.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
