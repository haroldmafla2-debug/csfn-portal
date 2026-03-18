import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { supabaseAdmin } from '@/lib/supabase'
import CircularCard from '@/components/dashboard/CircularCard'
import { Bell } from 'lucide-react'
import type { Circular } from '@/types'

export default async function CircularesPage() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  const { data: circulares } = await supabaseAdmin
    .from('circulares')
    .select('*')
    .eq('publicada', true)
    .order('created_at', { ascending: false })

  const { data: confirmaciones } = await supabaseAdmin
    .from('confirmaciones_circulares')
    .select('circular_id')
    .eq('padre_clerk_id', userId)

  const leidasIds = new Set((confirmaciones || []).map((c: { circular_id: string }) => c.circular_id))

  const circularesConEstado: Circular[] = (circulares || []).map((c: Circular) => ({
    ...c,
    leida: leidasIds.has(c.id),
  }))

  const noLeidas = circularesConEstado.filter((c) => !c.leida)
  const leidas = circularesConEstado.filter((c) => c.leida)

  return (
    <div className="max-w-3xl animate-fade-in">
      <div className="flex items-center gap-3 mb-8">
        <Bell className="w-6 h-6" style={{ color: '#1B3A6B' }} />
        <h1 className="text-2xl font-extrabold" style={{ color: '#1B3A6B' }}>Circulares</h1>
        {noLeidas.length > 0 && (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold text-white" style={{ backgroundColor: '#C8A951' }}>
            {noLeidas.length} sin leer
          </span>
        )}
      </div>

      {circularesConEstado.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
          <Bell className="w-10 h-10 mx-auto text-gray-200 mb-3" />
          <p className="text-gray-400">No hay circulares disponibles.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {noLeidas.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Nuevas</p>
              {noLeidas.map((c) => (
                <CircularCard key={c.id} circular={c} userId={userId} />
              ))}
            </div>
          )}
          {leidas.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3 mt-6">Leídas</p>
              {leidas.map((c) => (
                <CircularCard key={c.id} circular={c} userId={userId} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
