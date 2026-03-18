'use client'

import { useState, useEffect } from 'react'
import { Bell, Plus, Eye, EyeOff, Sparkles, Users } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { formatDate, GRADOS } from '@/lib/utils'
import type { Circular } from '@/types'

export default function AdminCircularesPage() {
  const [circulares, setCirculares] = useState<Circular[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ titulo: '', contenido: '', destinatarios: ['todos'] })
  const [saving, setSaving] = useState(false)
  const [generando, setGenerando] = useState(false)
  const [borradorIA, setBorradorIA] = useState('')

  useEffect(() => { fetchCirculares() }, [])

  const fetchCirculares = async () => {
    const { data } = await supabase.from('circulares').select('*').order('created_at', { ascending: false })
    setCirculares(data || [])
    setLoading(false)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    await supabase.from('circulares').insert({ ...form, publicada: true })
    setSaving(false)
    setShowForm(false)
    setForm({ titulo: '', contenido: '', destinatarios: ['todos'] })
    fetchCirculares()
  }

  const togglePublicada = async (c: Circular) => {
    await supabase.from('circulares').update({ publicada: !c.publicada }).eq('id', c.id)
    fetchCirculares()
  }

  const handleGenerarConIA = async () => {
    if (!borradorIA.trim()) return
    setGenerando(true)
    try {
      const res = await fetch('/api/ai/generar-circular', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          borrador: borradorIA,
          destinatarios: form.destinatarios.join(', '),
          fecha: new Date().toLocaleDateString('es-CO'),
        }),
      })
      const data = await res.json()
      setForm((f) => ({ ...f, contenido: data.circular || f.contenido }))
    } catch {}
    setGenerando(false)
  }

  const toggleDestinatario = (dest: string) => {
    setForm((f) => ({
      ...f,
      destinatarios: f.destinatarios.includes(dest)
        ? f.destinatarios.filter((d) => d !== dest)
        : [...f.destinatarios, dest],
    }))
  }

  return (
    <div className="max-w-5xl animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Bell className="w-6 h-6" style={{ color: '#1B3A6B' }} />
          <h1 className="text-2xl font-extrabold" style={{ color: '#1B3A6B' }}>Circulares</h1>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white"
          style={{ backgroundColor: '#1B3A6B' }}
        >
          <Plus className="w-4 h-4" />
          Nueva Circular
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-8">
          <h2 className="font-bold text-gray-900 mb-5">Nueva Circular</h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
              <input
                required
                value={form.titulo}
                onChange={(e) => setForm({ ...form, titulo: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none"
                placeholder="Circular No. X - Tema"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Destinatarios</label>
              <div className="flex flex-wrap gap-2">
                {['todos', 'docentes', ...GRADOS.slice(0, 8)].map((dest) => (
                  <button
                    key={dest}
                    type="button"
                    onClick={() => toggleDestinatario(dest)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                      form.destinatarios.includes(dest) ? 'text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                    style={form.destinatarios.includes(dest) ? { backgroundColor: '#1B3A6B' } : {}}
                  >
                    {dest}
                  </button>
                ))}
              </div>
            </div>

            {/* Generador IA */}
            <div className="p-4 rounded-xl" style={{ backgroundColor: '#F5F7FA' }}>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4" style={{ color: '#C8A951' }} />
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#C8A951' }}>
                  Generador con IA
                </span>
              </div>
              <textarea
                rows={2}
                value={borradorIA}
                onChange={(e) => setBorradorIA(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none resize-none mb-2"
                placeholder="Describe brevemente el contenido (ej: 'Informar sobre reunión de padres el viernes 20...')"
              />
              <button
                type="button"
                onClick={handleGenerarConIA}
                disabled={generando || !borradorIA.trim()}
                className="px-4 py-1.5 rounded-lg text-sm font-semibold text-white disabled:opacity-60"
                style={{ backgroundColor: '#C8A951' }}
              >
                {generando ? 'Generando...' : 'Generar circular formal'}
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contenido *</label>
              <textarea
                required
                rows={10}
                value={form.contenido}
                onChange={(e) => setForm({ ...form, contenido: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none resize-none font-mono"
                placeholder="Contenido de la circular..."
              />
            </div>

            <div className="flex gap-3">
              <button type="submit" disabled={saving} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-70" style={{ backgroundColor: '#1B3A6B' }}>
                {saving ? 'Publicando...' : 'Publicar Circular'}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-600 bg-gray-100">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? <p className="text-gray-400 text-sm">Cargando...</p> : (
        <div className="space-y-3">
          {circulares.map((c) => (
            <div key={c.id} className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-semibold text-gray-900">{c.titulo}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${c.publicada ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {c.publicada ? 'Publicada' : 'Borrador'}
                  </span>
                  <div className="flex gap-1">
                    {c.destinatarios?.slice(0, 3).map((d: string) => (
                      <span key={d} className="text-xs px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 font-medium">{d}</span>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">{formatDate(c.created_at)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => togglePublicada(c)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">
                  {c.publicada ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
