'use client'

import { useState, useEffect } from 'react'
import { Calendar, Plus, Trash2, Eye, EyeOff } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { formatDateShort, TIPO_EVENTO_COLORS } from '@/lib/utils'
import type { Evento } from '@/types'

const TIPOS = ['academico', 'cultural', 'deportivo', 'institucional', 'festivo'] as const
const TIPO_LABELS: Record<string, string> = {
  academico: 'Académico', cultural: 'Cultural', deportivo: 'Deportivo',
  institucional: 'Institucional', festivo: 'Festivo',
}

export default function AdminEventosPage() {
  const [eventos, setEventos] = useState<Evento[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ titulo: '', descripcion: '', fecha_inicio: '', fecha_fin: '', tipo: 'academico', visible_publico: true })
  const [saving, setSaving] = useState(false)

  useEffect(() => { fetchEventos() }, [])

  const fetchEventos = async () => {
    const { data } = await supabase.from('eventos').select('*').order('fecha_inicio')
    setEventos(data || [])
    setLoading(false)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    await supabase.from('eventos').insert(form)
    setSaving(false)
    setShowForm(false)
    setForm({ titulo: '', descripcion: '', fecha_inicio: '', fecha_fin: '', tipo: 'academico', visible_publico: true })
    fetchEventos()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar este evento?')) return
    await supabase.from('eventos').delete().eq('id', id)
    fetchEventos()
  }

  const toggleVisibilidad = async (evento: Evento) => {
    await supabase.from('eventos').update({ visible_publico: !evento.visible_publico }).eq('id', evento.id)
    fetchEventos()
  }

  return (
    <div className="max-w-4xl animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Calendar className="w-6 h-6" style={{ color: '#1B3A6B' }} />
          <h1 className="text-2xl font-extrabold" style={{ color: '#1B3A6B' }}>Eventos</h1>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white"
          style={{ backgroundColor: '#1B3A6B' }}
        >
          <Plus className="w-4 h-4" />
          Nuevo Evento
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-8">
          <h2 className="font-bold text-gray-900 mb-5">Nuevo Evento</h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
                <input required value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha inicio *</label>
                <input required type="date" value={form.fecha_inicio} onChange={(e) => setForm({ ...form, fecha_inicio: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha fin</label>
                <input type="date" value={form.fecha_fin} onChange={(e) => setForm({ ...form, fecha_fin: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo *</label>
                <select value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none bg-white">
                  {TIPOS.map((t) => <option key={t} value={t}>{TIPO_LABELS[t]}</option>)}
                </select>
              </div>
              <div className="flex items-center gap-2 pt-6">
                <input type="checkbox" id="visible" checked={form.visible_publico} onChange={(e) => setForm({ ...form, visible_publico: e.target.checked })} className="rounded" />
                <label htmlFor="visible" className="text-sm text-gray-700">Visible en calendario público</label>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea rows={2} value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none resize-none" />
              </div>
            </div>
            <div className="flex gap-3">
              <button type="submit" disabled={saving} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-70" style={{ backgroundColor: '#1B3A6B' }}>
                {saving ? 'Guardando...' : 'Guardar Evento'}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-600 bg-gray-100">Cancelar</button>
            </div>
          </form>
        </div>
      )}

      {loading ? <p className="text-gray-400 text-sm">Cargando...</p> : (
        <div className="space-y-2">
          {eventos.map((evento) => (
            <div key={evento.id} className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: '#1B3A6B' }}>
                {new Date(evento.fecha_inicio + 'T00:00:00').getDate()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900">{evento.titulo}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${TIPO_EVENTO_COLORS[evento.tipo] || ''}`}>{TIPO_LABELS[evento.tipo]}</span>
                  <span className="text-xs text-gray-400">{formatDateShort(evento.fecha_inicio)}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => toggleVisibilidad(evento)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">
                  {evento.visible_publico ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <button onClick={() => handleDelete(evento.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-400">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
