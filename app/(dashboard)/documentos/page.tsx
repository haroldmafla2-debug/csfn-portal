import { supabaseAdmin } from '@/lib/supabase'
import { FileText, Download, Folder } from 'lucide-react'
import type { Documento } from '@/types'
import { CATEGORIA_DOCUMENTO_LABELS } from '@/lib/utils'

export default async function DocumentosPage() {
  const { data } = await supabaseAdmin
    .from('documentos')
    .select('*')
    .eq('visible_publico', true)
    .order('categoria')

  const documentos: Documento[] = data || []

  const porCategoria = documentos.reduce((acc, doc) => {
    const cat = doc.categoria
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(doc)
    return acc
  }, {} as Record<string, Documento[]>)

  return (
    <div className="max-w-3xl animate-fade-in">
      <div className="flex items-center gap-3 mb-8">
        <FileText className="w-6 h-6" style={{ color: '#1B3A6B' }} />
        <h1 className="text-2xl font-extrabold" style={{ color: '#1B3A6B' }}>Documentos Institucionales</h1>
      </div>

      {documentos.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
          <Folder className="w-10 h-10 mx-auto text-gray-200 mb-3" />
          <p className="text-gray-400">No hay documentos disponibles.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(porCategoria).map(([cat, docs]) => (
            <div key={cat}>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3">
                {CATEGORIA_DOCUMENTO_LABELS[cat] || cat}
              </h2>
              <div className="space-y-2">
                {docs.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 hover:border-[#1B3A6B]/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#F5F7FA' }}>
                        <FileText className="w-4 h-4" style={{ color: '#1B3A6B' }} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{doc.nombre}</p>
                        <p className="text-xs text-gray-400">{CATEGORIA_DOCUMENTO_LABELS[doc.categoria]}</p>
                      </div>
                    </div>
                    <a
                      href={doc.archivo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors text-white"
                      style={{ backgroundColor: '#1B3A6B' }}
                    >
                      <Download className="w-3 h-3" />
                      Descargar
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
