import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { supabaseAdmin } from '@/lib/supabase'
import NotasClientPage from './NotasClient'
import type { Estudiante, Nota } from '@/types'

export default async function NotasPage() {
  const { userId, sessionClaims } = await auth()
  if (!userId) redirect('/sign-in')

  const role = (sessionClaims?.publicMetadata as { role?: string })?.role

  let estudiantes: Estudiante[] = []
  let notas: Nota[] = []

  if (role === 'padre' || !role) {
    // Padre ve las notas de sus hijos
    const { data: estData } = await supabaseAdmin
      .from('estudiantes')
      .select('*')
      .eq('padre_clerk_id', userId)
      .eq('activo', true)

    estudiantes = estData || []

    if (estudiantes.length > 0) {
      const estudianteIds = estudiantes.map((e) => e.id)
      const { data: notasData } = await supabaseAdmin
        .from('notas')
        .select('*, materia:materias(*)')
        .in('estudiante_id', estudianteIds)

      notas = notasData || []
    }
  } else if (role === 'docente') {
    // Docente ve todas las notas de sus materias
    const { data: notasData } = await supabaseAdmin
      .from('notas')
      .select('*, materia:materias(*), estudiante:estudiantes(*)')
      .eq('docente_clerk_id', userId)

    notas = notasData || []
  }

  return <NotasClientPage estudiantes={estudiantes} notas={notas} role={role || 'padre'} />
}
