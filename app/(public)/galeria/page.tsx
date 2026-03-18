import type { Metadata } from 'next'
import { Images } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Galería - Colegio San Felipe Neri',
}

const categorias = [
  { nombre: 'Vida Escolar', fotos: 6 },
  { nombre: 'Eventos Culturales', fotos: 4 },
  { nombre: 'Deportes', fotos: 5 },
  { nombre: 'Graduaciones', fotos: 3 },
]

const colores = ['#1B3A6B', '#2E5FA3', '#C8A951', '#1B3A6B']

export default function GaleriaPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F7FA' }}>
      <div className="py-12 px-4 text-white" style={{ background: 'linear-gradient(135deg, #1B3A6B, #2E5FA3)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Images className="w-7 h-7" style={{ color: '#C8A951' }} />
            <h1 className="text-3xl font-extrabold">Galería</h1>
          </div>
          <p className="text-white/70">Momentos especiales de nuestra comunidad educativa</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categorias.map((cat, i) => (
            <div key={cat.nombre} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer group">
              <div
                className="h-40 flex items-center justify-center"
                style={{ backgroundColor: colores[i] }}
              >
                <Images className="w-10 h-10 text-white/40 group-hover:text-white/70 transition-colors" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900">{cat.nombre}</h3>
                <p className="text-sm text-gray-400 mt-0.5">{cat.fotos} fotos</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-400 text-sm mt-10">
          Las galerías de fotos estarán disponibles próximamente.
        </p>
      </div>
    </div>
  )
}
