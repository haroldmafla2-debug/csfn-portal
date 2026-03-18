import Link from 'next/link'
import { ArrowRight, Users } from 'lucide-react'

export default function HeroSection() {
  return (
    <section
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1B3A6B 0%, #2E5FA3 50%, #1B3A6B 100%)',
      }}
    >
      {/* Decorative circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-10" style={{ backgroundColor: '#C8A951' }} />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full opacity-10" style={{ backgroundColor: '#C8A951' }} />
        <div className="absolute top-1/2 left-1/4 w-40 h-40 rounded-full opacity-5 bg-white" />
      </div>

      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        {/* Badge */}
        <span
          className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-6"
          style={{ backgroundColor: 'rgba(200,169,81,0.2)', border: '1px solid #C8A951', color: '#C8A951' }}
        >
          Institución Educativa Privada y Católica · Bogotá, D.C.
        </span>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
          Colegio San Felipe Neri
        </h1>

        <p className="text-xl sm:text-2xl font-medium mb-2 text-white/90">
          Educando Líderes desde{' '}
          <span style={{ color: '#C8A951' }} className="font-bold">1965</span>
        </p>

        <p className="text-base sm:text-lg text-white/70 max-w-xl mx-auto mb-10">
          Formamos personas íntegras con valores católicos, excelencia académica
          y compromiso con la sociedad colombiana.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/nosotros"
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-base transition-all hover:scale-105"
            style={{ backgroundColor: '#C8A951', color: '#1B3A6B' }}
          >
            Conócenos
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/sign-in"
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-base border-2 border-white/40 hover:border-white hover:bg-white/10 transition-all"
          >
            <Users className="w-4 h-4" />
            Portal Familias
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mt-16 max-w-lg mx-auto">
          {[
            { value: '60+', label: 'Años de experiencia' },
            { value: '6°-11°', label: 'Grados ofrecidos' },
            { value: '100%', label: 'Compromiso educativo' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-extrabold" style={{ color: '#C8A951' }}>{stat.value}</p>
              <p className="text-xs text-white/60 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 80L1440 80L1440 40C1200 80 720 0 0 40L0 80Z" fill="white" />
        </svg>
      </div>
    </section>
  )
}
