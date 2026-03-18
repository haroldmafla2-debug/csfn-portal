'use client'

import { useState, useEffect } from 'react'
import { Newspaper, Plus, Pencil, Trash2, Eye, EyeOff, Sparkles } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { slugify, formatDate } from '@/lib/utils'
import type { Noticia } from '@/types'

export default function AdminNoticiasPage() {
  const [noticias, setNoticias] = useState<Noticia[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editando, setEditando] = useState<Noticia | null>(null)
  const [form, setForm] = useState({ titulo: '', resumen: '', contenido: '', imagen_url: '' })
  const [saving, setSaving] = useState(false)
  const [mejorando, setMejorando] = useState(false)

  useEffect(() => {
    fetchNoticias()
  }, [])

  const fetchNoticias = async () => {
    const { data } = await supabase.from('noticias').select('*').order('created_at', { ascending: false })
    setNoticias(data || [])
    setLoading(false)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const slug = slugify(form.titulo)
    if (editando) {
      await supabase.from('noticias').update({ ...form, slug }).eq('id', editando.id)
    } else {
      await supabase.from('noticias').insert({ ...form, slug, publicada: false })
    }
    setSaving(false)
    setShowForm(false)
    setEditando(null)
    setForm({ titulo: '', resumen: '', contenido: '', imagen_url: '' })
    fetchNoticias()
  }

  const togglePublicada = async (noticia: Noticia) => {
    await supabase.from('noticias').update({ publicada: !noticia.publicada }).eq('id', noticia.id)
    fetchNoticias()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar esta noticia?')) return
    await supabase.from('noticias').delete().eq('id', id)
    fetchNoticias()
  }

  const handleEdit = (noticia: Noticia) => {
    setEditando(noticia)
    setForm({ titulo: noticia.titulo, resumen: noticia.resumen || '', contenido: noticia.contenido, imagen_url: noticia.imagen_url || '' })
    setShowForm(true)
  }

  const handleMejorarConIA = async () => {
    if (!form.titulo || !form.contenido) return
    setMejorando(true)
    try {
      const res = await fetch('/api/ai/mejorar-noticia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo: form.titulo, contenido: form.contenido }),
      })
      const data = await res.json()
      setForm((f) => ({
        ...f,
        titulo: data.tituloMejorado || f.titulo,
        contenido: data.contenidoMejorado || f.contenido,
        resumen: data.resumen || f.resumen,
      }))
    } catch {}
    setMejorando(false)
  }

  return (
    <div className="max-w-5xl animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Newspaper className="w-6 h-6" style={{ color: '#1B3A6B' }} />
          <h1 className="text-2xl font-extrabold" style={{ color: '#1B3A6B' }}>Noticias</h1>
        </div>
        <button
          onClick={() => { setShowForm(true); setEditando(null); setForm({ titulo: '', resumen: '', contenido: '', imagen_url: '' }) }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white"
          style={{ backgroundColor: '#1B3A6B' }}
        >
          <Plus className="w-4 h-4" />
          Nueva Noticia
        </button>
      </div>

      {/* Formulario */}
      {showForm && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-8">
          <h2 className="font-bold text-gray-900 mb-5">{editando ? 'Editar Noticia' : 'Nueva Noticia'}</h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
              <input
                required
                value={form.titulo}
                onChange={(e) => setForm({ ...form, titulo: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none"
                placeholder="Título de la noticia"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Resumen</label>
              <input
                value={form.resumen}
                onChange={(e) => setForm({ ...form, resumen: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none"
                placeholder="Breve descripción para vista previa"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contenido *</label>
              <textarea
                required
                rows={8}
                value={form.contenido}
                onChange={(e) => setForm({ ...form, contenido: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none resize-none"
                placeholder="Contenido completo de la noticia..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">URL Imagen de portada</label>
              <input
                type="url"
                value={form.imagen_url}
                onChange={(e) => setForm({ ...form, imagen_url: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none"
                placeholder="https://..."
              />
            </div>
            <div className="flex gap-3 flex-wrap">
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-70"
                style={{ backgroundColor: '#1B3A6B' }}
              >
                {saving ? 'Guardando...' : 'Guardar'}
              </button>
              <button
                type="button"
                onClick={handleMejorarConIA}
                disabled={mejorando}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-70"
                style={{ backgroundColor: '#C8A951' }}
              >
                <Sparkles className="w-4 h-4" />
                {mejorando ? 'Mejorando...' : 'Mejorar con IA'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-600 bg-gray-100"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Lista */}
      {loading ? (
        <p className="text-gray-400 text-sm">Cargando...</p>
      ) : (
        <div className="space-y-3">
          {noticias.map((noticia) => (
            <div key={noticia.id} className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-gray-900 truncate">{noticia.titulo}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${noticia.publicada ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {noticia.publicada ? 'Publicada' : 'Borrador'}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">{formatDate(noticia.created_at)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => togglePublicada(noticia)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">
                  {noticia.publicada ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <button onClick={() => handleEdit(noticia)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">
                  <Pencil className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(noticia.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-400">
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
