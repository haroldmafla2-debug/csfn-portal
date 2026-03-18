import { supabaseAdmin } from '@/lib/supabase'
import { Users, GraduationCap } from 'lucide-react'
import { formatDate } from '@/lib/utils'

export default async function AdminUsuariosPage() {
  const [{ data: estudiantes }, { data: materias }] = await Promise.all([
    supabaseAdmin.from('estudiantes').select('*').eq('activo', true).order('grado').order('apellidos'),
    supabaseAdmin.from('materias').select('*').order('grado').order('nombre'),
  ])

  return (
    <div className="max-w-6xl animate-fade-in">
      <div className="flex items-center gap-3 mb-8">
        <Users className="w-6 h-6" style={{ color: '#1B3A6B' }} />
        <h1 className="text-2xl font-extrabold" style={{ color: '#1B3A6B' }}>Usuarios y Estudiantes</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Estudiantes */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-50 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-gray-400" />
            <h2 className="font-bold text-gray-900">Estudiantes Activos ({estudiantes?.length || 0})</h2>
          </div>
          <div className="divide-y divide-gray-50 max-h-96 overflow-y-auto">
            {(estudiantes || []).map((est: {
              id: string;
              nombres: string;
              apellidos: string;
              grado: string;
              codigo: string;
              padre_clerk_id: string | null;
            }) => (
              <div key={est.id} className="flex items-center gap-3 px-5 py-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ backgroundColor: '#1B3A6B' }}>
                  {est.nombres[0]}{est.apellidos[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">{est.nombres} {est.apellidos}</p>
                  <p className="text-xs text-gray-400">Grado {est.grado} · Cód. {est.codigo}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${est.padre_clerk_id ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {est.padre_clerk_id ? 'Vinculado' : 'Sin padre'}
                </span>
              </div>
            ))}
            {(!estudiantes || estudiantes.length === 0) && (
              <p className="text-gray-400 text-sm text-center py-8">No hay estudiantes registrados.</p>
            )}
          </div>
        </div>

        {/* Materias y docentes */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-50">
            <h2 className="font-bold text-gray-900">Materias ({materias?.length || 0})</h2>
          </div>
          <div className="divide-y divide-gray-50 max-h-96 overflow-y-auto">
            {(materias || []).map((mat: { id: string; nombre: string; grado: string; docente_clerk_id: string | null }) => (
              <div key={mat.id} className="flex items-center gap-3 px-5 py-3">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">{mat.nombre}</p>
                  <p className="text-xs text-gray-400">Grado {mat.grado}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${mat.docente_clerk_id ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>
                  {mat.docente_clerk_id ? 'Asignada' : 'Sin docente'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 p-5 rounded-xl border border-dashed border-gray-200 text-center">
        <p className="text-sm text-gray-400">
          La gestión de usuarios (docentes y padres) se realiza desde el{' '}
          <strong>Dashboard de Clerk</strong>.
          Los roles se asignan en <code className="bg-gray-100 px-1 rounded">publicMetadata.role</code>
        </p>
      </div>
    </div>
  )
}
