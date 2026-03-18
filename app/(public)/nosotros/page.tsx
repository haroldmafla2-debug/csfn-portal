import type { Metadata } from 'next'
import { Heart, Target, Eye, Star } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Nosotros - Colegio San Felipe Neri',
  description: 'Conoce la historia, misión, visión y valores del Colegio San Felipe Neri de Bogotá.',
}

const valores = [
  { icon: Heart, titulo: 'Fe', descripcion: 'Formamos en la fe católica y los valores del Evangelio, integrando la espiritualidad en nuestra comunidad educativa.' },
  { icon: Star, titulo: 'Excelencia', descripcion: 'Buscamos la excelencia académica y humana en cada uno de nuestros estudiantes, docentes y familias.' },
  { icon: Target, titulo: 'Respeto', descripcion: 'Promovemos el respeto por la dignidad humana, la diversidad y el medio ambiente.' },
  { icon: Eye, titulo: 'Liderazgo', descripcion: 'Cultivamos líderes comprometidos con la transformación positiva de su entorno social y cultural.' },
]

export default function NosotrosPage() {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <div className="py-16 px-4 text-white text-center" style={{ background: 'linear-gradient(135deg, #1B3A6B, #2E5FA3)' }}>
        <h1 className="text-4xl font-extrabold mb-3">Nuestra Institución</h1>
        <p className="text-white/80 text-lg max-w-2xl mx-auto">
          Más de 60 años formando personas íntegras con valores católicos y excelencia académica.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16">
        {/* Historia */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-8 rounded-full" style={{ backgroundColor: '#C8A951' }} />
            <h2 className="text-2xl font-extrabold" style={{ color: '#1B3A6B' }}>Nuestra Historia</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                El Colegio San Felipe Neri fue fundado en <strong>1965</strong> en el barrio Alcázares de Bogotá,
                con la misión de ofrecer educación de calidad a las familias de la comunidad local.
              </p>
              <p>
                A lo largo de más de seis décadas, la institución ha formado a miles de ciudadanos
                comprometidos con la fe católica, los valores humanos y la excelencia académica,
                posicionándose como referente educativo en la ciudad.
              </p>
              <p>
                Hoy en día, el colegio ofrece bachillerato completo desde grado 6° hasta 11°,
                con un enfoque integral que combina lo académico, lo espiritual, lo deportivo y lo cultural.
              </p>
            </div>
            <div
              className="rounded-2xl h-56 flex items-center justify-center text-white"
              style={{ background: 'linear-gradient(135deg, #1B3A6B, #2E5FA3)' }}
            >
              <div className="text-center">
                <p className="text-6xl font-extrabold" style={{ color: '#C8A951' }}>1965</p>
                <p className="text-lg font-medium mt-1">Fundación del colegio</p>
                <p className="text-sm text-white/60 mt-1">Barrio Alcázares, Bogotá</p>
              </div>
            </div>
          </div>
        </section>

        {/* Misión y Visión */}
        <section className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 rounded-2xl border-l-4 bg-white shadow-sm" style={{ borderColor: '#1B3A6B' }}>
            <h3 className="text-xl font-bold mb-3" style={{ color: '#1B3A6B' }}>Misión</h3>
            <p className="text-gray-600 leading-relaxed">
              Somos una institución educativa privada y católica que ofrece formación integral
              a jóvenes de grado 6° a 11°, promoviendo el desarrollo de competencias académicas,
              valores éticos y espirituales, y habilidades para la vida, en un ambiente de respeto,
              familia y fe.
            </p>
          </div>
          <div className="p-8 rounded-2xl border-l-4 bg-white shadow-sm" style={{ borderColor: '#C8A951' }}>
            <h3 className="text-xl font-bold mb-3" style={{ color: '#1B3A6B' }}>Visión</h3>
            <p className="text-gray-600 leading-relaxed">
              Para el año 2030, el Colegio San Felipe Neri será reconocido como institución líder
              en la formación de ciudadanos íntegros, críticos y comprometidos con la sociedad
              colombiana, con altos estándares académicos y una sólida identidad cristiana.
            </p>
          </div>
        </section>

        {/* Valores */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1.5 h-8 rounded-full" style={{ backgroundColor: '#C8A951' }} />
            <h2 className="text-2xl font-extrabold" style={{ color: '#1B3A6B' }}>Nuestros Valores</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {valores.map((valor) => {
              const Icon = valor.icon
              return (
                <div key={valor.titulo} className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 flex gap-4">
                  <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: '#1B3A6B' }}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-base mb-1" style={{ color: '#1B3A6B' }}>{valor.titulo}</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">{valor.descripcion}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Datos de contacto */}
        <section className="p-8 rounded-2xl text-white" style={{ background: 'linear-gradient(135deg, #1B3A6B, #2E5FA3)' }}>
          <h3 className="text-xl font-bold mb-4">Información de la Institución</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-white/80">
            <div>
              <p className="font-semibold text-white mb-1">Dirección</p>
              <p>Cr. 27 C# 71-80 Barrio Alcázares, Bogotá D.C.</p>
            </div>
            <div>
              <p className="font-semibold text-white mb-1">Niveles ofrecidos</p>
              <p>Básica Secundaria (6° - 9°) y Media Vocacional (10° - 11°)</p>
            </div>
            <div>
              <p className="font-semibold text-white mb-1">Teléfonos</p>
              <p>322 458 13 69 · 319 512 96 50 (WhatsApp)</p>
            </div>
            <div>
              <p className="font-semibold text-white mb-1">Carácter</p>
              <p>Privado · Católico · Mixto</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
