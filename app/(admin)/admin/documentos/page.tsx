'use client'

import { useState, useEffect } from 'react'
import { Folder, Plus, Trash2, Eye, EyeOff } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { CATEGORIA_DOCUMENTO_LABELS } from '@/lib/utils'
import type { Documento } from '@/types'

const CATEGORIAS = ['manual', 'cronograma', 'academico', 'administrativo', 'pastoral'] as const

export default function AdminDocumentosPage() {
  const [documentos, setDocumentos] = useState<Documento[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ nombre: '', categoria: 'manual', archivo_url: '', visible_publico: true })
  const [saving, setSaving] = useState(false)

  useEffect(() => { fetchDocumentos() }, [])

  const fetchDocumentos = async () => {
    const { data } = await supabase.from('documentos').select('*').order('categoria')
    setDocumentos(data || [])
    setLoading(false)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    await supabase.from('documentos').insert(form)
    setSaving(false)
    setShowForm(false)
    setForm({ nombre: '', categoria: 'manual', archivo_url: '', visible_publico: true })
    fetchDocumentos()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar este documento?')) return
    await supabase.from('documentos').delete().eq('id', id)
    fetchDocumentos()
  }

  const toggleVisibilidad = async (doc: Documento) => {
    await supabase.from('documentos').update({ visible_publico: !doc.visible_publico }).eq('id', doc.id)
    fetchDocumentos()
  }

  return (
    <div className="max-w-4xl animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Folder className="w-6 h-6" style={{ color: '#1B3A6B' }} />
          <h1 className="text-2xl font-extrabold" style={{ color: '#1B3A6B' }}>Documentos</h1>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white" style={{ backgroundColor: '#1B3A6B' }}>
          <Plus className="w-4 h-4" />
          Subir Documento
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-8">
          <h2 className="font-bold text-gray-900 mb-5">Nuevo Documento</h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del documento *</label>
              <input required value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoría *</label>
                <select value={form.categoria} onChange={(e) => setForm({ ...form, categoria: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none bg-white">
                  {CATEGORIAS.map((c) => <option key={c} value={c}>{CATEGORIA_DOCUMENTO_LABELS[c]}</option>)}
                </select>
              </div>
              <div className="flex items-center gap-2 pt-6">
                <input type="checkbox" id="visible" checked={form.visible_publico} onChange={(e) => setForm({ ...form, visible_publico: e.target.checked })} className="rounded" />
                <label htmlFor="visible" className="text-sm text-gray-700">Visible al público</label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">URL del archivo (Supabase Storage) *</label>
              <input required type="url" value={form.archivo_url} onChange={(e) => setForm({ ...form, archivo_url: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none" placeholder="https://..." />
            </div>
            <div className="flex gap-3">
              <button type="submit" disabled={saving} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-70" style={{ backgroundColor: '#1B3A6B' }}>
                {saving ? 'Guardando...' : 'Guardar'}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-600 bg-gray-100">Cancelar</button>
            </div>
          </form>
        </div>
      )}

      {loading ? <p className="text-gray-400 text-sm">Cargando...</p> : (
        <div className="space-y-2">
          {documentos.map((doc) => (
            <div key={doc.id} className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900">{doc.nombre}</p>
                <p className="text-xs text-gray-400">{CATEGORIA_DOCUMENTO_LABELS[doc.categoria]}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${doc.visible_publico ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  {doc.visible_publico ? 'Público' : 'Privado'}
                </span>
                <button onClick={() => toggleVisibilidad(doc)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">
                  {doc.visible_publico ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <button onClick={() => handleDelete(doc.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-400">
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
