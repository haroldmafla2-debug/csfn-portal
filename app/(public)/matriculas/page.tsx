import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, FileText, Phone, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Matrículas - Colegio San Felipe Neri',
}

const requisitos = [
  'Registro civil de nacimiento (copia)',
  'Documento de identidad del estudiante (tarjeta de identidad)',
  'Certificados de notas de los dos últimos años',
  'Informe de comportamiento del colegio anterior',
  'Fotocopia del carnet de vacunas (menores)',
  'Dos fotos tamaño carnet del estudiante',
  'Documento de identidad del padre/madre/acudiente',
  'Comprobante de pago de la matrícula',
]

const pasos = [
  { num: '01', titulo: 'Solicitud', desc: 'Comuníquese con secretaría para solicitar información del proceso.' },
  { num: '02', titulo: 'Entrevista', desc: 'Realice la entrevista con el rector o coordinador académico.' },
  { num: '03', titulo: 'Documentos', desc: 'Entregue los documentos requeridos en secretaría.' },
  { num: '04', titulo: 'Pago', desc: 'Realice el pago de la matrícula según el plan de la institución.' },
  { num: '05', titulo: 'Confirmación', desc: 'Reciba confirmación y bienvenida a la comunidad CSFN.' },
]

export default function MatriculasPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F7FA' }}>
      {/* Hero */}
      <div className="py-14 px-4 text-white text-center" style={{ background: 'linear-gradient(135deg, #1B3A6B, #2E5FA3)' }}>
        <h1 className="text-4xl font-extrabold mb-3">Proceso de Matrículas 2026</h1>
        <p className="text-white/80 text-lg max-w-xl mx-auto">
          Bienvenido al proceso de admisiones del Colegio San Felipe Neri. Grados 6° a 11°.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <a
            href="https://wa.me/573195129650"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-base transition-all hover:scale-105"
            style={{ backgroundColor: '#C8A951', color: '#1B3A6B' }}
          >
            <Phone className="w-4 h-4" />
            Contactar por WhatsApp
          </a>
          <Link
            href="/contacto"
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-base border-2 border-white/40 hover:border-white hover:bg-white/10 transition-all"
          >
            Escribirnos
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-14">
        {/* Pasos */}
        <section className="mb-14">
          <h2 className="text-2xl font-extrabold mb-8" style={{ color: '#1B3A6B' }}>Proceso de Admisión</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {pasos.map((paso) => (
              <div key={paso.num} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-center">
                <div className="text-3xl font-extrabold mb-2" style={{ color: '#C8A951' }}>{paso.num}</div>
                <h3 className="font-bold text-sm mb-1" style={{ color: '#1B3A6B' }}>{paso.titulo}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{paso.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Requisitos */}
        <section className="mb-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-extrabold mb-6" style={{ color: '#1B3A6B' }}>Documentos Requeridos</h2>
              <ul className="space-y-3">
                {requisitos.map((req) => (
                  <li key={req} className="flex items-start gap-3 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-5">
              <div className="p-6 rounded-xl bg-white shadow-sm border border-gray-100">
                <h3 className="font-bold text-base mb-2" style={{ color: '#1B3A6B' }}>Calendario de Admisiones</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Recepción de documentos</span>
                    <span className="font-medium">Agosto - Octubre 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Entrevistas</span>
                    <span className="font-medium">Octubre - Noviembre 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Matrículas</span>
                    <span className="font-medium">Noviembre 2025 - Enero 2026</span>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-xl text-white" style={{ backgroundColor: '#1B3A6B' }}>
                <FileText className="w-8 h-8 mb-3" style={{ color: '#C8A951' }} />
                <h3 className="font-bold text-base mb-2">¿Necesita más información?</h3>
                <p className="text-sm text-white/80 mb-4">
                  Comuníquese con nuestra secretaría para recibir orientación personalizada.
                </p>
                <div className="text-sm space-y-1">
                  <p className="font-medium">322 458 13 69</p>
                  <p className="text-white/70">csfn@sanfelipeneribogota.edu.co</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
